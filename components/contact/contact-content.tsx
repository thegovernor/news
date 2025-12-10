"use client"

import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin, Youtube, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { ContactContent } from "@/lib/sanity/queries"

interface ContactContentProps {
  contact: ContactContent
}

export function ContactContent({ contact }: ContactContentProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] bg-gradient-to-br from-primary/90 via-primary/95 to-primary overflow-hidden">
        {/* Kuwait flag colors overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#007A3D]/20 via-transparent to-[#CE1126]/20"></div>
        
        {/* Geometric Square Pattern */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Decorative Squares */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white/20 rotate-45"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white/20 rotate-12"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 border-2 border-white/20 -rotate-45"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 border-2 border-white/20 rotate-12"></div>
          <div className="absolute top-1/3 left-1/3 w-16 h-16 border-2 border-white/20"></div>
        </div>
        
        {/* Subtle Grid Dots */}
        <div 
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        
        <div className="container mx-auto px-4 max-w-7xl h-full flex items-center justify-center relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 shadow-lg">
                <Mail className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-white drop-shadow-lg">
              {contact.title}
            </h1>
            {contact.description && (
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
                {contact.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="w-full py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">معلومات الاتصال</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {contact.email && (
              <Card className="border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">البريد الإلكتروني</h3>
                  <a 
                    href={`mailto:${contact.email}`} 
                    className="text-primary hover:underline break-all text-sm"
                  >
                    {contact.email}
                  </a>
                </CardContent>
              </Card>
            )}

            {contact.phone && (
              <Card className="border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">الهاتف</h3>
                  <a 
                    href={`tel:${contact.phone}`} 
                    className="text-primary hover:underline"
                  >
                    {contact.phone}
                  </a>
                </CardContent>
              </Card>
            )}

            {contact.address && (
              <Card className="border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">العنوان</h3>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">
                    {contact.address}
                  </p>
                </CardContent>
              </Card>
            )}

            {contact.workingHours && (contact.workingHours.weekdays || contact.workingHours.weekend) && (
              <Card className="border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">ساعات العمل</h3>
                  {contact.workingHours.weekdays && (
                    <p className="text-muted-foreground text-sm mb-1">
                      {contact.workingHours.weekdays}
                    </p>
                  )}
                  {contact.workingHours.weekend && (
                    <p className="text-muted-foreground text-sm">
                      {contact.workingHours.weekend}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      {contact.social && (contact.social.twitter || contact.social.facebook || contact.social.instagram || contact.social.linkedin || contact.social.youtube) && (
        <section className="w-full py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center gap-3 mb-8 md:mb-12">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Twitter className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">تابعنا على</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
            </div>

            <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
              {contact.social.twitter && (
                <a
                  href={contact.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 md:p-6 bg-background rounded-lg border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-primary hover:text-primary-foreground"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6 md:w-8 md:h-8" />
                </a>
              )}
              {contact.social.facebook && (
                <a
                  href={contact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 md:p-6 bg-background rounded-lg border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-primary hover:text-primary-foreground"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6 md:w-8 md:h-8" />
                </a>
              )}
              {contact.social.instagram && (
                <a
                  href={contact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 md:p-6 bg-background rounded-lg border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-primary hover:text-primary-foreground"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 md:w-8 md:h-8" />
                </a>
              )}
              {contact.social.linkedin && (
                <a
                  href={contact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 md:p-6 bg-background rounded-lg border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-primary hover:text-primary-foreground"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6 md:w-8 md:h-8" />
                </a>
              )}
              {contact.social.youtube && (
                <a
                  href={contact.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 md:p-6 bg-background rounded-lg border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-primary hover:text-primary-foreground"
                  aria-label="YouTube"
                >
                  <Youtube className="w-6 h-6 md:w-8 md:h-8" />
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Google Maps Section */}
      <section className="w-full py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">موقعنا</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
          </div>

          {contact.googleMaps?.embedUrl ? (
            <Card className="overflow-hidden border shadow-lg">
              <CardContent className="p-0">
                <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden">
                  <iframe
                    src={contact.googleMaps.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>
                {contact.googleMaps.link && (
                  <div className="p-4 md:p-6 border-t bg-muted/30">
                    <a
                      href={contact.googleMaps.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-2 font-medium"
                    >
                      <MapPin className="w-5 h-5" />
                      افتح في Google Maps
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  لا توجد خريطة متاحة حالياً
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}

