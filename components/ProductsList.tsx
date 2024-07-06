import { useProductsContext } from "@/context/productsContext";
import { FC } from "react";
import { ProductItem } from "./ProductItem";

interface Props {
  // Define your component props here
}

const ProductsList: FC<Props> = () => {
  const { data } = useProductsContext();
  console.log(data);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 flex-wrap gap-5">
      {data.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductsList;
