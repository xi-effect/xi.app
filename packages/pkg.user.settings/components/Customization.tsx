import { Palette } from '@xipkg/icons';
import { useMedia } from 'pkg.utils.client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@xipkg/select';
import { useTheme } from 'next-themes';
import { patch } from 'pkg.utils';
import { toast } from 'sonner';
import { useMainSt } from 'pkg.stores';
import { useDebouncedFunction } from '@xipkg/utils/useDebouncedFunction';

type Theme = 'light' | 'dark' | 'system';

export const Customization = () => {
  const isMobile = useMedia('(max-width: 719px)', false);
  const { theme, setTheme } = useTheme();
  const user = useMainSt((state) => state.user);
  const updateUser = useMainSt((state) => state.updateUser);

  const updateThemeRequest = async (value: Theme) => {
    const { status } = await patch<any, any>({
      service: 'auth',
      path: '/api/users/current/profile/',
      body: { username: user.username, display_name: user.displayName, theme: `${value}` },
      config: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });

    if (status === 200) {
      updateUser({ theme: `${value}` });
      toast('Данные успешно обновлены');
    } else {
      setTheme(user.theme);
      toast('Данные успешно обновлены');
    }
  };

  const debouncedUpdateTheme = useDebouncedFunction((value: Theme) => {
    updateThemeRequest(value);
  }, 3000);

  const updateTheme = (value: Theme) => {
    setTheme(value);
    debouncedUpdateTheme(value);
  };

  return (
    <>
      {!isMobile && <span className="text-3xl font-semibold">Персонализация</span>}
      <div className="border-gray-80 flex w-full flex-col rounded-2xl border p-1 sm:mt-4">
        <div className="flex w-full flex-col p-3">
          <span className="text-xl font-semibold">Внешний вид</span>
        </div>
        <div className="mt-2 flex w-full flex-col items-start justify-center gap-4 p-3 sm:flex-row sm:items-center">
          <div className="flex flex-row gap-4">
            <Palette className="fill-brand-80" />
            <span className="text-base font-semibold leading-[24px]">Тема оформления</span>
          </div>
          <Select value={theme} onValueChange={(value: Theme) => updateTheme(value)}>
            <SelectTrigger className="ml-0 w-[250px] sm:ml-auto">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="light">Светлая</SelectItem>
                <SelectItem value="dark">Тёмная</SelectItem>
                <SelectItem value="system">Системная</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
