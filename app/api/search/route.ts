import { Product } from "@/types/Product";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  let url = searchParams.has("category")
    ? `https://dummyjson.com/products/category/${searchParams.get("category")}`
    : "https://dummyjson.com/products/search";

  url += `?limit=0`;

  const res = await fetch(url);
  const { products: productsList } = await res.json();

  const products = productsList
    .map((product: any) => {
      return {
        id: product.id,
        name: product.name,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        category: product.category,
        reviewAverageRating:
          product.reviews.reduce(
            (acc: number, review: { rating: number }) => acc + review.rating,
            0
          ) / product.reviews.length,
      } as Product;
    })
    .filter((product: any) => {
      if (
        searchParams.has("priceFrom") &&
        product.price < Number(searchParams.get("priceFrom"))
      ) {
        return false;
      }
      if (
        searchParams.has("priceTo") &&
        product.price > Number(searchParams.get("priceTo"))
      ) {
        return false;
      }
      if (
        searchParams.has("ratingFrom") &&
        product.reviewAverageRating < Number(searchParams.get("ratingFrom"))
      ) {
        return false;
      }
      if (
        searchParams.has("ratingTo") &&
        product.reviewAverageRating > Number(searchParams.get("ratingTo"))
      ) {
        return false;
      }
      return true;
    });
  return Response.json({ products });
}
