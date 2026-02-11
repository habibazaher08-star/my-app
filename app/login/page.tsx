"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"
import { useSearchParams } from "next/navigation"

const formSchema = z
  .object({
   
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    
  })
  

type FormData = z.infer<typeof formSchema>

export default function Login() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callback-url')
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     
      email: "",
      password: "",
     
    },
  })

 async function onSubmit(data: FormData) {

    console.log("success")
 
//sign in de zy method mn nextauth b call beha elfunction bt3ty authorize badeha el credentials
  const response = await  signIn('credentials' , {
      email : data.email , 
      password : data.password ,
      callbackUrl: callbackUrl ?? '/' ,
      redirect: false
    })

    console.log(response);
    if(response?.ok){
      toast.success('login successfully')
      window.location.href=response.url || '/'
      

    } else{
      toast.error('login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md ">
      <CardHeader>
        <CardTitle>Login Now</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

            

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input {...field} id={field.name} />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input type="password" {...field} id={field.name} />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            
          </FieldGroup>

          <div className="mt-4 flex gap-3">
            <Button type="submit">Submit</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}
