import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published',
  stega:{
    // Set to false if statically generating pages, using ISR or tag-based revalidation
    studioUrl: process.env.VERCEL_URL
     ? `https://${process.env.VERCEL_URL}/studio`
     : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
  },
})
