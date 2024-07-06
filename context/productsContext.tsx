import { Product } from "@/types/Product";
import React, { createContext, useContext, useState } from "react";

const ProductsContext = createContext({
  data: [] as Product[],
  setData: (_) => {},
});

export const ProductsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  return (
    <ProductsContext.Provider value={{ data, setData }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
