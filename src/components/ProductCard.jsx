import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = async ({ product }) => {
       return (
        <Link
            href={
                product.productLink
                    ? `https://amazon.in${product.productLink}`
                    : `/products/${product?._id}`
            }
            target="_blank"
            className='w-[240px] shadow shadow-md p-3 max-w-[252px] w-full flex-1 flex flex-col gap-4 rounded-md'
        >
            <div className='flex-1 relative flex flex-col gap-5 p-4 rounded-md'>
                <Image
                    src={product?.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className='max-h-[250px] object-contain w-full h-full bg-transparent'
                />
            </div>

            <div className='flex flex-col gap-3'>
                <h3 className='text-primary text-xl leading-6 font-semibold truncate'>
                    {product.title}
                </h3>

                <div className='flex justify-between'>
                    <div className='text-black opacity-50 text-lg capitalize'>
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
                    </div>

                    <p className='text-black flex gap-2 items-center text-lg font-semibold'>
                        <span className=' font-bold text-slate-900'>
                            <span>{product?.currency}</span>
                            <span>{product?.currentPrice}</span>
                        </span>
                        <span className='mt-2 text-sm text-slate-900 line-through'>
                            <span>{product?.currency}</span>
                            <span>{product?.originalPrice}</span>
                        </span>
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
