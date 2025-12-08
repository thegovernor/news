import type { Metadata } from "next";
import { Tajawal, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/menu/layout-wrapper";
import { getHeaderMenu, getFooterMenu } from "@/lib/sanity/queries";

const tajawal = Tajawal({
  variable: "--font-arabic-sans",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic-mono",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "أخبار - موقع الأخبار العربي",
  description: "موقع الأخبار العربي - آخر الأخبار والتحديثات",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerMenu = await getHeaderMenu();
  const footerMenu = await getFooterMenu();

  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${tajawal.variable} ${ibmPlexArabic.variable} antialiased`}
      >
        <LayoutWrapper headerMenu={headerMenu} footerMenu={footerMenu}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
