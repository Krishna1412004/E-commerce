import { client } from '../client'

export async function getProducts() {
  const query = `*[_type == "product"] {
    _id,
    name,
    description,
    price,
    "slug": slug.current,
    image,
    category->{
      _id,
      name
    }
  }`

  try {
    const products = await client.fetch(query)
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
} 