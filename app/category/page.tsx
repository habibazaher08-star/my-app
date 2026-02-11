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
    <div className="p-4">
      
      <div className="flex flex-wrap gap-4 justify-center">
        {data?.data.map((cat) => (
          <div
            key={cat._id}
            className="flex-3 min-w-[18%] max-w-[18%] md:min-w-[18%] md:max-w-[18%]"
          >
            <div className="relative w-full h-48 overflow-hidden rounded-lg">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-center"
              />

             <Link href={`/category/${cat._id}`}>
  <h1 className="cursor-pointer absolute inset-0 bg-black bg-opacity-40
    flex items-center justify-center text-sm md:text-lg text-center text-white font-medium
    group-hover:bg-opacity-60 transition">
    {cat.name}
  </h1>
</Link>


            </div>
          </div>
        ))}
      </div>
    </div>
  )
}