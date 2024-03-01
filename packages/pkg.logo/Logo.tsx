'use client'

import React from "react"
import Image from "next/image";
import { useTheme } from "next-themes"

type LogoProps = {
    height: number,
    width: number,
    logoVariant: 'navigation' | 'id'
    logoSize: 'default' | 'small'
}

export const Logo = ({height, width, logoVariant, logoSize}: LogoProps) => {
   const { resolvedTheme } = useTheme()

    return (
          <Image
            height={height}
            width={width}
            alt="xieffect logo"
            src={`/assets/brand/${logoVariant}logo-${logoSize}-${resolvedTheme}.svg`}
          />
    )
    
}