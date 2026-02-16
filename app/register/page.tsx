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
import { useRouter } from "next/navigation"

const formSchema = z
  .object({
    title: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rePassword: z.string().min(6),
    phone: z.string().min(10, "Invalid phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  })

type FormData = z.infer<typeof formSchema>

export default function Register() {
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  })

  async function onSubmit(data: FormData) {
    try {
      console.log("submit started")

    
      const apiUrl = "https://ecommerce.routemisr.com/api/v1/auth/signup"

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.title,
          email: data.email,
          password: data.password,
          rePassword: data.rePassword,
          phone: data.phone,
        }),
      })

     
      const contentType = res.headers.get("content-type")

      let result: any
      if (contentType && contentType.includes("application/json")) {
        result = await res.json()
      } else {
        const text = await res.text()
        console.log("Non JSON response:", text)
        throw new Error("Server did not return JSON")
      }

      console.log("register status:", res.status)
      console.log("register result:", result)

      if (!res.ok) {
        alert(result.message || "Register failed")
        return
      }

      console.log("trying login...")

      const loginRes = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      })

      console.log("login response:", loginRes)

      if (loginRes?.ok) {
        window.location.href = loginRes.url || "/"
      } else {
        alert("Registered but login failed")
        router.push("/login")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>

              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input {...field} id={field.name} />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

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

              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                    <Input type="password" {...field} id={field.name} />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                    <Input {...field} id={field.name} />
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
