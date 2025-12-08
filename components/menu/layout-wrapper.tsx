"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"
import { Footer } from "./footer"
import type { HeaderMenu, FooterMenu } from "@/lib/sanity/queries"

interface LayoutWrapperProps {
  children: React.ReactNode
  headerMenu: HeaderMenu | null
  footerMenu: FooterMenu | null
}

export function LayoutWrapper({ children, headerMenu, footerMenu }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith("/studio")

  return (
    <>
      {!isStudio && <Header menu={headerMenu} />}
      {children}
      {!isStudio && <Footer menu={footerMenu} />}
    </>
  )
}

