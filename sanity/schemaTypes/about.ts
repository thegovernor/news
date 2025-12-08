import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'من نحن',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'الصورة الرئيسية',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'المحتوى',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'النص البديل',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mission',
      title: 'رؤيتنا ورسالتنا',
      type: 'object',
      fields: [
        {
          name: 'vision',
          title: 'الرؤية',
          type: 'text',
        },
        {
          name: 'mission',
          title: 'الرسالة',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'values',
      title: 'قيمنا',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'العنوان',
              type: 'string',
            },
            {
              name: 'description',
              title: 'الوصف',
              type: 'text',
            },
            {
              name: 'icon',
              title: 'الأيقونة',
              type: 'string',
              options: {
                list: [
                  { title: 'الهدف', value: 'Target' },
                  { title: 'المستخدمون', value: 'Users' },
                  { title: 'القلب', value: 'Heart' },
                  { title: 'الدرع', value: 'Shield' },
                  { title: 'النجمة', value: 'Star' },
                  { title: 'المصباح', value: 'Lightbulb' },
                  { title: 'الطائرة الورقية', value: 'Rocket' },
                  { title: 'الورقة', value: 'Leaf' },
                  { title: 'المصافحة', value: 'Handshake' },
                  { title: 'الكتاب', value: 'Book' },
                  { title: 'العدالة', value: 'Scale' },
                  { title: 'السلام', value: 'Globe' },
                  { title: 'النجاح', value: 'Trophy' },
                  { title: 'الشفافية', value: 'Eye' },
                  { title: 'التميز', value: 'Award' },
                  { title: 'الإبداع', value: 'Sparkles' },
                  { title: 'التعاون', value: 'UserCircle' },
                  { title: 'النمو', value: 'TrendingUp' },
                  { title: 'الجودة', value: 'Gem' },
                  { title: 'الابتكار', value: 'Zap' },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'team',
      title: 'الفريق',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'الاسم',
              type: 'string',
            },
            {
              name: 'role',
              title: 'الدور',
              type: 'string',
            },
            {
              name: 'bio',
              title: 'نبذة',
              type: 'text',
            },
            {
              name: 'image',
              title: 'الصورة',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})

