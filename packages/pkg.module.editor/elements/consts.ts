export type ColorMapKeys = keyof typeof colorMap;
export type BackgroundColorMapKeys = keyof typeof backgroundColorMap;

export const colorMap = {
  green: 'var(--xi-green-80)',
  blue: 'var(--xi-cyan-100)',
  darkBlue: 'var(--xi-brand-80)',
  gray: 'var(--xi-gray-60)',
  purple: 'var(--xi-violet-100)',
  pink: 'var(--xi-pink-100)',
  red: 'var(--xi-red-100)',
  orange: 'var(--xi-orange-100)',
  yellow: 'var(--xi-yellow-100)',
};

export const backgroundColorMap = {
  lightGray: 'var(--xi-gray-10)',
  lightRed: 'var(--xi-red-0)',
  lightOrange: 'var(--xi-orange-0)',
  lightGreen: 'var(--xi-green-0)',
  lightBlue: 'var(--xi-brand-0)',
  lightYellow: 'var(--xi-yellow-20)',
  lightPurple: 'var(--xi-violet-20)',
  lightPink: 'var(--xi-pink-20)',
  lightCyan: 'var(--xi-cyan-20)',
};
