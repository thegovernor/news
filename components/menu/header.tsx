"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { urlFor } from "@/sanity/lib/image"
import type { HeaderMenu } from "@/lib/sanity/queries"

interface HeaderProps {
  menu: HeaderMenu | null
}

// Fallback menu items if Sanity menu is not available
const fallbackMenuItems = [
  { title: "الرئيسية", href: "/#hero", order: 0, isExternal: false },
  { title: "التحليل السياسي", href: "/political-analysis", order: 1, isExternal: false },
  { title: "المقالات", href: "/articles", order: 2, isExternal: false },
  { title: "بريد ودك", href: "/barid", order: 3, isExternal: false },
  { title: "من نحن", href: "/about", order: 4, isExternal: false },
  { title: "اتصل بنا", href: "/contact", order: 5, isExternal: false },
]

export function Header({ menu }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  
  // Normalize hrefs to ensure internal links are absolute paths
  const normalizeHref = (href: string, isExternal: boolean): string => {
    // For external links, return as-is
    if (isExternal) {
      return href
    }
    // For internal links, ensure they start with "/"
    // If href starts with "#" (anchor), return as-is
    if (href.startsWith("#") || href.startsWith("/")) {
      return href
    }
    // Otherwise, prepend "/" to make it absolute
    return `/${href}`
  }
  
  const menuItems = (menu?.items || fallbackMenuItems).map(item => ({
    ...item,
    href: normalizeHref(item.href, item.isExternal || false)
  }))

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* Kuwait flag inspired top border */}
      <div className="h-1.5 flex">
        <div className="flex-1 bg-[#007A3D]"></div>
        <div className="flex-1 bg-[#CE1126]"></div>
        <div className="w-40 bg-black"></div>
      </div>
      
      <div className="border-b border-primary/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex h-20 md:h-28 items-center justify-between">
            {/* Logo */}
            <Link 
              href={menu?.logo?.href ? normalizeHref(menu.logo.href, false) : "/"} 
              className="flex items-center space-x-2 space-x-reverse"
            >
              {menu?.logo?.image ? (
                <div className="relative h-20 md:h-28 w-auto max-w-[180px] bg-transparent">
                  <Image
                    src={urlFor(menu.logo.image).width(500).height(400).format('png').url()}
                    alt={menu.logo.text || "Logo"}
                    width={500}
                    height={400}
                    className="h-full w-auto object-contain"
                    style={{ objectFit: 'contain' }}
                    unoptimized={true}
                    priority
                  />
                </div>
              ) : (
                <span className="text-3xl font-bold text-primary">
                  {menu?.logo?.text || "أخبار"}
                </span>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {menuItems.map((item, index) => (
                <Link
                  key={item.href || index}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="text-sm md:text-base font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-4 mt-8">
                  {menuItems.map((item, index) => (
                    <Link
                      key={item.href || index}
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="text-sm md:text-base font-medium text-foreground/80 transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      </div>
    </header>
  )
}

