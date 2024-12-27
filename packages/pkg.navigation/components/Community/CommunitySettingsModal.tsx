import { Modal, ModalContent, ModalTitle } from '@xipkg/modal';
import { CommunitySettings } from 'pkg.community.settings';

type CommunitySettingsModalT = {
  open: boolean;
  onOpenChange: () => void;
};

export const CommunitySettingsModal = ({ open, onOpenChange }: CommunitySettingsModalT) => (
  <Modal open={open} onOpenChange={onOpenChange}>
    <ModalContent variant="full" className="p-4 lg:p-6">
      <ModalTitle className="hidden"> Настройки сообщества </ModalTitle>
      <CommunitySettings />
    </ModalContent>
  </Modal>
);
