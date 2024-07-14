/* eslint-disable no-undef */

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    // @ts-ignore
    ym('97825173', 'hit', url);
  }, [pathname, searchParams]);

  return null;
}
