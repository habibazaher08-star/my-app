import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getAccessToken() {
  const cookieStore = await cookies()
  let authToken = cookieStore.get("next-auth.session-token")?.value
  if (!authToken) {
    authToken = cookieStore.get("__Secure-next-auth.session-token")?.value
  }
  if (!authToken) return null

  const token = await decode({
    token: authToken,
    secret: process.env.NEXTAUTH_SECRET!,
  })

  return token?.token || null
}