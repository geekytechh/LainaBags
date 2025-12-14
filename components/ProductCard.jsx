import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";

const ProductCard = ({ product }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;

  return (
    <Link href={`/product/${product._id}`}>
      <div className="flex overflow-hidden flex-col h-full bg-white rounded-xl border border-blue-100 transition-all duration-300 group shadow-soft hover:shadow-hover hover:border-blue-200">
        {/* Image Section */}
        <div className="overflow-hidden relative aspect-square">
          <Image
            src={product.image?.[0] || assets.placeholder_image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            width={400}
            height={400}
            priority
          />
          <div 
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/all-products?category=${encodeURIComponent(product.category.toLowerCase())}`;
            }}
            className="absolute top-3 right-3 px-3 py-1 text-xs font-medium tracking-wide text-white bg-blue-600 rounded-full opacity-90 transition-colors duration-200 cursor-pointer font-body hover:bg-blue-700"
          >
            {product.category}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow p-5">
          <h3 className="mb-2 text-lg font-semibold tracking-tight text-blue-900 transition-colors duration-300 font-heading group-hover:text-blue-600">
            {product.name}
          </h3>
          <p className="flex-grow mb-4 text-sm text-blue-700 line-clamp-2 font-body">
            {product.description}
          </p>

          <div className="flex justify-between items-end mt-auto">
            <div>


              <div className="flex gap-2 items-baseline">
                <span className="text-lg font-bold text-blue-600 font-heading">
                  {currency || "₹"}
                  {product.offerPrice}
                </span>
                {product.price > product.offerPrice && (
                  <span className="text-sm text-blue-400 line-through font-body">
                    {currency || "₹"}
                    {product.price}
                  </span>
                )}
              </div>
            </div>

            <div className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-md font-body">
              {Math.round(
                ((product.price - product.offerPrice) / product.price) * 100
              )}
              % OFF
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
