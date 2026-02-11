import { getOneCategory } from "@/app/service/category/specific-category"

export default async function CategoryDetails({
  params,
}: {
  params: { id: string }
}) {
  const category = await getOneCategory(params.id)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        {category.data.name}
      </h1>

      <img
        src={category.data.image}
        alt={category.data.name}
        className="w-full max-w-md rounded-lg"
      />
    </div>
  )
}
