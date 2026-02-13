'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CartResponse } from "../types/cart-response"
import { deleteCartItem } from "../service/cart/delete-cart-item"
import toast from "react-hot-toast"
import { updateCartItem } from "../service/cart/update-cart"
import { clearCart } from "../service/cart/clear-cart"
import cartImg from "../../assets/images/emptycart.jpg" 
import Image from "next/image"
import Link from "next/link"

export default  function Cart() {
const queryClient = useQueryClient()
 const {data:CartData , isError , isLoading} =  useQuery<CartResponse>({
    queryKey:['get-cart'] , 
    queryFn: async()=>{
      const resp= await fetch('/api/cart')
      const payload = await resp.json()
      return payload
    }
  })
//delete function

const {mutate:delCartItem  , isPending  } = useMutation({ //mutate de shaylaly el function
  mutationFn: deleteCartItem , 
  onSuccess:()=>{
    toast.success('Product Deleted')
    queryClient.invalidateQueries({
  queryKey: ['get-cart']
})
  } , 
  onError:()=>{
    toast.error('error')
  }
})

//clear carttt

const {mutate:RemoveCart} = useMutation({ //mutate de shaylaly el function
  mutationFn: clearCart , 
  onSuccess:()=>{
    toast.success('Cart Deleted')
    queryClient.invalidateQueries({
  queryKey: ['get-cart']
})
  } , 
  onError:()=>{
    toast.error('error')
  }
})


//updateeee

const {mutate:updateCart , isPending:udateLoading  } = useMutation({ 
  mutationFn: updateCartItem , 
  onSuccess:()=>{
    toast.success('Product Updated')
    queryClient.invalidateQueries({
  queryKey: ['get-cart']
})
  } , 
  onError:()=>{
    toast.success('error')
  }
})

function handleUpdate(productId:string , count:number){
  updateCart({productId , count})
}


  if(isLoading){
    return <h2>Loading...</h2>
  }

  if(isError){
    return <h2>Error...</h2>
  }


  return <>
  {(CartData?.numOfCartItems ?? 0) > 0 ? (
    <div className="flex mt-8 gap-8">

     
      <div className="w-3/4">
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3 font-medium">Product</th>
                <th scope="col" className="px-6 py-3 font-medium">Qty</th>
                <th scope="col" className="px-6 py-3 font-medium">Price</th>
                <th scope="col" className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {CartData?.data?.products?.map((prod) => (
                <tr key={prod._id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                  <td className="p-4">
                    <img src={prod.product.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt={prod.product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-heading">{prod.product.title}</td>
                  <td className="px-6 py-4">
                    <form className="max-w-xs mx-auto">
                      <label htmlFor="counter-input-1" className="sr-only">Choose quantity:</label>
                      <div className="relative flex items-center">
                        <button onClick={() => handleUpdate(prod.product._id, prod.count - 1)} type="button" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                          <svg className="w-3 h-3 text-heading" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>
                        </button>
                        <span className="mx-3 shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center">{prod.count}</span>
                        <button onClick={() => handleUpdate(prod.product._id, prod.count + 1)} type="button" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                          <svg className="w-3 h-3 text-heading" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7 7V5" /></svg>
                        </button>
                      </div>
                    </form>
                  </td>
                  <td className="px-6 py-4 font-semibold text-heading">{prod.price} EGP</td>
                  <td className="px-6 py-4">
                    <span onClick={() => delCartItem(prod.product._id)} className="font-medium text-fg-danger hover:underline">Remove</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={() => RemoveCart()} className="mt-5 mb-5 w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition">Clear Cart</button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="ml-6 my-4">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-4">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between gap-3">
              <span className="text-gray-600">Number of cart items</span>
              <span className="font-medium">{CartData?.numOfCartItems ?? 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Price</span>
              <span className="font-medium">{CartData?.data?.totalCartPrice ?? 0} EGP</span>
            </div>
          </div>
          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition">
            <Link href={`/checkout/${CartData?.cartId ?? ''}`}>Checkout</Link>
          </button>
          <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
            <i className="fas fa-shield-alt mr-2" /> Secure Checkout
          </div>
          {/* Payment Icons */}
          <div className="flex justify-center gap-3 mt-4">
            {/* Visa */}
            <svg viewBox="0 0 48 32" className="w-10 h-6">
              <rect width="48" height="32" rx="4" fill="#1A1F71"/>
              <text x="50%" y="65%" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">VISA</text>
            </svg>
            {/* MasterCard */}
            <svg viewBox="0 0 48 32" className="w-10 h-6">
              <rect width="48" height="32" rx="4" fill="#fff"/>
              <circle cx="22" cy="16" r="10" fill="#EB001B"/>
              <circle cx="26" cy="16" r="10" fill="#F79E1B"/>
            </svg>
            {/* PayPal */}
            <svg viewBox="0 0 48 32" className="w-10 h-6">
              <rect width="48" height="32" rx="4" fill="#003087"/>
              <text x="50%" y="65%" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">PayPal</text>
            </svg>
          </div>
        </div>
      </div>

    </div>
  ) : (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <Image src={cartImg} alt="cart" width={200} height={200} className="mb-6"/>
      <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
    </div>
  )}
</>
}