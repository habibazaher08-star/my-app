'use client'
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/app/service/category/get-category"
import Link from "next/link"


export default function Categories() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })

  if (isLoading) return <h2>Loading...</h2>
  if (isError) return <h2>Error...</h2>

  return (
  <div className="px-4 py-10">
    <h1 className="text-2xl md:text-3xl font-bold text-center mb-20">
      Shop By Category
    </h1>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-15 gap-6">
      {data?.data.map((cat) => (
        <Link
          href={`/category/${cat._id}`}
          key={cat._id}
          className="group"
        >
          <div className="relative w-full aspect-[1/1] overflow-hidden rounded-2xl shadow-md bg-gray-100">
            
            {/* Image */}
            
            <img
          src={cat.image}
          alt={cat.name}
          className="w-full h-full object-cover 
                     transition-transform duration-500 
                     group-hover:scale-110"
        />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent 
                            flex items-end p-4 transition-opacity duration-300 group-hover:from-black/80">
              
            </div>
            <div>
              <h2 className=" text-center p-4 font-bold text-black text-2xl tracking-wide">
                {cat.name}
              </h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
)
}