"use server";
import { scrapeAmazonProduct } from "../scraper";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function scrapeAndStoreProduct(productUrl) {
    if (!productUrl) return;
    try {
        connectToDB();

        const scrapedProduct = await scrapeAmazonProduct(productUrl);

        if (!scrapedProduct) return;

        let product = scrapedProduct;

        const existingProduct = await Product.findOne({
            url: scrapedProduct.url
        });

        if (existingProduct) {
            const updatedPriceHistory = [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
            ];

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory)
            };
        }

        const newProduct = await Product.findOneAndUpdate(
            { url: scrapedProduct.url },
            product,
            { upsert: true, new: true }
        );

        revalidatePath(`/products/${newProduct._id}`);

        return {id:newProduct._id}
    } catch (error) {
        throw new Error(`Failed to create/update product: ${error.message}`);
    }
}

export async function getAllProducts() {
    try {
        await connectToDB();

        const products = await Product.find();
        console.log(products)
        return products;
    } catch (error) {
        console.log(error);
    }
}

export async function getProductById(productId) {
    try {
        connectToDB();

        const product = await Product.findOne({ _id: productId });

        if (!product) return null;

        return product;
    } catch (error) {
        console.log(error);
    }
}

export async function getSimilarProducts(productId) {
    try {
        connectToDB();

        const currentProduct = await Product.findById(productId);

        if (!currentProduct) return null;

        const similarProducts = await Product.find({
            _id: { $ne: productId }
        }).limit(3);

        return similarProducts;
    } catch (error) {
        console.log(error);
    }
}
