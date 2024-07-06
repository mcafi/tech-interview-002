import { useProductsContext } from "@/context/productsContext";
import React from "react";

interface Props {
  // Define your component props here
}

const ProductsList: React.FC<Props> = () => {
  // usa il context di ProductsContext per ottenere la lista dei prodotti
  const { data, setData } = useProductsContext();

  return <div>{data.length}</div>;
};

export default ProductsList;
