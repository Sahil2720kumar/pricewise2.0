import Image from "next/image";
import Searchbar from "@/components/Searchbar";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/actions";

export const revalidate = 0; // revalidate the data at most every 0s

export default async function Home() {
    const allProducts = await getAllProducts();
    //console.log(allProducts);
    return (
        <>
            <section className='px-6 md:px-20 py-24'>
                <div className='flex flex-col lg:flex-row gap-16'>
                    <div className='flex flex-col justify-center'>
                        <p className='flex gap-2 text-sm font-medium text-primary'>
                            Smart Shopping Starts Here:
                            <Image
                                src='/assets/icons/arrow-right.svg'
                                alt='arrow-right'
                                width={16}
                                height={16}
                            />
                        </p>

                        <h1 className='mt-4 text-6xl leading-[72px] font-bold tracking-[-1.2px] text-gray-900'>
                            Unleash the Power of
                            <span className='text-primary'> PriceWise</span>
                        </h1>

                        <p className='mt-6'>
                            Powerful, self-serve product and growth analytics to
                            help you convert, engage, and retain more.
                        </p>

                        <Searchbar />
                    </div>

                    <HeroCarousel />
                </div>
            </section>
            <section className='flex flex-col gap-10 px-6 md:px-20 py-24 '>
                <h2 className='text-primary text-[32px] font-semibold'>
                    Trending
                </h2>

                {
                    <div className='flex flex-wrap gap-x-8 gap-y-16 items-center justify-center md:justify-start'>
                        {allProducts?.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                }
            </section>
        </>
    );
}
