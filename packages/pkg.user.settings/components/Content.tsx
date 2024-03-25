import { Main } from './Main';
import { Customization } from './Customization';
import { Secure } from './Secure';

type ContentPropsT = {
  activeQuery: string;
};

export const Content = ({ activeQuery }: ContentPropsT) => {
  const activeItem = () => {
    switch (activeQuery) {
      case 'home':
        return <Main />;
      case 'personalInfo':
        return <Customization />;
      case 'personalisation':
        return <Customization />;
      case 'security':
        return <Secure />;
      default:
        return <Main />;
    }
  };
  return <div className="w-full sm:ml-8">{activeItem()}</div>;
};
