import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'rssFeed',
  title: 'مصدر RSS للأخبار العاجلة',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'اسم المصدر',
      type: 'string',
      description: 'اسم أو عنوان لمصدر RSS (مثال: وكالة الأنباء)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'رابط RSS',
      type: 'url',
      description: 'رابط مصدر RSS للأخبار العاجلة',
      validation: (Rule) => 
        Rule.required()
          .uri({
            scheme: ['http', 'https'],
            allowRelative: false,
          }),
    }),
    defineField({
      name: 'isActive',
      title: 'نشط',
      type: 'boolean',
      description: 'حدد ما إذا كان يجب استخدام هذا المصدر في شريط الأخبار العاجلة',
      initialValue: true,
    }),
    defineField({
      name: 'itemLimit',
      title: 'عدد العناصر',
      type: 'number',
      description: 'الحد الأقصى لعدد الأخبار العاجلة من هذا المصدر (افتراضي: 10)',
      initialValue: 10,
      validation: (Rule) => Rule.integer().min(1).max(50),
    }),
    defineField({
      name: 'linkPattern',
      title: 'نمط الرابط',
      type: 'string',
      description: 'نمط الرابط للعناصر (اختياري). استخدم {link} كعنصر نائب للرابط الأصلي من RSS',
      placeholder: '/article/{slug}',
    }),
    defineField({
      name: 'updateInterval',
      title: 'فترة التحديث (بالدقائق)',
      type: 'number',
      description: 'كم مرة يجب تحديث البيانات من هذا المصدر (بالدقائق)',
      initialValue: 15,
      validation: (Rule) => Rule.integer().min(1).max(1440),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
      isActive: 'isActive',
      itemLimit: 'itemLimit',
    },
    prepare(selection) {
      const {title, url, isActive, itemLimit} = selection
      return {
        title: title || 'بدون عنوان',
        subtitle: isActive 
          ? `نشط - ${itemLimit || 10} عنصر - ${url || 'بدون رابط'}` 
          : `غير نشط - ${url || 'بدون رابط'}`,
        media: () => null,
      }
    },
  },
  orderings: [
    {
      title: 'النشط أولاً',
      name: 'activeFirst',
      by: [{field: 'isActive', direction: 'desc'}],
    },
    {
      title: 'الاسم، أبجدي',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})

