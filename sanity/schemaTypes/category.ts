import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'الفئة',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'الرابط',
      type: 'slug',
      options: {
        source: 'title',
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
      name: 'description',
      title: 'الوصف',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'صورة الفئة',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})

