import { TLAsset, uniqueId } from 'tldraw';

export interface TLAssetContext {
  screenScale: number;
  steppedScreenScale: number;
  dpr: number;
  networkEffectiveType: string | null;
  shouldResolveToOriginal: boolean;
}

export interface TLAssetStore {
  /**
   * Upload an asset to your storage, returning a URL that can be used to refer to the asset
   * long-term.
   *
   * @param asset - Information & metadata about the asset being uploaded
   * @param file - The `File` to be uploaded
   * @returns A promise that resolves to the URL of the uploaded asset
   */
  upload(asset: TLAsset, file: File): Promise<string>;
  /**
   * Resolve an asset to a URL. This is used when rendering the asset in the editor. By default,
   * this will just use `asset.props.src`, the URL returned by `upload()`. This can be used to
   * rewrite that URL to add access credentials, or optimized the asset for how it's currently
   * being displayed using the {@link TLAssetContext | information provided}.
   *
   * @param asset - the asset being resolved
   * @param ctx - information about the current environment and where the asset is being used
   * @returns The URL of the resolved asset, or `null` if the asset is not available
   */
  resolve?(asset: TLAsset, ctx: TLAssetContext): Promise<string | null> | string | null;
}

const UPLOAD_URL = '/api/protected/storage-service/files/attachments/';

export const myAssetStore: TLAssetStore = {
  async upload(asset, file) {
    const id = uniqueId();
    const objectName = `${id}-${file.name}`.replace(/[^a-zA-Z0-9.]/g, '-');
    const url = `${UPLOAD_URL}/${objectName}`;
    const formData = new FormData();
    formData.append('attachment', file, objectName);

    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`File upload failed: ${response.statusText}`);
    }

    const result = await response.json();

    return url;
  },

  resolve(asset) {
    return asset.props.src;
  },
};
