'use server'
import { getAccessToken } from "../access-token"

export async function getWishlist() {
  const token = await getAccessToken()

  if (!token) {
    throw new Error("Unauthorized")
  }

  const response = await fetch(`${process.env.API}/wishlist`, {
    headers: {
      token: token,
    },
    cache: "no-store",
  })

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload?.message || "Failed to get wishlist")
  }

  return payload
}
