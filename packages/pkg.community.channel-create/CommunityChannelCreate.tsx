import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalCloseButton,
} from '@xipkg/modal';
import { Input } from '@xipkg/input';
import { Label } from '@xipkg/label';
import { Close, Announce, Task, Conference, Chat } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { ActionsSheetButton } from './components/ActionsSheetButton';

interface CommunityChannelCreateT {
  open: boolean;
  onOpenChange: (value: React.SetStateAction<boolean>) => void;
}
// border-[6px] создает визуал радио-кнопки, по дизайну ширина 6px у обводки синий.
const classBtnActive = 'border-[6px] border-solid border-brand-80';
const classBtnNotActive = 'border border-solid border-gray-30';

const actionsSheetList = [
  {
    icon: Announce,
    title: 'Объявления',
    desctiption: 'Держите ваших студентов в курсе всех новостей по курсу',
  },
  {
    icon: Task,
    title: 'Задания',
    desctiption:
      'Создавайте задания, тесты, получайте ответы от учеников, оценивайте и улучшайте знания',
  },
  {
    icon: Conference,
    title: 'Видеоконференции',
    desctiption:
      'Проводите уроки онлайн, проводите активности, работайте со студентами из любой точки мира',
  },
  {
    icon: Chat,
    title: 'Чат со студентами',
    desctiption: 'Общайтесь, отвечайте на вопросы, объясняйте непонятные моменты',
  },
];

export const CommunityChannelCreate = ({ open, onOpenChange }: CommunityChannelCreateT) => {
  const [currentAction, setCurrentAction] = React.useState<number | null>(null);

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="sm:max-w-[560px] xl:max-w-[600px]">
        <ModalHeader className="flex flex-row items-center justify-between">
          <ModalTitle className="text-[24px] font-bold text-gray-100">Создание канала</ModalTitle>
          <ModalCloseButton className="static sm:fixed">
            <Close className="fill-gray-80 sm:fill-gray-0" />
          </ModalCloseButton>
        </ModalHeader>
        <div className="h-full max-h-[calc(100vh-80px-182px)] space-y-6 overflow-auto p-6">
          <div className="flex flex-col gap-2">
            <Label className="text-[16px] font-normal text-gray-100">Название</Label>
            <Input />
          </div>
          <div className="space-y-4">
            <Label className="text-[16px] font-medium text-gray-100">Тип</Label>
            <div className="space-y-4 overflow-auto">
              {actionsSheetList.map((item, index) => (
                <ActionsSheetButton
                  key={index}
                  Icon={item.icon}
                  title={item.title}
                  desctiption={item.desctiption}
                  index={index}
                  сlassName={currentAction === index ? classBtnActive : classBtnNotActive}
                  onClick={() => setCurrentAction(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <ModalFooter>
          <Button className="w-full">Создать</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
