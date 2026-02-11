"use client"

import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { payCashOrder } from "@/app/service/cart/pay-cash"
import { shipping } from "@/app/types/cart-response"
import toast from "react-hot-toast"
import { payOnlineOrder } from "@/app/service/cart/pay-online"
import { useState } from "react"

type FormData = shipping

export default function CheckoutForm({cartId}:{cartId:string}) {

 const [isOnline , setisOnline]   =  useState(true)

  async function payCash(cartId: string, shippingAddress: shipping) {
    const response = await payCashOrder(cartId, shippingAddress)
    console.log(response)
    if(response.status=='success'){
        toast.success('order placed successfully')
        window.location.href='/'
    }else{
        toast.error('Unexpected Error ,please try again!')
    }
  }

   async function payOnline(cartId: string, shippingAddress: shipping) {
    const response = await payOnlineOrder(cartId, shippingAddress)
    console.log(response)
    if(response.status=='success'){
        
        window.location.href=response.session.url 
    }else{
        toast.error('Unexpected Error ,please try again!')
    }
  }

  const form = useForm<FormData>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  })

  async function onSubmit(data: FormData) {
    console.log("success", data)
    const shippingAddress={
        ...data 
    }
    if(isOnline){
        payOnline(cartId , shippingAddress)
    } else{
        payCash(cartId , shippingAddress)
    }
    
    

  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>

              <Controller
                name="details"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Details</FieldLabel>
                    <Input {...field} />
                  </Field>
                )}
              />

              <Controller
                name="city"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>City</FieldLabel>
                    <Input type="text" {...field} />
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Phone</FieldLabel>
                    <Input type="tel" {...field} />
                  </Field>
                )}
              />

            </FieldGroup>

            <div className="mt-4 flex gap-3">
              <Button onClick={()=>{setisOnline(false)}} type="submit">Pay Cach</Button>
               <Button onClick={()=>{setisOnline(true)}} type="submit">Pay Online</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
