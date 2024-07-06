"use client";
import Navbar from "@/components/Navbar";
import ProductsList from "@/components/ProductsList";
import { ProductsProvider } from "@/context/productsContext";

export default function Home() {
  return (
    <ProductsProvider>
      <main className="flex min-h-screen flex-col items-center p-4">
        <Navbar />
        <ProductsList />
      </main>
    </ProductsProvider>
  );
}
