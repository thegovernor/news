import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'اتصل بنا',
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
      name: 'description',
      title: 'الوصف',
      type: 'text',
      description: 'وصف مختصر لصفحة الاتصال',
    }),
    defineField({
      name: 'email',
      title: 'البريد الإلكتروني',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'الهاتف',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'العنوان',
      type: 'text',
    }),
    defineField({
      name: 'workingHours',
      title: 'ساعات العمل',
      type: 'object',
      fields: [
        {
          name: 'weekdays',
          title: 'أيام الأسبوع',
          type: 'string',
          description: 'مثال: من السبت إلى الخميس: 9 صباحاً - 5 مساءً',
        },
        {
          name: 'weekend',
          title: 'نهاية الأسبوع',
          type: 'string',
          description: 'مثال: الجمعة: مغلق',
        },
      ],
    }),
    defineField({
      name: 'social',
      title: 'وسائل التواصل الاجتماعي',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'تويتر',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'فيسبوك',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'إنستغرام',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'لينكد إن',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'يوتيوب',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'googleMaps',
      title: 'خريطة جوجل',
      type: 'object',
      fields: [
        {
          name: 'embedUrl',
          title: 'رابط الخريطة المضمنة',
          type: 'url',
          description: 'انسخ رابط iframe من Google Maps. مثال: https://www.google.com/maps/embed?pb=...',
        },
        {
          name: 'link',
          title: 'رابط الخريطة المباشر',
          type: 'url',
          description: 'رابط مباشر لفتح الخريطة في Google Maps',
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

