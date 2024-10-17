import { SetStateAction } from 'react';
import { CategoryT } from './components/types';

export type CommunityTemplateT = {
  name: string | null;
  avatar?: string;
  id: number | null | 'empty';
  isOwner?: boolean;
  description: string | null;
};

export type EditCategoryFormT = {
  name: string;
  description: string;
  // privateCategory: boolean;
};

export type EditCategoryModalPropsT = {
  isOpen: boolean;
  onOpenChange: (value: SetStateAction<boolean>) => void;
  onConfirm: (value: CategoryT) => void; // & { privateCategory: boolean }
  category: CategoryT;
};
