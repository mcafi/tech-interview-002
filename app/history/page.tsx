"use client";

import { SavedSearch } from "@/types/Filters";
import { clear } from "console";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [searches, setSearches] = useState<SavedSearch[] | null>(null);

  useEffect(() => {
    const savedSearches = localStorage.getItem("savedSearches");
    if (savedSearches) {
      setSearches(JSON.parse(savedSearches));
    }
  }, []);

  const clearSearches = () => {
    localStorage.removeItem("savedSearches");
    setSearches([]);
  };

  return (
    <div>
      <div className="container m-auto p-4">
        <h1 className="text-xl">History Page</h1>
      </div>
      <div className="container m-auto p-4">
        {searches && searches.length > 0 && (
          <button
            className="bg-red-700 p-2 rounded text-white font-semibold"
            onClick={clearSearches}
            type="button"
          >
            Clear all searches
          </button>
        )}
        {SavedSearches(searches)}
      </div>
    </div>
  );
}

function SavedSearches(savedSearched: SavedSearch[] | null) {
  if (!savedSearched) {
    return <span></span>;
  }
  if (savedSearched.length === 0) {
    return <span>No searches found</span>;
  }
  return (
    <ul>
      {savedSearched.map((search, index) => (
        <li
          className="flex flex-wrap gap-3 my-4 border border-black border-b-white"
          key={index}
        >
          <span>min. price: {search.priceFrom ?? "-"}</span>
          <span>max. price: {search.priceTo ?? "-"}</span>
          <span>min. rating: {search.ratingFrom ?? "-"}</span>
          <span>max. rating: {search.ratingTo ?? "-"}</span>
          <span>category: {search.category ?? "any"}</span>
          <span className="font-semibold flex-1 text-right">
            count: {search.count ?? 0}
          </span>
        </li>
      ))}
    </ul>
  );
}
