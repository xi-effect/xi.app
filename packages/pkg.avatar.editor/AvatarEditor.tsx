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
import { getCroppedImg } from './utils';
import { put } from 'pkg.utils';
import { toast } from 'sonner';

type AvatarEditorT = {
  file: any;
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

export const AvatarEditorComponent = ({ file, open, onOpenChange }: AvatarEditorT) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);

  const onCropChange = (crop: any) => {
    setCrop(crop);
  };

  const onCropComplete = (
    croppedArea: any,
    croppedAreaPixels: { width: number; height: number },
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<{
    width: number;
    height: number;
  } | null>(null);

  const showCroppedImage = async () => {
    try {
      const croppedImage = (await getCroppedImg(file, croppedAreaPixels)) as Blob;

      const form = new FormData();
      form.append('avatar', croppedImage, 'avatar.webp');

      const { data, status } = await put({
        service: 'auth',
        path: '/api/users/current/avatar/',
        body: form,
        config: {
          headers: {},
        },
      });

      if (status === 204) {
        toast('Аватарка успешно загружена. В ближайшее время она отобразится на сайте');
        onOpenChange(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal open={open} onOpenChange={(value) => onOpenChange(value)}>
      <ModalContent className="z-50 sm:max-w-[600px]">
        <ModalCloseButton>
          <Close className="fill-gray-80 sm:fill-gray-0" />
        </ModalCloseButton>
        <ModalHeader>
          <ModalTitle>Изменение фотографии</ModalTitle>
        </ModalHeader>
        <div className="relative h-[300px] w-[calc(100%-48px)]">
          <Cropper
            image={
              file ||
              'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'
            }
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
        <ModalFooter className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end sm:space-x-2">
          <Button onClick={() => onOpenChange(false)} className="md:ml-auto" variant="secondary">
            Отменить
          </Button>
          <Button onClick={() => showCroppedImage()}>Изменить</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
