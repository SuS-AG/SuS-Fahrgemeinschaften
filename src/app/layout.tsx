import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="de">
    <head/>
    <body>
        {children}
    </body>
  </html>;
}
