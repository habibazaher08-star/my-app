'use server'

export async function getOneCategory(id: string) {
  const res = await fetch(`${process.env.API}/categories/${id}`, {

    cache: "no-store",
    
  })
  console.log(process.env.API)

  const data = await res.json()

  /*if (!res.ok) {
    throw new Error(data?.message || "Failed") 

  }*/
console.log(data)
  return data
}
