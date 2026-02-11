'use server'
import { getAccessToken } from "../access-token"

export async function updateCartItem({productId , count}:{productId:string , count:number}){

    const token = await getAccessToken()
    if(!token){
        throw new Error('Unauthorized....')
    }
    const response= await fetch (`${process.env.API}/cart/${productId}` , {
        method:'DELETE' , 
        headers:{
            token: token , 
            'content-type' : 'application/json'
        } ,
        body:JSON.stringify({
            count:count
        })
    })
   const payload= await response.json()
   return payload
}
  