'use client';
import { Tldraw } from 'tldraw';
import { Navbar } from './components/Navbar';
import './index.css';
import { ZoomMenu } from './components/ZoomMenu';
import { Header } from './components/Header';
import { hiddenComponents } from './customConfig';
import { StylePanel } from './components/StylePanel';
export const WhiteBoard = () => (
  <Tldraw
    onMount={(editor) => {
      editor.updateInstanceState({ isGridMode: true });
    }}
    components={hiddenComponents}
  >
    <Header />
    <Navbar />
    <ZoomMenu />
    <StylePanel />
  </Tldraw>
);
