'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ComponentProps } from 'react';

type LogoT = {
  logoVariant: 'navigation' | 'id';
  logoSize: 'default' | 'small';
} & Omit<ComponentProps<typeof Image>, 'src' | 'alt'>;

export const Logo = ({ logoVariant, logoSize, ...rest }: LogoT) => {
  const { resolvedTheme } = useTheme();

  return (
    <Image
      alt="xieffect logo"
      src={`/assets/brand/${logoVariant}logo-${logoSize}-${resolvedTheme}.svg`}
      {...rest}
    />
  );
};
