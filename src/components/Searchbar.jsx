"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

const isValidAmazonProductURL = url => {
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;

        if (
            hostname.includes("amazon.com") ||
            hostname.includes("amazon.") ||
            hostname.endsWith("amazon")
        ) {
            return true;
        }
    } catch (error) {
        return false;
    }

    return false;
};

const Searchbar = () => {
    const router = useRouter();
    const [searchPrompt, setSearchPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState("");

    const handleSubmit = async event => {
        setErrors("");
        event.preventDefault();
        const isValidLink = isValidAmazonProductURL(searchPrompt);
        if (!isValidLink) {
            setErrors("Please provide a valid Amazon link");
            return;
        }
        try {
            setIsLoading(true);
            // Scrape the product page
            const product = await scrapeAndStoreProduct(searchPrompt);
            console.log(product)
            router.push(`/products/${product.id}`);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form className='flex  gap-4 mt-12' onSubmit={handleSubmit}>
                <div className='flex-1 min-w-[200px] '>
                    <input
                        type='text'
                        value={searchPrompt}
                        onChange={e => setSearchPrompt(e.target.value)}
                        placeholder='Enter product link'
                        className='w-full p-3 border border-gray-300 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none'
                    />
                </div>
                <button
                    type='submit'
                    className='bg-gray-900 min-w-[110px] h-[50px] md:min-w-[120px] md:h-[50px] border border-gray-900 rounded-lg shadow-xs px-3 py-2 md:px-5 md:py-3 text-white text-base font-semibold hover:opacity-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40'
                    disabled={searchPrompt === "" || isLoading}
                >
                    {isLoading ? "Searching..." : "Search"}
                </button>
            </form>
            <div className='text-red-500'>{errors ? errors : ""}</div>
        </>
    );
};

export default Searchbar;
