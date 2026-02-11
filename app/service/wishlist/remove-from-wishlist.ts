'use server'
import { getAccessToken } from "../access-token"

export async function removeWishlistItem(productId: string) {
  const token = await getAccessToken()

  if (!token) {
    throw new Error("Unauthorized")
  }

  const response = await fetch(`${process.env.API}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      token: token,
      "content-type": "application/json",
    },
  })

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload?.message || "Failed to remove")
  }

  return payload
}

