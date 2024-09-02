import { SetStateAction } from 'react';
import { CategoryT } from '../components/types';

export type EditCategoryModalPropsT = {
  isOpen: boolean;
  onOpenChange: (value: SetStateAction<boolean>) => void;
  onConfirm: (value: CategoryT) => void; // & { privateCategory: boolean }
  category: CategoryT;
};
