'use client';

// import { Metadata } from 'next';
import { ReactNode } from 'react';
import { ThemeRegistry } from 'pkg.theme';

// export const metadata: Metadata = {
//   title: 'xi.effect',
//   description: 'Welcome to xi.effect',
// };

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/me/profile/`, {
    cache: 'no-store',
  });

  return res.json();
}

export default async function RootLayout({
  params,
  auth,
  main,
}: {
  params: any;
  children: ReactNode;
  auth: ReactNode;
  main: ReactNode;
}) {
  const data = await getData();
  console.log('data', data);
  console.log('params', params);

  return (
    <html lang="en">
      <body>
        <ThemeRegistry mode="light">
          <div>
            {data?.a === 'unauthorized: Missing cookie "access_token_cookie"' ? auth : main}
          </div>
        </ThemeRegistry>
      </body>
    </html>
  );
}
