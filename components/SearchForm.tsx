"use client";
import { Category } from "@/types/Category";
import React, { FC, useId, useState } from "react";
import NumberInputWrapper from "./NumberInputWrapper";
import { useProductsContext } from "@/context/productsContext";

type SearchFormProps = {
  categories: Category[];
};

type Filters = {
  priceFrom: number | null;
  priceTo: number | null;
  category: string;
};

const SearchForm: FC<SearchFormProps> = ({ categories }) => {
  const categorySelectId = useId();
  const [filters, setFilters] = useState<Filters>({
    priceFrom: null,
    priceTo: null,
    category: "",
  });

  const { data, setData } = useProductsContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your logic here to handle form submission
    console.log("Search");
    const res = await fetch("http://localhost:3000/api/search");
    const data = await res.json();
    setData(data.products);
  };

  return (
    <form
      className="flex flex-col gap-4 md:flex-row items-end"
      onSubmit={handleSubmit}
    >
      <NumberInputWrapper
        name="priceFrom"
        placeholder="Price from"
        label="Price from"
        value={filters.priceFrom}
        onChange={(value) =>
          setFilters((filters) => ({ ...filters, priceFrom: value }))
        }
      />
      <NumberInputWrapper
        name="priceTo"
        placeholder="Price to"
        label="Price to"
        value={filters.priceTo}
        onChange={(value) =>
          setFilters((filters) => ({ ...filters, priceTo: value }))
        }
      />
      <div className="flex flex-col">
        <label htmlFor={categorySelectId}>Category</label>
        <select
          id={categorySelectId}
          className="h-8 px-2 rounded text-black"
          title="category"
          value={filters.category}
          onChange={(e) =>
            setFilters((filters) => ({ ...filters, category: e.target.value }))
          }
        >
          <option value="">Select a category</option>
          {categories.map((category: { slug: string; name: string }) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button className="h-8 bg-blue-500 text-white rounded px-2" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
