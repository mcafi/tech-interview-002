"use client";
import { Category } from "@/types/Category";
import React, { FC, useId, useState } from "react";
import NumberInputWrapper from "./NumberInputWrapper";
import { useProductsContext } from "@/context/productsContext";
import { Filters, SavedSearch } from "@/types/Filters";

type SearchFormProps = {
  categories: Category[];
};
const SearchForm: FC<SearchFormProps> = ({ categories }) => {
  const categorySelectId = useId();
  const [filters, setFilters] = useState<Filters>({
    priceFrom: null,
    priceTo: null,
    ratingFrom: null,
    ratingTo: null,
    category: "",
  });

  const { setData } = useProductsContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key as keyof Filters]) {
        searchParams.append(key, String(filters[key as keyof Filters]));
      }
    });
    const res = await fetch(
      `http://localhost:3000/api/search?${searchParams.toString()}`
    );
    const data = await res.json();
    setData(data.products);

    const savedSearchesJSON = localStorage.getItem("savedSearches");
    const savedSearches: SavedSearch[] = savedSearchesJSON
      ? JSON.parse(savedSearchesJSON)
      : [];
    savedSearches.push({ ...filters, count: data.products.length });

    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
  };

  return (
    <form
      className="flex flex-col gap-5 md:flex-row justify-around md:items-end"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-3 flex-1">
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
      </div>
      <div className="flex gap-3 flex-1">
        <NumberInputWrapper
          name="ratingFrom"
          placeholder="Rating from"
          label="Rating from"
          value={filters.ratingFrom}
          onChange={(value) =>
            setFilters((filters) => ({ ...filters, ratingFrom: value }))
          }
        />
        <NumberInputWrapper
          name="ratingTo"
          placeholder="Rating to"
          label="Rating to"
          value={filters.ratingTo}
          onChange={(value) =>
            setFilters((filters) => ({ ...filters, ratingTo: value }))
          }
        />
      </div>

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
