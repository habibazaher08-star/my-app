'use server'
import { getAccessToken } from "../access-token"

export async function addToCart(productId:string){

    const token = await getAccessToken()
    if(!token){
        throw new Error('Unauthorized....')
    }
    const response= await fetch (`${process.env.API}/cart` , {
        method:'POST' , 
        headers:{
            token: token , 
            'content-type' : 'application/json'
        } ,
        body:JSON.stringify({
            productId
        })
    })
   const payload= await response.json()
   return payload
}
