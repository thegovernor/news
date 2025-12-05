import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'المقال',
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
      name: 'writer',
      title: 'الكاتب',
      type: 'reference',
      to: [{type: 'writer'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'الفئة',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'الصورة الرئيسية',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'الملخص',
      type: 'text',
      description: 'ملخص قصير للمقال',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'publishedAt',
      title: 'تاريخ النشر',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
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
      name: 'tags',
      title: 'الوسوم',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'مقال مميز',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'writer.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `بواسطة ${author}`}
    },
  },
  orderings: [
    {
      title: 'تاريخ النشر، الأحدث',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'تاريخ النشر، الأقدم',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
})

