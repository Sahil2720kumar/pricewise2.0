//import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const ProductDetails = async ({ params: { id } }) => {
    const product = await getProductById(id);
    if (!product) redirect("/");
    const similarProducts = await getSimilarProducts(id);
console.log(product)
console.log(product.images)
    return (
        <div className='flex flex-col gap-16 flex-wrap px-6 md:px-20 py-24'>
            <div className='flex gap-28 xl:flex-row flex-col'>
                <div className='flex-grow xl:max-w-[50%] max-w-full py-16 border border-[#CDDBFF] rounded-[17px]'>
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={580}
                        height={400}
                        className='mx-auto object-contain'
                    />
                </div>

                <div className='flex-1 flex flex-col'>
                    <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
                        <div className='flex flex-col gap-3'>
                            <p className='text-[20px] text-[#E43030]/80 font-semibold'>
                                {product.title}
                            </p>

                            <Link
                                href={product.url}
                                target='_blank'
                                className='text-base text-black opacity-50'
                            >
                                Visit Product
                            </Link>
                        </div>

                        <div className='flex items-center gap-3'>
                            <div className='flex items-center gap-2 px-3 py-2 bg-[#FFF0F0] rounded-10'>
                                <Image
                                    src='/assets/icons/red-heart.svg'
                                    alt='heart'
                                    width={20}
                                    height={20}
                                />

                                <p className='text-base font-semibold text-[#D46F77]'>
                                    {product.reviewsCount}
                                </p>
                            </div>

                            <div className='p-2 bg-white-200 rounded-10'>
                                <Image
                                    src='/assets/icons/bookmark.svg'
                                    alt='bookmark'
                                    width={20}
                                    height={20}
                                />
                            </div>

                            <div className='p-2 bg-white-200 rounded-10'>
                                <Image
                                    src='/assets/icons/share.svg'
                                    alt='share'
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center flex-wrap gap-10 py-6 border-y border-y-[#E4E4E4]'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[34px] text-[#282828] font-bold'>
                                {product.currency} {product.currentPrice}
                            </p>
                            <p className='text-[21px] text-black opacity-50 line-through'>
                                {product.currency} {product.originalPrice}
                            </p>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <div className='flex gap-3'>
                                <div className='flex items-center gap-2 px-3 py-2 bg-[#FBF3EA] rounded-[27px]'>
                                    <Image
                                        src='/assets/icons/star.svg'
                                        alt='star'
                                        width={16}
                                        height={16}
                                    />
                                    <p className='text-sm text-[#D48D3B] font-semibold'>
                                        {product.stars || "0"}
                                    </p>
                                </div>

                                <div className='flex items-center gap-2 px-3 py-2 bg-white-200 rounded-[27px]'>
                                    <Image
                                        src='/assets/icons/comment.svg'
                                        alt='comment'
                                        width={16}
                                        height={16}
                                    />
                                    <p className='text-sm text-[#282828] font-semibold'>
                                        {product.reviewsCount} Reviews
                                    </p>
                                </div>
                            </div>

                            <p className='text-sm text-black opacity-50'>
                                <span className='text-[#3E9242] font-semibold'>
                                    {Math.trunc((product.stars / 5.0) * 100)}%{" "}
                                </span>{" "}
                                of buyers have recommeded this.
                            </p>
                        </div>
                    </div>
                    <div className='my-7 flex flex-col gap-5'>
                        <div className='flex gap-5 flex-wrap'>
                            <PriceInfoCard
                                title='Current Price'
                                iconSrc='/assets/icons/price-tag.svg'
                                value={`${product.currency} ${product.currentPrice}`}
                            />
                            <PriceInfoCard
                                title='Average Price'
                                iconSrc='/assets/icons/chart.svg'
                                value={`${product.currency} ${product.averagePrice}`}
                            />
                            <PriceInfoCard
                                title='Highest Price'
                                iconSrc='/assets/icons/arrow-up.svg'
                                value={`${product.currency} ${product.highestPrice}`}
                            />
                            <PriceInfoCard
                                title='Lowest Price'
                                iconSrc='/assets/icons/arrow-down.svg'
                                value={`${product.currency} ${product.lowestPrice}`}
                            />
                        </div>
                    </div>
                    "model"
                </div>
            </div>

            <div className='flex flex-col gap-16'>
                <div className='flex flex-col gap-5'>
                    <h3 className='text-2xl text-[#282828] font-semibold'>
                        Product Description
                    </h3>

                    <div className='flex flex-col gap-4 w-[330px] md:w-full overflow-hidden'>
 {product?.description?.split('\n')}
                    </div>
                </div>

                <button className='py-4 px-4 bg-[#282828] hover:bg-opacity-70 rounded-[30px] text-white text-lg font-semibold w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]'>
                    <Image
                        src='/assets/icons/bag.svg'
                        alt='check'
                        width={22}
                        height={22}
                    />

                    <Link href={product.url} target='_blank' className='text-base text-white'>
                        Buy Now
                    </Link>
                </button>
            </div>

            {similarProducts && similarProducts?.length > 0 && (
                <div className='py-14 flex flex-col gap-2 w-full'>
                    <p className='text-[#282828] text-[32px] font-semibold'>Similar Products</p>

                    <div className='flex flex-wrap gap-10 mt-7 w-full'>
                        {similarProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
