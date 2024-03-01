'use client'

import React from "react"
import Image from "next/image";
import { useTheme } from "next-themes"

type LogoProps = {
    height: number,
    width: number,
    
    //  logoVarian это название файла svg (без расширения),
    //  в папке public/assets/brand 
    logoVariant: 'navigation' | 'id'
    logoSize: 'default' | 'small'
}

export const Logo = ({height, width, logoVariant, logoSize}: LogoProps) => {
   const { resolvedTheme } = useTheme()

   if (resolvedTheme === 'light') return (
          <Image
            height={height}
            width={width}
            alt="xieffect logo"
            src={`/assets/brand/${logoVariant}logo-${logoSize}-light.svg`}
          />
    )

    return (
          <Image
            height={height}
            width={width}
            alt="xieffect logo"
            src={`/assets/brand/${logoVariant}logo-${logoSize}-dark.svg`}
          />
    )
    
}