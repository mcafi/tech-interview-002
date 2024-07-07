import { useProductsContext } from "@/context/productsContext";
import { ProductItem } from "./ProductItem";
import { Product } from "@/types/Product";
import Link from "next/link";

function ProductsListText(data: Product[] | null) {
  if (!data) {
    return <span>Click Search to show the products</span>;
  }
  if (data.length === 0) {
    return <span>No products found</span>;
  }
  return <span>Showing {data.length} results</span>;
}

const ProductsList = () => {
  const { data } = useProductsContext();
  return (
    <div className="container mx-auto">
      <Link className="underline" href="/history">
        Go to History page
      </Link>
      <p className="mb-6">{ProductsListText(data)}</p>
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-wrap gap-5">
          {data.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
