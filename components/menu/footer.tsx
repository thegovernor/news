"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import type { FooterMenu } from "@/lib/sanity/queries"

interface FooterProps {
  menu: FooterMenu | null
}

// Fallback sections if Sanity menu is not available
const fallbackSections = [
  {
    title: "عن الموقع",
    items: [
      { title: "من نحن", href: "/about", isExternal: false },
      { title: "اتصل بنا", href: "/contact", isExternal: false },
    ],
  },
  {
    title: "الأقسام",
    items: [
      { title: "الرئيسية", href: "/#hero", isExternal: false },
      { title: "التحليل السياسي", href: "/political-analysis", isExternal: false },
      { title: "المقالات", href: "/articles", isExternal: false },
      { title: "بريد ودك", href: "/barid", isExternal: false },
    ],
  },
  {
    title: "معلومات قانونية",
    items: [
      { title: "شروط الاستخدام", href: "#", isExternal: false },
      { title: "سياسة الخصوصية", href: "#", isExternal: false },
    ],
  },
  {
    title: "تابعنا",
    items: [
      { title: "تويتر", href: "#", isExternal: false },
      { title: "فيسبوك", href: "#", isExternal: false },
      { title: "إنستغرام", href: "#", isExternal: false },
    ],
  },
]

export function Footer({ menu }: FooterProps) {
  const sections = menu?.sections || fallbackSections
  const copyright = menu?.copyright || "جميع الحقوق محفوظة"
  const [openSections, setOpenSections] = React.useState<Set<number>>(new Set())

  const toggleSection = (index: number) => {
    setOpenSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <footer className="relative bg-gradient-to-b from-[#f0f0f0] to-[#e0e0e0]">
      {/* Kuwait flag inspired top border */}
      <div className="h-2 flex">
        <div className="flex-1 bg-[#007A3D]"></div>
        <div className="flex-1 bg-[#CE1126]"></div>
        <div className="w-40 bg-black"></div>
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo Section */}
          {menu?.logo && (menu.logo.image || menu.logo.text) && (
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <Link 
                href={menu.logo.href || "/"} 
                className="inline-flex items-center justify-center md:justify-start"
              >
                {menu.logo.image ? (
                  <div className="relative h-24 md:h-32 w-auto max-w-[200px] bg-transparent">
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
                    {menu.logo.text || "أخبار"}
                  </span>
                )}
              </Link>
            </div>
          )}
          
          {sections.map((section, sectionIndex) => {
            const isOpen = openSections.has(sectionIndex)
            return (
              <div key={section.title || sectionIndex} className="space-y-4">
                <button
                  onClick={() => toggleSection(sectionIndex)}
                  className="md:pointer-events-none flex items-center justify-between w-full text-lg font-semibold text-primary md:justify-start"
                >
                  <h3>{section.title}</h3>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform md:hidden ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <ul
                  className={`space-y-2 transition-all duration-300 md:block ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  {section.items.map((item, itemIndex) => (
                    <li key={`${section.title}-${itemIndex}-${item.href || item.title}`}>
                      <Link
                        href={item.href}
                        target={item.isExternal ? "_blank" : undefined}
                        rel={item.isExternal ? "noopener noreferrer" : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-destructive"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t-2 border-primary">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} أخبار. <span className="text-primary">{copyright}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
