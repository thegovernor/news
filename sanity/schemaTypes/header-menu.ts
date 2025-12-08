import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'headerMenu',
  title: 'القائمة الرئيسية',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'اسم القائمة',
      type: 'string',
      initialValue: 'القائمة الرئيسية',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'الشعار',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'صورة الشعار',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'text',
          title: 'نص الشعار',
          type: 'string',
          description: 'النص الذي يظهر إذا لم تكن هناك صورة',
        },
        {
          name: 'href',
          title: 'رابط الشعار',
          type: 'string',
          description: 'الرابط عند النقر على الشعار (افتراضي: /)',
          initialValue: '/',
        },
      ],
    }),
    defineField({
      name: 'items',
      title: 'عناصر القائمة',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'العنوان',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'الرابط',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'مثال: /articles أو /#hero',
            },
            {
              name: 'order',
              title: 'الترتيب',
              type: 'number',
              validation: (Rule) => Rule.min(0),
              initialValue: 0,
            },
            {
              name: 'isExternal',
              title: 'رابط خارجي',
              type: 'boolean',
              initialValue: false,
              description: 'حدد إذا كان الرابط يشير إلى موقع خارجي',
            },
          ],
          preview: {
            select: {
              title: 'title',
              href: 'href',
              order: 'order',
            },
            prepare({title, href, order}) {
              return {
                title: title || 'بدون عنوان',
                subtitle: `${href || 'بدون رابط'} - الترتيب: ${order || 0}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

