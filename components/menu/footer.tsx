"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
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
      { title: "من نحن", href: "/about" },
      { title: "اتصل بنا", href: "/contact" },
    ],
  },
  {
    title: "الأقسام",
    items: [
      { title: "الرئيسية", href: "/#hero" },
      { title: "التحليل السياسي", href: "/political-analysis" },
      { title: "المقالات", href: "/articles" },
      { title: "سلة ودك", href: "/barid" },
    ],
  },
  {
    title: "معلومات قانونية",
    items: [
      { title: "شروط الاستخدام", href: "#" },
      { title: "سياسة الخصوصية", href: "#" },
    ],
  },
  {
    title: "تابعنا",
    items: [
      { title: "تويتر", href: "#" },
      { title: "فيسبوك", href: "#" },
      { title: "إنستغرام", href: "#" },
    ],
  },
]

export function Footer({ menu }: FooterProps) {
  const sections = menu?.sections || fallbackSections
  const copyright = menu?.copyright || "جميع الحقوق محفوظة"

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, sectionIndex) => (
            <div key={section.title || sectionIndex} className="space-y-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={item.href || itemIndex}>
                    <Link
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo */}
            {menu?.logo && (menu.logo.image || menu.logo.text) && (
              <Link 
                href={menu.logo.href || "/"} 
                className="inline-flex items-center"
              >
                {menu.logo.image ? (
                  <Image
                    src={urlFor(menu.logo.image).width(200).height(80).url()}
                    alt={menu.logo.text || "Logo"}
                    width={200}
                    height={80}
                    className="h-10 w-auto object-contain"
                    style={{ maxHeight: '40px' }}
                  />
                ) : (
                  <span className="text-xl font-bold">
                    {menu.logo.text || "أخبار"}
                  </span>
                )}
              </Link>
            )}
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} أخبار. {copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

