'use server'
import { CategoryInterface } from "@/app/types/category-interface"

export async function getCategories(): Promise<CategoryInterface> {
  const res = await fetch(`${process.env.API}/categories`, {
    cache: "no-store",
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch categories")
  }

  return data
}

