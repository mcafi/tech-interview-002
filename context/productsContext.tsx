import React, { createContext, useContext, useState } from "react";

const ProductsContext = createContext({
  data: [],
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
