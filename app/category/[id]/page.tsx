import { getOneCategory } from "@/app/service/category/specific-category"
import { getSubcategoriesByCategory } from "@/app/service/subcategories/get-by-category"
import Link from "next/link"

export default async function CategoryDetails({
  params,
}: {
  params: { id: string }
}) {
 
 const { id } = await params

  const { data: category } = await getOneCategory(id)
  const subcategories = await getSubcategoriesByCategory(id) 

  return (
    <div className="container mx-auto p-6">

      {/* Category Info */}
<div className="flex flex-col items-center justify-center text-center min-h-screen">
  <h1 className="text-3xl font-bold mb-4">{category.name}</h1>

  <img
    src={category.image}
    alt={category.name}
    className="w-full max-w-md rounded-lg mb-8"
  />
</div>

      {/* Subcategories */}
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {subcategories.map((sub: any) => (
          <Link key={sub._id} href={`/subcategories/${sub._id}`}>
            <div className="border border-gray-200 p-6 rounded-lg text-center
                            text-lg font-semibold shadow-sm hover:shadow-md
                            bg-white hover:bg-gray-50 transition">

              {sub.name}

            </div>
          </Link>
        ))}
      </div>

    </div>
  )

}
