import {amazonProductsListScraper,filpcartProductsListScraper} from "@/lib/scraper/productsListScraper";

export async function amazonSearchProductsList(productName) {
  if (!productName) return
  try {
    const products = await amazonProductsListScraper(productName); // Wait for results
    console.log("amazonProductsListScraper",products)
    return products;
  } catch (error) {
    console.log(error)
  }
}


export async function filpcartSearchProductsList(productName) {
  if (!productName) return
  try {
    const products = await filpcartProductsListScraper(productName); // Wait for results
    console.log("filpcartProductsListScraper",products)
    return products;
  } catch (error) {
    console.log(error)
  }
}

