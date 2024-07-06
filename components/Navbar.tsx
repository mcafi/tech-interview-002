import React, { FC, useEffect, useState } from "react";
import SearchForm from "./SearchForm";

interface NavbarProps {
  // Define your component props here
}

const Navbar: FC<NavbarProps> = () => {
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
    <div className="flex flex-col lg:flex-row gap-4">
      <SearchForm categories={categories} />
    </div>
  );
};

export default Navbar;
