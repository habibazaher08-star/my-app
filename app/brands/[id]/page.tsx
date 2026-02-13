import { getBrand } from "@/app/service/brands/get-brand"

export default async function BrandDetails({
  params,
}: {
  params: { id: string }
}) {
  

  const {id} = await params
    const {data} = await getBrand(id)
    console.log(data)
   

  return (
    <div className="container mx-auto p-5">
      <div className="max-w-md mx-auto border rounded-lg p-5 text-center mt-5">
         <img
          src={data.image}
          alt={data.name}
          className="w-full h-40 object-contain"
        />
       
       
      </div>
       <h1 className="text-center  mt-5 text-2xl font-bold ">{data.name}</h1> 
    </div>
  )
}
