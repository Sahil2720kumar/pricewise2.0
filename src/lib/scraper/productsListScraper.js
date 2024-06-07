"use server";
import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";
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

export async function amazonProductsListScraper(productName) {
    if (!productName) return;
    const url = `https://www.amazon.in/s?k=${productName}`;

    try {
        // Fetch the product page
        let productsList = [];
        let images = [];
        let curPrices = [];
        let orginalPrices = [];
        let stars = [];
        let limit = 5;
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);

        $("a.a-link-normal.s-link-style:not(.s-no-hover)")
            .filter((index, element) => {
                // Return true if the element has an href attribute and its text is not a number
                if (
                    isNaN($(element).text()) &&
                    $(element).text() !== "Let us know" &&
                    $(element).text() !== "Amazon's" &&
                    index < limit &&
                    index > 0
                ) {
                    return $(element).attr("href");
                }
            })
            .map((index, element) => {
                // Get the href and text of the element
                const href = $(element).attr("href");
                const text = $(element).text();
                // console.log($(element).text());
                return { text, href };
            })
            .each((index, element) => {
                productsList.push(element);
            });

        //console.log("productsList :", productsList);

        //console.log("imgagr", $("img.s-image"))
        $("img.s-image").filter((index, element) => {
            if (index < 2) {
                //console.log("images", $(element).attr("src"));
                images.push($(element).attr("src"));
            }
        });
        // console.log(images);
        const currencySymbol = $(".a-price span.a-price-symbol").text()[0];
        // console.log(currencySymbol);

        $(".a-price span.a-price-whole").filter((index, element) => {
            if (index < 2) {
                const price = $(element).text();
                let amountNumeric = parseFloat(
                    price.replace(/₹/g, "").replace(/,/g, "")
                );
                curPrices.push(amountNumeric);
            }
        });
        //console.log(curPrices);

        $(".a-text-price span.a-offscreen").filter((index, element) => {
            if (index < 2) {
                const price = $(element).text();
                let amountNumeric = parseFloat(
                    price.replace(/₹/g, "").replace(/,/g, "")
                );
                orginalPrices.push(amountNumeric);
            }
        });
        //console.log(orginalPrices);

        $(".a-icon-alt").filter((index, element) => {
            if (index < 2) {
                const starsText = $(element).text();
                let starNumeric = parseFloat(starsText.slice(0, 3));
                stars.push(starNumeric);
            }
        });
        // console.log(stars);

        // Create an array of objects combining data from all arrays
        const data = [];
        for (let i = 0; i < productsList.length; i++) {
            data.push({
                title: productsList[i].text,
                productLink: productsList[i].href,
                image: images[i],
                currency: currencySymbol,
                originalPrice: orginalPrices[i],
                currentPrice: curPrices[i],
                stars: stars[i]
            });
        }

        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function filpcartProductsListScraper(productName) {
    if (!productName) return;
    const url = `https://www.jiomart.com/search/i%20phone%2015/in/prod_mart_master_vertical?prod_mart_master_vertical%5Bpage%5D=2&prod_mart_master_vertical%5BhierarchicalMenu%5D%5Bcategory_tree.level0%5D%5B0%5D=Category`;

    try {
        console.log("url", url);
        const response = await axios.get(url, options);
        console.log(response.data);

        // const $ = cheerio.load(response.data);
    } catch (error) {
        console.log(error);
    }
}
