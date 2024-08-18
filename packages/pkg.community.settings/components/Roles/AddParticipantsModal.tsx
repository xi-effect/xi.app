import React, { PropsWithChildren } from 'react';
import * as M from '@xipkg/modal';
import { Close, Search } from '@xipkg/icons';
import { Input } from '@xipkg/input';
import { Button } from '@xipkg/button';
import { Checkbox } from '@xipkg/checkbox';
import UserCard from './UserCard';

interface AddParticipantsModalProps extends PropsWithChildren {
  subtitle: string;
}

const mockParticipants: { id: string; name: string }[] = [
  {
    id: '1',
    name: 'Анна Иванова',
  },
  {
    id: '2',
    name: 'Алексей Петров',
  },
  {
    id: '3',
    name: 'Анна Иванова',
  },
  {
    id: '4',
    name: 'Алексей Петров',
  },
  {
    id: '5',
    name: 'Анна Иванова',
  },
  {
    id: '6',
    name: 'Алексей Петров',
  },
];

const AddParticipantsModal = ({ children, subtitle }: AddParticipantsModalProps) => {
  const [selectedParticipantIds, setSelectedParticipantIds] = React.useState<
    Record<string, boolean>
  >({ 1: true });

  return (
    <M.Modal>
      <M.ModalTrigger asChild>{children}</M.ModalTrigger>
      <M.ModalContent>
        <M.ModalCloseButton>
          <Close className="fill-white" />
        </M.ModalCloseButton>
        <M.ModalHeader>
          <M.ModalTitle>Добавление участников</M.ModalTitle>
          <p className="text-gray-80">{subtitle}</p>
        </M.ModalHeader>
        <div className="p-6">
          <Input placeholder="Поиск по участникам" before={<Search />} />
          <div className="mt-4">
            {mockParticipants.map((participant) => (
              <UserCard
                key={participant.id}
                before={
                  <Checkbox
                    className="mr-2 !size-5 rounded-md"
                    checked={selectedParticipantIds[participant.id]}
                    onCheckedChange={(v) =>
                      typeof v === 'boolean' &&
                      setSelectedParticipantIds((p) => ({ ...p, [participant.id]: v }))
                    }
                  />
                }
                avatarSrc="/assets/avatarrep.svg"
                login="sergeev.d"
                name="Даниил Сергеев"
              />
            ))}
          </div>
        </div>
        <M.ModalFooter className="flex justify-end gap-4">
          <M.ModalCloseButton asChild variant="noStyle">
            <Button>Отменить</Button>
          </M.ModalCloseButton>
          <Button onClick={() => {}}>Добавить</Button>
        </M.ModalFooter>
      </M.ModalContent>
    </M.Modal>
  );
};

export default AddParticipantsModal;
