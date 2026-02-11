import { getToken } from "next-auth/jwt" 
import { NextRequest, NextResponse } from "next/server" 

const protectedPages= ['/cart' , '/profile' , '/wishlist'] //7adet elpages eli ha ahmeha 
const authPages= ['/login' , '/register' ]


export async function middleware(req:NextRequest){ //middleware function
 const token = await getToken({req}) //method btsa3dny ageb el token 
 if(protectedPages.includes(req.nextUrl.pathname)){ //awel haga ashof el req feh haga mn elpages eli ana hamyaha wala la
    if(token){ //tany haga ashof m3ah token wala la 
        return NextResponse.next() // lw m3ah ydkhol
    }
    else{
        let redirecturl= new URL('/login' , process.env.NEXTAUTH_URL ) //lw msh m3ah b re direct him l login page
        redirecturl.searchParams.set('callbackUrl' , req.nextUrl.pathname)
        return NextResponse.redirect(redirecturl)
    }
 } 

// el auth 

 if(authPages.includes(req.nextUrl.pathname)){ //awel haga ashof el req 
    if(!token){ //tany haga ashof m3ah token wala la 
        return NextResponse.next() // lw msh m3ah yroh 3ala el login ah
    }
    else{ //lw m3ah ha yroh l home 
        const redirecturl= new URL('/' , process.env.NEXTAUTH_URL ) //lw msh m3ah b re direct him l login page
        return NextResponse.redirect(redirecturl)
    }
 }

 // lw wala da wala da w hwa dakhel page msh mehataga login 
 return NextResponse.next()
}