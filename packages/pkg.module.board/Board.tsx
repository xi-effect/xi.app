/* eslint-disable arrow-body-style */

'use client';

import { DefaultContextMenu, Tldraw } from 'tldraw';
import { Navbar } from './components/Navbar';
import './index.css';
import { ZoomMenu } from './components/ZoomMenu';
import { Header } from './components/Header';
import { hiddenComponents } from './utils/customConfig';
import { StickerTool } from './components/CustomTools';
import { useYjsStore } from './useYjsStore';

// import { myAssetStore } from './utils/imageStore';

export const Board = () => {
  const store = useYjsStore({});

  return (
    <Tldraw
      store={store}
      // assets={myAssetStore as TLAssetStoreT}
      // onMount={(editor) => {
      //   editor.updateInstanceState({ isGridMode: true });
      // }}
      tools={[StickerTool]}
      components={hiddenComponents}
    >
      <Header />
      <Navbar />
      <ZoomMenu />
      <DefaultContextMenu />
    </Tldraw>
  );
};
