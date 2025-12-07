"use client"

import * as React from "react"
import Link from "next/link"

// Section menu items matching header
const sectionMenuItems = [
  { id: "hero", title: "الرئيسية", href: "/#hero" },
  { id: "political-analysis", title: "التحليل السياسي", href: "/political-analysis" },
  { id: "articles", title: "المقالات", href: "/#articles" },
  { id: "barid", title: "سلة ودك", href: "/#barid" },
]

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">عن الموقع</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  رؤيتنا
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  فريق العمل
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Sections Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">الأقسام</h3>
            <ul className="space-y-2">
              {sectionMenuItems.map((section) => (
                <li key={section.id}>
                  <Link
                    href={section.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {section.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">معلومات قانونية</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  شروط الاستخدام
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  سياسة ملفات تعريف الارتباط
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  إعلان معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تابعنا</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  تويتر
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  فيسبوك
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  إنستغرام
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  يوتيوب
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  النشرة الإخبارية
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} أخبار. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                خريطة الموقع
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                الأرشيف
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

