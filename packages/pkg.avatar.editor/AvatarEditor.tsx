'use client';

import React from 'react';
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@xipkg/modal';
import { Close, Minus, Plus } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { Slider } from '@xipkg/slider';
import Cropper from 'react-easy-crop';
import { put } from 'pkg.utils';
import { toast } from 'sonner';
import Resizer from 'react-image-file-resizer';
import { getCroppedImg } from './utils';

type AvatarEditorT = {
  file: any;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  setDate?: (value: Date) => void;
  withLoadingToServer?: boolean;
  onBase64Return?: (resizedImageBase: string, form: FormData) => void;
  communityId?: number | undefined;
};

const MAX_ZOOM = 3;
const MIN_ZOOM = 0.8;
const ZOOM_STEP = 0.01;

export const AvatarEditorComponent = ({
  withLoadingToServer = true,
  file,
  open,
  onOpenChange,
  setDate,
  onBase64Return,
  communityId,
}: AvatarEditorT) => {
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

  const onZoomChange = (zooms: number) => {
    if (zooms < MIN_ZOOM) {
      setZoom(MIN_ZOOM);
      return;
    }

    if (zooms > MAX_ZOOM) {
      setZoom(MAX_ZOOM);
      return;
    }
    setZoom(zooms);
  };

  const increaseZoom = () => {
    setZoom((prev) => (prev < MAX_ZOOM ? prev + ZOOM_STEP : MAX_ZOOM));
  };

  const decreaseZoom = () => {
    setZoom((prev) => (prev > MIN_ZOOM ? prev - ZOOM_STEP : MIN_ZOOM));
  };

  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<{
    width: number;
    height: number;
  } | null>(null);

  const resizeFile = (file: File, type: 'blob' | 'base64') =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        256,
        256,
        'WEBP',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        type,
      );
    });

  const showCroppedImage = async () => {
    try {
      const croppedImage = (await getCroppedImg(file, croppedAreaPixels)) as Blob;
      const f = new File([croppedImage], 'avatar.webp');
      const resizedImage = (await resizeFile(f, 'blob')) as Blob;
      const resizedImageBase = (await resizeFile(f, 'base64')) as string;

      const form = new FormData();
      form.append('avatar', resizedImage, 'avatar.webp');

      if (!withLoadingToServer && onBase64Return) {
        return onBase64Return(resizedImageBase, form);
      }

      const pathAddress = communityId
        ? `/api/protected/community-service/communities/${communityId}/avatar/`
        : '/api/users/current/avatar/';
      const currentService = communityId ? 'backend' : 'auth';

      const { status } = await put({
        service: currentService,
        path: pathAddress,
        body: form,
        config: {
          headers: {},
        },
      });

      if (status === 204) {
        toast('Аватарка успешно загружена. В ближайшее время она отобразится на сайте');
        onOpenChange(false);
        if (setDate) setDate(new Date());
      }
    } catch (e) {
      console.error(e);
    }

    return null;
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
            minZoom={MIN_ZOOM}
          />
        </div>
        <div className="relative flex items-center justify-center px-6 pb-6 pt-4">
          <button
            aria-label="Минус"
            type="button"
            className="mx-4 bg-transparent p-1"
            onClick={decreaseZoom}
          >
            <Minus size="m" />
          </button>
          <Slider
            className="w-[250px]"
            value={[zoom]}
            max={MAX_ZOOM}
            step={ZOOM_STEP}
            min={MIN_ZOOM}
            defaultValue={[zoom]}
            onValueChange={(v: number[]) => onZoomChange(v[0])}
          />
          <button
            aria-label="Плюс"
            type="button"
            className="mx-4 bg-transparent p-1"
            onClick={increaseZoom}
          >
            <Plus size="m" />
          </button>
        </div>
        <ModalFooter className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end sm:space-x-2">
          <Button onClick={() => onOpenChange(false)} className="md:ml-auto" variant="secondary">
            Отменить
          </Button>
          <Button onClick={() => showCroppedImage()}>Сохранить</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
