'use server'
import { shipping } from "@/app/types/cart-response"
import { getAccessToken } from "../access-token"

export async function payCashOrder(cartId:string , shippingAddress:shipping){

    const token = await getAccessToken()
    if(!token){
        throw new Error('Unauthorized....')
    }
    const response= await fetch ( `https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , {
        method:'POST' , 
        headers:{
            token: token , 
            'content-type' : 'application/json'
        } ,
        body:JSON.stringify({
            shippingAddress
        })
    })
   const payload= await response.json()
   return payload
}
