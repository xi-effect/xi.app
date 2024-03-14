import { Button } from '@xipkg/button';
import { Input } from '@xipkg/input';
import { Label } from '@xipkg/label';
import { useMedia } from 'pkg.utils';
import { UserPreview } from './UserPreview';
import { UserT } from 'pkg.models';


export const PersonalData = () => {
  const isMobile = useMedia('(max-width: 719px)');

  return (
    <>
      {!isMobile && <span className="text-3xl font-semibold">Личные данные</span>}
      <UserPreview className="mt-4" />
      <div className="border-gray-80 mt-8 flex w-full flex-col rounded-2xl border p-6">
        <div className="flex w-full gap-8 flex-col md:flex-row">
          <div className="w-full">
            <Label className="">Отображаемое имя</Label>
            <Input className="mt-2 w-full" />
          </div>
          <div className="w-full">
            <Label>Имя пользователя</Label>
            <Input className="mt-2 w-full" />
          </div>
        </div>
        <div className="mt-8">
          <Button size="l"> Сохранить </Button>
        </div>
      </div>
    </>
  );
};
