'use server'
import { getAccessToken } from "../access-token"

export async function updateCartItem({
  productId,
  count,
}: {
  productId: string
  count: number
}) {
  const token = await getAccessToken()
  if (!token) {
    throw new Error('Unauthorized')
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: 'PUT',
      headers: {
        token: token,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        count: count,
      }),
      cache: 'no-store',
    }
  )

  const payload = await response.json()
  return payload
}