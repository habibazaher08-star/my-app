'use server'
import { getAccessToken } from "../access-token"

export async function addToCart(productId: string) {
  const token = await getAccessToken()
  if (!token) {
    throw new Error('Unauthorized')
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: 'POST',
    headers: {
      token: token,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      productId,
    }),
    cache: 'no-store',
  })

  const payload = await response.json()
  return payload
}
