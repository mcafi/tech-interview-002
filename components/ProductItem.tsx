import { Product } from "@/types/Product";
import { FC } from "react";

const priceFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

const ratingFormatter = new Intl.NumberFormat("it-IT", {
  style: "decimal",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const ProductItem: FC<Product> = (product) => {
  return (
    <div className="flex h-36 justify-start gap-2 border border-solid border-white rounded-xl overflow-hidden">
      <div className="h-full bg-white aspect-square p-4">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="p-3">
        <h5 className="font-semibold">{product.title}</h5>
        <p className="text-sm">{product.category}</p>
        <p>{priceFormatter.format(product.price)}</p>
        <span className="text-sm">
          ⭐️ {ratingFormatter.format(product.reviewAverageRating)}
        </span>
      </div>
    </div>
  );
};
