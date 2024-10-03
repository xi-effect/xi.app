import imageCompression from 'browser-image-compression';
import Resizer from 'react-image-file-resizer';

export const resizeFile = (file: File | Blob) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1570,
      1570,
      'WEBP',
      90,
      0,
      (result) => {
        resolve(result);
      },
      'file',
    );
  });

export const getCompressedFile = async (file: File) => {
  const compressedFile = await imageCompression(file, { maxSizeMB: 1 });
  return compressedFile;
};
