import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const res = await fetch("https://dummyjson.com/products/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    if (categories.length === 0) loadCategories();
  }, [categories]);

  return (
    <div className="container my-8 mx-auto">
      <SearchForm categories={categories} />
    </div>
  );
};

export default Navbar;
