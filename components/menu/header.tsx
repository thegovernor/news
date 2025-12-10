"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
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
  { title: "سلة ودك", href: "/barid", order: 3, isExternal: false },
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
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* Kuwait flag inspired top border */}
      <div className="h-1.5 flex">
        <div className="flex-1 bg-[#007A3D]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#CE1126]"></div>
        <div className="w-20 bg-black"></div>
      </div>
      
      <div className="border-b border-primary/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex h-24 items-center justify-between">
            {/* Logo */}
            <Link 
              href={menu?.logo?.href ? normalizeHref(menu.logo.href, false) : "/"} 
              className="flex items-center space-x-2 space-x-reverse"
            >
              {menu?.logo?.image ? (
                <Image
                  src={urlFor(menu.logo.image).width(300).height(120).url()}
                  alt={menu.logo.text || "Logo"}
                  width={300}
                  height={120}
                  className="h-20 w-auto object-contain"
                  style={{ maxHeight: '80px' }}
                />
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
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
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
                      className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                  
                  {/* Mobile Search */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        type="search"
                        placeholder="بحث..."
                        className="flex-1"
                      />
                      <Button size="icon" variant="outline">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
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

