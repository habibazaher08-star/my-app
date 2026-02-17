'use server'
import { getAccessToken } from "../access-token"

export async function clearCart(){

    const token = await getAccessToken()
    if(!token){
        throw new Error('Unauthorized....')
    }
    const response= await fetch (`https://ecommerce.routemisr.com/api/v1/cart` , {
        method:'DELETE' , 
        headers:{
            token: token , 
            'content-type' : 'application/json'
        } 
    })
   const payload= await response.json()
   return payload
}
 