import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tweet',
  title: 'تغريدة',
  type: 'document',
  fields: [
    defineField({
      name: 'url',
      title: 'رابط التغريدة',
      type: 'url',
      description: 'انسخ رابط التغريدة من X (Twitter). مثال: https://twitter.com/username/status/123456789',
      validation: (Rule) => 
        Rule.required()
          .uri({
            scheme: ['https'],
            allowRelative: false,
          })
          .custom((url) => {
            if (!url) return true
            // Check if URL contains twitter.com or x.com
            if (!url.includes('twitter.com') && !url.includes('x.com')) {
              return 'يجب أن يكون الرابط من X (Twitter)'
            }
            return true
          }),
    }),
    defineField({
      name: 'order',
      title: 'ترتيب العرض',
      type: 'number',
      description: 'الترتيب الذي تريد عرض التغريدة به (الأقل يظهر أولاً)',
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'نشط',
      type: 'boolean',
      description: 'حدد ما إذا كانت التغريدة يجب أن تظهر في الموقع',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      url: 'url',
      isActive: 'isActive',
      order: 'order',
    },
    prepare(selection) {
      const {url, isActive, order} = selection
      // Extract username and tweet ID from URL
      const match = url?.match(/(?:twitter\.com|x\.com)\/(\w+)\/status\/(\d+)/)
      const username = match ? match[1] : 'غير معروف'
      const tweetId = match ? match[2] : ''
      
      return {
        title: `@${username}`,
        subtitle: isActive 
          ? `نشط - الترتيب: ${order || 0} - ${tweetId ? `ID: ${tweetId}` : url}` 
          : `غير نشط - ${tweetId ? `ID: ${tweetId}` : url}`,
        media: () => null,
      }
    },
  },
  orderings: [
    {
      title: 'الترتيب، الأقل أولاً',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
