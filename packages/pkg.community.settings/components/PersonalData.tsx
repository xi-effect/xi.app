/* eslint-disable jsx-a11y/control-has-associated-label */
import { Button } from '@xipkg/button';
import { Camera } from '@xipkg/icons';
import { Input } from '@xipkg/input';
import { Label } from '@xipkg/label';
import { useMedia } from 'pkg.utils';

export const PersonalData = () => {
  const isMobile = useMedia('(max-width: 719px)');

  return (
    <>
      {!isMobile && <span className="text-3xl font-semibold">Личные данные</span>}
      <div className="border-gray-80 flex h-[120px] w-full rounded-2xl border p-6 sm:mt-4">
        <button
          type="button"
          className="bg-gray-5 flex h-[72px] w-[72px] place-items-center justify-center rounded-[36px]"
        >
          <Camera size="l" className="fill-gray-60" />
        </button>
        <div className="ml-4 flex flex-col justify-center gap-0.5">
          <span className="text-2xl font-semibold leading-[32px]">Анна Иванова</span>
          <span className="text-gray-80 text-[16px] leading-[22px]">ivanova.a</span>
        </div>
      </div>
      <div className="border-gray-80 mt-8 flex w-full flex-col rounded-2xl border p-6">
        <div className="flex w-full gap-8">
          <div className="w-full">
            <Label className="">Отображаемое имя</Label>
            <Input className="mt-2 w-full" />
          </div>
          <div className="w-full">
            <Label>Никнейм</Label>
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
