import React, { ReactNode } from 'react';
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@xipkg/modal';
import { Close } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import Cropper from 'react-easy-crop';

type AvatarEditorT = {
  children: ReactNode;
};

export const AvatarEditorComponent = ({ children }: AvatarEditorT) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);

  const onCropChange = (crop: any) => {
    setCrop(crop);
  };

  const onCropComplete = (
    croppedArea: any,
    croppedAreaPixels: { width: number; height: number },
  ) => {
    console.log(croppedAreaPixels.width / croppedAreaPixels.height);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  return (
    <Modal>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent className="sm:max-w-[600px]">
        <ModalCloseButton>
          <Close className="fill-gray-80 sm:fill-gray-0" />
        </ModalCloseButton>
        <ModalHeader>
          <ModalTitle>Изменение фотографии</ModalTitle>
        </ModalHeader>
        <div className="relative h-[300px] w-[calc(100%-48px)]">
          <Cropper
            image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
            crop={crop}
            cropSize={{ width: 236, height: 236 }}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
            style={{
              containerStyle: {
                borderRadius: '8px',
                left: '24px',
                width: '100%',
              },
            }}
            minZoom={0.85}
          />
        </div>
        <ModalFooter className="gap-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button className="ml-auto" variant="secondary">
            Отменить
          </Button>
          <Button>Изменить</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
