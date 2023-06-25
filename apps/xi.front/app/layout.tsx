import { Metadata } from "next";
import { ReactNode } from "react";
import { ThemeRegistry } from "pkg.theme";

export const metadata: Metadata = {
  title: "xi.effect",
  description: "Welcome to xi.effect",
};

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users/me/profile/`,
    {
      cache: "no-store",
    }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  console.log("res", res);
  // Recommendation: handle errors
  if (res.status === 401) {
    console.error("401");
  }

  return res.json();
}

export default async function RootLayout({
  params,
  children,
  login,
  main,
}: {
  params: any;
  children: ReactNode;
  login: ReactNode;
  main: ReactNode;
}) {
  const data = await getData();
  console.log("data", data);
  console.log("params", params);

  return (
    <html lang="en">
      <body>
        <ThemeRegistry mode="light">
          <div>{children}</div>
          <div>{data.id === 1 ? main : login}</div>
        </ThemeRegistry>
      </body>
    </html>
  );
}
