
import { getSpecificSubcategory } from "@/app/service/subcategories/specific-subcategories"

export default async function SubcategoryDetails({
  params,
}: {
  params: { id: string }
}) {

  const { id } = await params   
  const data = await getSpecificSubcategory(id)

  

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center font-bold mb-4">
        {data.name}
       
      </h1>
      

      
    </div>
  )
}
