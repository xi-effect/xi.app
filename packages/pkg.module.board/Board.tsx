'use client';

import { DefaultContextMenu, Tldraw } from 'tldraw';
import React from 'react';
import { Navbar } from './components/Navbar';
import './index.css';
import { ZoomMenu } from './components/ZoomMenu';
import { Header } from './components/Header';
import { hiddenComponents } from './utils/customConfig';
import { StickerTool } from './components/CustomTools';
import { useYjsStore } from './useYjsStore';

// import { myAssetStore } from './utils/imageStore';

type BoardPropsT = {
  token: string;
};

export const Board = ({ token }: BoardPropsT) => {
  console.log('token', token);
  const store = useYjsStore({ roomId: token });

  return (
    <Tldraw
      store={store}
      // assets={myAssetStore as TLAssetStoreT}
      onMount={(editor) => {
        editor.updateInstanceState({ isGridMode: true });
      }}
      tools={[StickerTool]}
      components={hiddenComponents}
      // overrides={[
      //   LoadingScreen: () => <span> Loading </span>,
      // ]}
    >
      <Header />
      <Navbar />
      <ZoomMenu />
      <DefaultContextMenu />
    </Tldraw>
  );
};
