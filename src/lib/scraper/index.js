"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";

export async function scrapeAmazonProduct(url) {
    if (!url) return;

    // BrightData proxy configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password
        },
        host: "brd.superproxy.io",
        port,
        rejectUnauthorized: false
    };
    try {
        // Fetch the product page
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);
        //scape product tutle
        const title = $("#productTitle").text().trim();
        const currentPrice = extractPrice(
            $(".priceToPay span.a-price-whole"),
            $(".a-text-price .a-offscreen")
        );

        const originalPrice = extractPrice(
            $(".a-price.a-text-price.a-size-base .a-offscreen"),
            $(".a-price.a-text-price span.a-offscreen")
        );
        const outOfStock = $("#availability span")
            .text()
            .trim()
            .toLowerCase()
            .includes("currently unavailable.");

        const images =
            $("#imgBlkFront").attr("data-a-dynamic-image") ||
            $("#landingImage").attr("data-a-dynamic-image") ||
            "{}";

        const imageUrls = Object.keys(JSON.parse(images));
        const currency = extractCurrency($(".a-price-symbol"));
        const discountRate = $(".savingsPercentage")
            .text()
            .replace(/[-%]/g, "");

        const description = extractDescription($);
        const reviewsCount = $("#acrCustomerReviewLink #acrCustomerReviewText")
            .html()
            .split(" ")[0];
        const stars = $(".a-icon-alt");
        const starsArr = [...stars];
        const starsCount = $(starsArr[0]).text().split(" ")[0];
        //console.log({discountRate,reviewsCount,starsCount})
        // Construct data object with scraped information
        const data = {
            website: "amazon",
            url,
            currency: currency || "$",
            image: imageUrls[0],
            title,
            currentPrice: Number(currentPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [],
            discountRate: Number(discountRate),
            category: "category",
            reviewsCount: reviewsCount,
            stars: Number(starsCount),
            isOutOfStock: outOfStock,
            description,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice)
        };
        
       // console.log(data)
        return data;
    } catch (error) {
        console.log(error);
    }
}
