export async function getBrand(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    { cache: "no-store" }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch brand")
  }

  return data
}
