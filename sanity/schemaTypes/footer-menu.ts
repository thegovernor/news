import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footerMenu',
  title: 'قائمة التذييل',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'اسم القائمة',
      type: 'string',
      initialValue: 'قائمة التذييل',
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
      name: 'sections',
      title: 'أقسام التذييل',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'عنوان القسم',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'items',
              title: 'عناصر القسم',
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
                    },
                    {
                      name: 'isExternal',
                      title: 'رابط خارجي',
                      type: 'boolean',
                      initialValue: false,
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'نص حقوق النشر',
      type: 'string',
      description: 'النص الذي يظهر في أسفل التذييل',
      initialValue: 'جميع الحقوق محفوظة',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

