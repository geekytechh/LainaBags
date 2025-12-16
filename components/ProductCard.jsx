import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Eye } from "lucide-react";

const ProductCard = ({ product }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const discount = product.price > product.offerPrice 
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  return (
    <Link href={`/product/${product._id}`}>
      <div className="group relative flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-sky-300 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-sky-50 overflow-hidden">
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-red-500 text-white rounded-lg text-xs font-black shadow-lg">
              -{discount}%
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 right-3 z-20">
            <button
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/all-products?category=${encodeURIComponent(product.category.toLowerCase())}`;
              }}
              className="px-2.5 py-1 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700 transition-all duration-200 shadow-md"
            >
              {product.category}
            </button>
          </div>

          {/* Image */}
          <Image
            src={product.image?.[0] || "/images/search.png"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <a
                href={`https://wa.me/919326123535?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 px-4 py-2.5 bg-green-500 text-white rounded-lg text-sm font-bold hover:bg-green-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order</span>
              </a>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // Quick view
                }}
                className="px-4 py-2.5 bg-white/95 backdrop-blur-sm text-slate-700 rounded-lg text-sm font-bold hover:bg-white transition-all duration-200 shadow-lg"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow p-4 bg-white">
          <div className="mb-2">
            <span className="text-xs font-bold tracking-wider text-sky-600 uppercase">Laina Bags</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-sky-700 transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed flex-grow">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-end justify-between pt-3 border-t border-slate-100">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-sky-600">
                  {currency || "₹"}
                  {product.offerPrice}
                </span>
                {product.price > product.offerPrice && (
                  <span className="text-sm text-slate-400 line-through font-medium">
                    {currency || "₹"}
                    {product.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
