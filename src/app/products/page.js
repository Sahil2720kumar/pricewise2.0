import Image from "next/image"
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/actions";
import { amazonSearchProductsList,filpcartSearchProductsList } from "@/lib/actions/searchProductsList";
import {amazonProductsListScraper} from "@/lib/scraper/productsListScraper";

//export const revalidate = 0; // revalidate the data at most every 0s

export default async function Products({ params, searchParams }) {
    const { product_name } = searchParams;
    const allProducts = await getAllProducts();
   // const amazonProductList=await amazonSearchProductsList(product_name)
   const filpcartProductList=await filpcartSearchProductsList(product_name)
    
    return (
        <div className='px-6 md:px-20 py-4'>
            <h1 className='text-2xl font-bold text-gray-800 mt-3'>
                Search Product - {product_name}
            </h1>
              <section className='flex flex-col gap-10 my-5'>
                <h2 className='text-primary text-[32px] font-semibold text-left'>
                    Amazon Product
                </h2>

                {
                    <div className='flex flex-wrap gap-x-8 gap-y-16 items-center justify-center md:justify-start'>
                        {allProducts?.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                }
            </section>
              <section className='flex flex-col gap-10 my-10'>
                <h2 className='text-primary text-[32px] font-semibold text-left'>
                    Filpcart Product
                </h2>

                {
                    <div className='flex flex-wrap gap-x-8 gap-y-16 items-center justify-center md:justify-start'>
                        {allProducts?.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                }
            </section>
        </div>
    );
}
