// eslint-disable-next-line import/no-extraneous-dependencies
import { Close } from '@xipkg/icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Account, Exit, Home, Key, Palette } from '@xipkg/icons';

type ItemT = {
  name: string;
  query: string;
};

const options: ItemT[] = [
  {
    name: 'Главная',
    query: 'home',
  },
  {
    name: 'Личные данные',
    query: 'personalInfo',
  },
  {
    name: 'Персонализация',
    query: 'personalisation',
  },
  {
    name: 'Безопасность',
    query: 'security',
  },
  // {
  //   name: 'Звук и видео',
  // },
];

type ItemPropsT = {
  index: number;
  item: ItemT;
};

const Item = ({ index, item }: ItemPropsT) => {
  const getIconClassName = () =>
    'transition-colors ease-in fill-brand-80';

  // eslint-disable-next-line no-undef
  const iconsDict: React.ReactNode[] = [
    <Home className={getIconClassName()} />,
    <Account className={getIconClassName()} />,
    <Palette className={getIconClassName()} />,
    <Key className={getIconClassName()} />,
    // <SoundTwo className={getIconClassName(4)} />,
  ];

  return (
    <button
      type="button"
      className="text-gray-90 hover:bg-brand-0 hover:text-brand-80 bg-transparent group flex h-[40px] w-full flex-row items-center rounded-lg p-2 transition-colors ease-in hover:cursor-pointer"
      key={index.toString()}
    >
      {iconsDict[index]}
      <span className="pl-2 text-[14px] font-normal">{item.name}</span>
    </button>
  );
};

const CommunityTestPage = () => (
  <div className="w-[100vw] h-[100vh] min-h-[100vh] p-4 lg:p-6 fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] bg-gray-0 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
    <div className="flex h-[100dvh] min-h-[100dvh] w-full max-w-[1132px] flex-col">
      <div className="relative flex h-[40px] w-full items-center justify-start sm:mt-4">
        <div
          className="fixed z-50 right-[16px] ml-auto flex h-10 w-10 bg-transparent p-2 sm:absolute sm:right-0 sm:top-0 sm:bg-transparent xl:right-[-56px] xl:top-0"
        >
          <Close />
        </div>
      </div>
      <div className="mt-4 flex h-[100dvh] flex-row">
        <div className="flex-1">
          <div className="flex w-full flex-col gap-1 sm:w-[220px]">
            {options.map((item, index) => (
              <Item item={item} index={index} key={index} />
            ))}
            <button
              type="button"
              className="text-gray-60 hover:bg-red-0 group mt-10 flex h-[40px] w-full flex-row items-center rounded-lg bg-transparent p-2 transition-colors ease-in hover:cursor-pointer hover:text-red-100"
            >
              <Exit className="transition-colors ease-in group-hover:fill-red-100" />
              <span className="pl-2 text-[14px] font-normal">Выйти</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CommunityTestPage;
