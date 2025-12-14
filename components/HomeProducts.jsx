// HomeProducts.jsx
"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const HomeProducts = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Use environment variable for API base URL if available, otherwise use window.location.origin
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || window.location.origin;
        const apiUrl = `${baseUrl}/api/product/list`;
        const { data } = await axios.get(apiUrl);
        if (data.success) {
          const validCategories = ["backpack", "laptop bag", "sling bag", "duffel bag", "gym bag", "accessories"];
          const bagProducts = data.products.filter(
            (product) =>
              validCategories.some(cat => product.category?.toLowerCase().includes(cat)) ||
              product.name?.toLowerCase().includes("bag")
          );
          setProducts(bagProducts);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center px-4 pt-16 pb-12 sm:pt-20 sm:pb-16 sm:px-6">
      <div className="flex flex-col items-center w-full max-w-7xl">
        <div className="relative px-2 mb-12 text-center sm:mb-16 sm:px-0">
          <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full blur-xl bg-blue-300/20"></div>
          <div className="absolute -top-8 right-1/4 w-24 h-24 rounded-full blur-lg bg-blue-400/10"></div>
          <div className="absolute -bottom-12 left-1/2 w-40 h-40 rounded-full blur-xl bg-blue-500/10"></div>
          <div className="absolute -bottom-10 right-1/4 w-28 h-28 rounded-full blur-lg bg-blue-200/20"></div>
          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-blue-800 sm:text-4xl md:text-5xl sm:mb-6 font-heading">
              DISCOVER OUR COLLECTION
            </h2>
            <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
            <p className="px-1 mx-auto mt-6 max-w-md text-base leading-relaxed text-blue-700 sm:mt-8 sm:max-w-2xl sm:text-lg font-body sm:px-0">
              Handcrafted bags designed for every occasion, combining premium
              materials with timeless elegance
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden aspect-[3/4] animate-pulse border border-blue-100 shadow-soft"
              >
                <div className="w-full h-3/4 bg-blue-100"></div>
                <div className="p-5 space-y-3">
                  <div className="w-3/4 h-4 bg-blue-100 rounded"></div>
                  <div className="w-1/2 h-4 bg-blue-100 rounded"></div>
                  <div className="w-1/3 h-5 bg-blue-100 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 gap-6 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
            <button
              onClick={() => router.push("/all-products")}
              className="mt-12 sm:mt-16 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-500 hover:to-blue-600 transition-all duration-300 font-medium uppercase tracking-wide text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:outline-none"
            >
              Explore All Collections
            </button>
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="p-6 mx-auto max-w-md bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-100 sm:p-10 shadow-soft">
              <div className="flex justify-center items-center p-5 mx-auto mb-6 w-24 h-24 rounded-full bg-blue-100/30 sm:w-32 sm:h-32">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto w-16 h-16 text-blue-600 sm:h-20 sm:w-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="mt-4 mb-3 text-xl font-bold text-blue-800 sm:text-2xl font-heading">
                New Collections Coming Soon
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-blue-700 font-body sm:text-base">
                We're preparing our latest designs. Sign up to be the first to
                know when we launch.
              </p>
              <button
                onClick={() => router.push("/")}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm sm:text-base font-medium hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-soft hover:shadow-md"
              >
                Return Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProducts;
