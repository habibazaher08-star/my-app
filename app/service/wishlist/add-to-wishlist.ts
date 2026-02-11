'use server'
import { getAccessToken } from "../access-token"

export async function addToWishlist(productId: string) {
  const token = await getAccessToken()

  if (!token) {
    throw new Error("Unauthorized")
  }

  const response = await fetch(`${process.env.API}/wishlist`, {
    method: "POST",
    headers: {
      token: token,
      "content-type": "application/json",
    },
    body: JSON.stringify({ productId }),
  })

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload?.message || "Failed to add")
  }

  return payload
}
