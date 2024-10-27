import type { Metadata } from "next";
import classNames from "classnames";
import { Noto_Sans_KR, Noto_Sans_Mono } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import ThemeProvider from "./Initializer";
import Header from "./Header";
import "./globals.scss";

const notoSansKr = Noto_Sans_KR({
  weight: ["400", "600"],
  variable: "--notosanskr",
  subsets: ["latin"],
  display: "swap",
});

const notoSansMono = Noto_Sans_Mono({
  weight: ["400", "600"],
  variable: "--notosansmono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Three.js Shader Editor",
  description: "The glsl editor for Three.js shader materials.",
};

const RootLayout = (props: React.PropsWithChildren) => (
  <html lang="en">
    <body
      style={{ opacity: 0 }}
      className={classNames(notoSansMono.variable, notoSansKr.variable, notoSansKr.className)}
    >
      <AppRouterCacheProvider>
        <ThemeProvider>
          <Header />
          {props.children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </body>
  </html>
);

export default RootLayout;
