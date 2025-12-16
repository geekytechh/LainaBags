"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowRight, Sparkles } from "lucide-react";

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
    <div className="relative py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
            Our <span className="text-blue-600">Collections</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-4"></div>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore our most popular bags, loved by thousands of customers for their quality and style
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden aspect-[3/4] animate-pulse border border-slate-200">
                <div className="w-full h-3/4 bg-slate-100"></div>
                <div className="p-4 space-y-2">
                  <div className="w-3/4 h-4 bg-slate-100 rounded"></div>
                  <div className="w-1/2 h-3 bg-slate-100 rounded"></div>
                  <div className="w-1/3 h-4 bg-slate-100 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
            <button
              onClick={() => router.push("/all-products")}
              className="group mt-10 md:mt-12 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="p-8 mx-auto max-w-md bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">New Arrivals Coming Soon</h3>
              <p className="text-sm text-slate-600 mb-6">We're adding fresh designs to our collection</p>
              <button onClick={() => router.push("/")} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all">
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
