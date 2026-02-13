export async function getAllSubcategories() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/subcategories")

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch subcategories")
  }

  return data.data
}
