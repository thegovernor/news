import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Disable CDN for better revalidation support
  // CDN caching can delay content updates
  useCdn: false,
  // Stega is disabled - enable it with studioUrl if you need draft content preview
  // stega: {
  //   enabled: process.env.NODE_ENV === 'development',
  //   studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3000/studio',
  // },
})
