
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){ //m3aya el req

 const token =  await getToken({req}) //elmethod eli btgeble el token
 if(!token){
    return NextResponse.json({ error: "Unauthorized" },
      { status: 401 } ) //da eli ha y7sal lw msh m3ah token
 }
 const response = await fetch(`${process.env.API}/cart` , { //fe halet en m3ah token // bageb el api
    headers:{ 
        token: token.token , 
        'content-type':'application/json'
    }
 })
 const payload = await response.json()
 return NextResponse.json(payload)
}
