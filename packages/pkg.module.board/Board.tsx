import { Canvas } from './Canvas';
import { StageProvider } from './providers';

export const Board = () => (
  <StageProvider>
    <Canvas />
  </StageProvider>
);
