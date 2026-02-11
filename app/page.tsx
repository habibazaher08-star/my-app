import Image from "next/image";
import { productItem } from "./types/productInterface";
import { ProductCard } from "./_components/productCard/productCard";

export default async function Home() {
  let response = await fetch('https://ecommerce.routemisr.com/api/v1/products')
  let {data : allProducts } : {data : productItem[]} = await response.json()
  console.log(allProducts)

  return (
    <>
    
   <div className="grid md:grid-cols-3 lg:grid-cols-5 mt-5 gap-5">
    {allProducts.map((prod)=> <ProductCard key={prod._id} prod={prod}/>  )}
   </div>

    </>
  );
}
