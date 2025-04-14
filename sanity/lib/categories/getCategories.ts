import { client } from '../client'

export async function getCategories() {
  const query = `*[_type == "category"] {
    _id,
    title,
    "slug": slug.current,
    description
  }`

  try {
    const categories = await client.fetch(query)
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
} 