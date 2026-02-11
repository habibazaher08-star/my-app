'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import Image from "next/image"
import wishlistImg from "../../assets/images/emptycart.jpg" 


import { addToWishlist } from "../service/wishlist/add-to-wishlist"
import { removeWishlistItem } from "../service/wishlist/remove-from-wishlist"
import { getWishlist } from "../service/wishlist/get-wishlist"

export default function Wishlist() {
  const queryClient = useQueryClient()

  // GET WISHLIST
  const { data: wishlistData, isLoading, isError } = useQuery({
    queryKey: ['get-wishlist'],
    queryFn: getWishlist
  })

  // REMOVE ITEM
  const { mutate: removeItem } = useMutation({
    mutationFn: removeWishlistItem,
    onSuccess: () => {
      toast.success('Removed from wishlist')
      queryClient.invalidateQueries({ queryKey: ['get-wishlist'] })
    },
    onError: () => toast.error('Error')
  })

  // CLEAR WISHLIST
  

  if (isLoading) return <h2>Loading...</h2>
  if (isError) return <h2>Error...</h2>

  return (
    <>
      {wishlistData?.count > 0 ? (

        <div className="flex mt-8 gap-8">

          {/* TABLE */}
          <div className="w-full">
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">

              <table className="w-full text-sm text-left text-body">
                <thead className="text-sm bg-neutral-secondary-medium border-b border-default-medium">
                  <tr>
                    <th className="px-16 py-3">Image</th>
                    <th className="px-6 py-3 font-medium">Product</th>
                    <th className="px-6 py-3 font-medium">Price</th>
                    <th className="px-6 py-3 font-medium">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {wishlistData.data.map((prod: any) => (
                    <tr key={prod._id} className="border-b hover:bg-neutral-secondary-medium">

                      <td className="p-4">
                        <img
                          src={prod.imageCover}
                          className="w-16 md:w-24"
                          alt={prod.title}
                        />
                      </td>

                      <td className="px-6 py-4 font-semibold">
                        {prod.title}
                      </td>

                      <td className="px-6 py-4 font-semibold">
                        {prod.price} EGP
                      </td>

                      <td className="px-6 py-4">
                        <span
                          onClick={() => removeItem(prod._id)}
                          className="font-medium text-red-500 cursor-pointer hover:underline"
                        >
                          Remove
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

              

            </div>
          </div>
        </div>

      ) : (

     
        <div className="flex flex-col items-center justify-center text-center py-16">
          <Image
            src={wishlistImg}
            alt="wishlist"
            width={200}
            height={200}
            className="mb-6"
          />
          <h2 className="text-2xl font-semibold text-gray-700">
            Your wishlist is empty
          </h2>
        </div>

      )}
    </>
  )
}
