import type { Metadata } from "next";
import { Tajawal, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/menu/layout-wrapper";
import { getHeaderMenu, getFooterMenu } from "@/lib/sanity/queries";
import { urlFor } from "@/sanity/lib/image";

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

export async function generateMetadata(): Promise<Metadata> {
  const headerMenu = await getHeaderMenu();
  
  const faviconUrl = headerMenu?.logo?.image
    ? urlFor(headerMenu.logo.image).width(32).height(32).format('png').url()
    : undefined;
  
  const appleIconUrl = headerMenu?.logo?.image
    ? urlFor(headerMenu.logo.image).width(180).height(180).format('png').url()
    : undefined;

  return {
    title: "الوطنية الدستورية الكويتيه",
    description: "موقع الأخبار العربي - آخر الأخبار والتحديثات",
    icons: faviconUrl
      ? {
          icon: [
            { url: faviconUrl, sizes: "32x32", type: "image/png" },
            { url: faviconUrl, sizes: "16x16", type: "image/png" },
          ],
          apple: appleIconUrl
            ? [{ url: appleIconUrl, sizes: "180x180", type: "image/png" }]
            : undefined,
          shortcut: faviconUrl,
        }
      : undefined,
  };
}

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
