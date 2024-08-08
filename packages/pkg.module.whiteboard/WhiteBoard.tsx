'use client';

import { DefaultContextMenu, Tldraw } from 'tldraw';
import { Navbar } from './components/Navbar';
import './index.css';
import { ZoomMenu } from './components/ZoomMenu';
import { Header } from './components/Header';
import { hiddenComponents } from './utils/customConfig';
import { StylePanel } from './components/StylePanel';
import { StickerTool } from './components/CustomTools';
// import { myAssetStore } from './utils/imageStore';

export const WhiteBoard = () => {
  return (
    <Tldraw
      onMount={(editor) => {
        editor.updateInstanceState({ isGridMode: true });
      }}
      tools={[StickerTool]}
      components={hiddenComponents}
    >
      <Header />
      <Navbar />
      <ZoomMenu />
      <StylePanel />
      <DefaultContextMenu />
    </Tldraw>
  );
};
