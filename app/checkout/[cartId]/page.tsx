import React from 'react'
import CheckoutForm from '../../_components/CheckoutForm/CheckoutForm'

export default async function Checkout({params}:{params:{cartId:string}}) {

  const {cartId} = await params
  return <>
  <CheckoutForm cartId= {cartId}></CheckoutForm>
  </>
}
