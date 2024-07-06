import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  console.log(searchParams.toString());

  // const actualSearchParams = new URLSearchParams();

  let url = "https://dummyjson.com/products/search";

  // aggiungi i parametri della query string alla url
  url += `?${searchParams.toString()}`;

  const res = await fetch(url);
  const { products } = await res.json();
  return Response.json({ products });
}
