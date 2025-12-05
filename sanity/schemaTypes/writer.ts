import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'writer',
  title: 'الكاتب',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'الاسم',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'الرابط',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input: string) => {
          return input
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z0-9-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '')
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'السيرة الذاتية',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'الصورة الشخصية',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'email',
      title: 'البريد الإلكتروني',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'روابط التواصل الاجتماعي',
      type: 'object',
      fields: [
        defineField({
          name: 'twitter',
          title: 'تويتر/X',
          type: 'url',
        }),
        defineField({
          name: 'facebook',
          title: 'فيسبوك',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'إنستغرام',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'لينكد إن',
          type: 'url',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})

