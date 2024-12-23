/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import randomColor from 'randomcolor';

export type CursorData = {
  name: string;
  color: string;
};

export const randomCursorData = (): CursorData => ({
  color: randomColor({
    luminosity: 'dark',
    alpha: 1,
    format: 'hex',
  }),
  name: 'Гарри Поттер',
});
