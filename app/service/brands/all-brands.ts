export async function getAllBrands() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
    next: { revalidate: 60 }
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch brands")
  }

  return data
}
