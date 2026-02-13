'use server'

export async function getSubcategoriesByCategory(categoryId: string) {
  const res = await fetch(
    `${process.env.API}/categories/${categoryId}/subcategories`,
    { cache: 'no-store' }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.message || 'Failed')
  }

  return data.data
}
