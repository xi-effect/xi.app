import { post } from 'pkg.utils/fetch';
import { TLAsset } from 'tldraw';

export type TLAssetContextT = {
  screenScale: number;
  steppedScreenScale: number;
  dpr: number;
  networkEffectiveType: string | null;
  shouldResolveToOriginal: boolean;
};

export type MediaResponseT = {
  creator_user_id: string;
  id: string;
  kind: string;
  name: string;
};

export type TLAssetStoreT = {
  upload(asset: TLAsset | null, file: File): Promise<string>;
  resolve?(asset: TLAsset, ctx: TLAssetContextT): Promise<string | null> | string | null;
};

const WORKER_URL =
  `${process.env.NEXT_PUBLIC_SERVER_URL_BACKEND}/api/protected/storage-service/files/`;
const UPLOAD_URL = '/api/protected/storage-service/files/attachments/';

export const myAssetStore: TLAssetStoreT = {
  async upload(asset: TLAsset | null, file: File) {
    const formData = new FormData();
    formData.append('attachment', file);

    try {
      const { data, status } = await post<unknown, MediaResponseT>({
        service: 'backend',
        path: UPLOAD_URL,
        body: formData,
      });

      if (status !== 201) {
        throw new Error(`File upload failed: ${status}`);
      }

      const url = `${WORKER_URL}${data.id}/`;
      return url;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },

  resolve(asset) {
    return asset.props.src;
  },
};
