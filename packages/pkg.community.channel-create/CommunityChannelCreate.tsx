import React, { ReactNode } from 'react';
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalCloseButton,
} from '@xipkg/modal';
import { Input } from '@xipkg/input';
import { Label } from '@xipkg/label';
import { Close, Announce, Task, Camera, Chat } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { ActionsSheetButton } from './components/ActionsSheetButton';

interface CommunityChannelCreateT {
  children: ReactNode;
}

export const CommunityChannelCreate = ({ children }: CommunityChannelCreateT) => {
  const [currentAction, setCurrentAction] = React.useState<number | null>(null);

  const classBtnActive = 'border-[7px] border-solid border-[#445AFF]';
  const classBtnNotActive = 'border-[1px] border-solid border-[#B8B8B8]';

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
      icon: Camera,
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

  return (
    <Modal>
      <ModalTrigger className="bg-[transparent] flex justify-between w-full items-center">
        {children}
      </ModalTrigger>
      <ModalContent>
        <ModalHeader className="flex flex-row items-center justify-between ">
          <ModalTitle>Создание канала</ModalTitle>
          <ModalCloseButton className="static sm:fixed">
            <Close className="fill-[#404040] sm:fill-[#FFFFFF] " />
          </ModalCloseButton>
        </ModalHeader>
        <ModalDescription className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label className="text-[#101010] text-[16px] font-medium">Название</Label>
            <Input />
          </div>
          <div>
            <Label className="text-[#101010] text-[16px] font-bold">Тип</Label>
            <div className="flex flex-col gap-4">
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
        </ModalDescription>
        <ModalFooter>
          <Button className="w-full">Создать</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
