import Link from "next/link"
import { getAllSubcategories } from "@/app/service/subcategories/all-subcategories"

export default async function SubcategoriesPage() {
  const subcategories = await getAllSubcategories()

  return (
  <div className="container mx-auto p-5">

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {subcategories.map((sub: any) => (
        <Link key={sub._id} href={`/subcategories/${sub._id}`}>
          
          <div className="mt-5 border border-gray-200 p-6 rounded-lg text-center 
                          text-lg md:text-xl font-semibold
                          shadow-sm hover:shadow-md
                          bg-white hover:bg-gray-50
                          transition duration-200 cursor-pointer">

            {sub.name}

          </div>

        </Link>
      ))}
    </div>

  </div>
)
}
