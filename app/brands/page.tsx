import { getAllBrands } from "../service/brands/all-brands"
import Link from "next/link"


export default async function Brands() {
  const brands = await getAllBrands()

  return (
    <div className="container mx-auto p-5">
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {brands.data.map((brand: any) => (
          <Link href={`/brands/${brand._id}`}>
  <div className="border rounded-lg p-3 text-center cursor-pointer hover:shadow">
    <img
      src={brand.image}
      alt={brand.name}
      className="w-full h-32 object-contain"
    />
    <h2 className="mt-2 font-semibold">{brand.name}</h2>
  </div>
</Link>

        ))}
      </div>
    </div>
  )
}
