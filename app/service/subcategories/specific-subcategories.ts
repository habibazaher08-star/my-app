'use server'

export async function getSpecificSubcategory(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`,
    { cache: "no-store" }
  )

  const payload = await res.json()

  if (!res.ok) {
    throw new Error(payload?.message || "Failed")
  }

  return payload.data
}
