"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";

const HomeProducts = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
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
    <div className="relative flex flex-col items-center px-4 pt-16 pb-12 sm:pt-20 sm:pb-16 sm:px-6 bg-white">
      <div className="flex flex-col items-center w-full max-w-7xl">
        <div className="relative px-2 mb-12 text-center sm:mb-16 sm:px-0">
          <div className="relative z-10">
            <div className="inline-block mb-4">
              <span className="px-4 py-1.5 bg-sky-100 border border-sky-200 rounded-full text-xs font-bold tracking-wider text-sky-700 uppercase">
                Premium Selection
              </span>
            </div>
            <h2 className="mb-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl sm:mb-6">
              <span className="text-slate-900">Discover Our</span>{" "}
              <span className="text-sky-600">Collection</span>
            </h2>
            <div className="w-20 h-1 bg-sky-600 mx-auto rounded-full mb-6"></div>
            <p className="px-1 mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg sm:px-0">
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
                className="bg-white rounded-xl overflow-hidden aspect-[3/4] animate-pulse border border-slate-200"
              >
                <div className="w-full h-3/4 bg-slate-100"></div>
                <div className="p-4 space-y-3">
                  <div className="w-3/4 h-4 bg-slate-100 rounded"></div>
                  <div className="w-1/2 h-4 bg-slate-100 rounded"></div>
                  <div className="w-1/3 h-5 bg-slate-100 rounded"></div>
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
              className="group mt-12 sm:mt-16 px-8 py-3.5 bg-sky-600 text-white rounded-xl font-bold text-sm uppercase tracking-wide shadow-lg hover:bg-sky-700 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <span>Explore All Collections</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="p-8 mx-auto max-w-md bg-white rounded-2xl border border-slate-200 sm:p-12 shadow-lg">
              <div className="flex justify-center items-center p-6 mx-auto mb-8 w-24 h-24 rounded-full bg-sky-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto w-16 h-16 text-sky-600"
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
              <h3 className="mt-4 mb-4 text-2xl font-black text-slate-900">
                New Collections Coming Soon
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-slate-600">
                We're preparing our latest premium designs.
              </p>
              <button
                onClick={() => router.push("/")}
                className="px-8 py-3 bg-sky-600 text-white rounded-xl text-sm font-bold hover:bg-sky-700 transition-all duration-300"
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
