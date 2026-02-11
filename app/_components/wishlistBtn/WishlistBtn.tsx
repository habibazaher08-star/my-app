'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { addToWishlist } from "@/app/service/wishlist/add-to-wishlist"

export default function WishlistBtn({ productId }: { productId: string }) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      toast.success("Added to wishlist ❤️")
      queryClient.invalidateQueries({ queryKey: ['get-wishlist'] })
    },
    onError: () => {
      toast.error("Something went wrong")
    }
  })

  return (
    <button
      onClick={() => mutate(productId)}
      disabled={isPending}
      className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-md rounded-full p-2 transition"
    >
      ❤️
    </button>
  )
}
