"use client";
import Navbar from "@/components/Navbar";
import ProductsList from "@/components/ProductsList";
import { ProductsProvider } from "@/context/productsContext";

export default function Home() {
  return (
    <ProductsProvider>
      <main className="min-h-screen ">
        <Navbar />
        <ProductsList />
      </main>
    </ProductsProvider>
  );
}
