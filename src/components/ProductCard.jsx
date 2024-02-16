import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
    return (
        <Link
            href={`/products/${product._id}`}
            className='w-[240px] shadow shadow-md p-3 max-w-[252px] w-full flex-1 flex flex-col gap-4 rounded-md'
        >
            <div className='flex-1 relative flex flex-col gap-5 p-4 rounded-md'>
                <Image
                    src={product.images[0]}
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
                    <p className='text-black opacity-50 text-lg capitalize'>
                        {product.category}
                    </p>

                    <p className='text-black text-lg font-semibold'>
                        <span>{product?.currency}</span>
                        <span>{product?.currentPrice}</span>
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
