import { getBrand } from "@/app/service/brands/get-brand"
import { notFound } from "next/navigation"

export default async function BrandDetails({
  params,
}: {
  params: { id: string }
}) {
  let brand

  try {
    const data = await getBrand(params.id)
    brand = data.data
  } catch (error) {
    return notFound()
  }

  return (
    <div className="container mx-auto p-5">
      <div className="max-w-md mx-auto border rounded-lg p-5 text-center">
        <img
          src={brand.image}
          alt={brand.name}
          className="w-full h-40 object-contain"
        />
        <h1 className="text-2xl font-bold mt-3">{brand.name}</h1>
      </div>
    </div>
  )
}
