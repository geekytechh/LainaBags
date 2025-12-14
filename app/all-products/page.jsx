// Updated `/app/all-products/page.jsx` with SWR

"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "@/assets/assets";
import useSWR from "swr";

const fetcher = (url) => fetch(url, { cache: "no-store" }).then((res) => res.json());

const AllProducts = () => {
  const { category, setCategory } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [complimentaryItems, setComplimentaryItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showComplimentary, setShowComplimentary] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data, isLoading } = useSWR("/api/product/list", fetcher, {
    refreshInterval: 10000,
  });

  const products = data?.products || [];

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveFilter(categoryParam);
      setCategory(categoryParam);
    } else if (category) {
      setActiveFilter(category);
    }
    setCategory((prev) => prev);
  }, [searchParams, category, setCategory]);

  useEffect(() => {
    if (products.length > 0) {
      let filtered = [];
      if (activeFilter === "all") {
        filtered = products;
      } else {
        filtered = products.filter((product) => {
          const productCategory = product.category.toLowerCase().trim();
          const filterCategory = activeFilter.toLowerCase().trim();
          return (
            productCategory === filterCategory ||
            productCategory.includes(filterCategory) ||
            filterCategory.includes(productCategory)
          );
        });
      }
      setFilteredProducts(filtered);

      const complementaryMap = {
        backpack: ["accessories", "complementary items"],
        "laptop bag": ["accessories", "complementary items"],
        "sling bag": ["accessories", "complementary items"],
        "duffel bag": ["accessories", "complementary items"],
        "gym bag": ["accessories", "complementary items"],
        accessories: ["backpack", "laptop bag", "complementary items"],
        "complementary items": ["backpack", "laptop bag", "accessories"],
      };

      const complementaryCategories = complementaryMap[activeFilter] || [];
      if (complementaryCategories.length > 0) {
        const complementaryProducts = products
          .filter((product) => complementaryCategories.includes(product.category.toLowerCase()))
          .slice(0, 4);
        setComplimentaryItems(complementaryProducts);
        setShowComplimentary(complementaryProducts.length > 0);
      } else {
        setComplimentaryItems([]);
        setShowComplimentary(false);
      }
    } else {
      setFilteredProducts([]);
      setComplimentaryItems([]);
      setShowComplimentary(false);
    }
  }, [products, activeFilter]);

  const categories = [
    { id: "all", name: "All Bags" },
    { id: "backpack", name: "Backpack" },
    { id: "laptop bag", name: "Laptop Bag" },
    { id: "sling bag", name: "Sling Bag" },
    { id: "duffel bag", name: "Duffel Bag" },
    { id: "gym bag", name: "Gym Bag" },
    { id: "accessories", name: "Accessories" },
    { id: "complementary items", name: "Complementary Items" },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 px-2 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl opacity-70 pointer-events-none"></div>
          <div className="absolute bottom-0 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 font-heading tracking-tight mb-4 relative">
            Our Collection
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-4 sm:mb-6 shadow-sm"></div>
          <p className="text-blue-800/80 max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-body relative">
            Explore our complete collection of premium bags, designed for every
            lifestyle and occasion.
          </p>
        </div>

        <div className="mb-8 sm:mb-10">
          <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100/50 rounded-full blur-2xl opacity-60 pointer-events-none"></div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 relative z-10">
              <h2 className="text-base sm:text-lg font-medium text-blue-900 font-heading">
                Filter by Category
              </h2>
              <p className="text-blue-700/70 text-sm font-body bg-blue-50/70 px-3 py-1 rounded-full">
                {filteredProducts.length} products found
              </p>
            </div>
            <div className="flex flex-wrap gap-2 relative z-10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveFilter(cat.id);
                    if (cat.id === "all") {
                      router.push("/all-products");
                    } else {
                      router.push(`/all-products?category=${cat.id}`);
                    }
                  }}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap rounded-lg ${
                    activeFilter === cat.id
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                      : "bg-white text-blue-800 hover:bg-blue-50 border border-blue-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="col-span-full text-center py-16 sm:py-20 px-4">
            <div className="mx-auto max-w-md relative">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-blue-200 rounded-full mb-4"></div>
                <div className="h-4 bg-blue-200 rounded w-48 mb-2"></div>
                <div className="h-3 bg-blue-100 rounded w-32"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            ) : (
              <div className="col-span-full text-center py-16 sm:py-20 px-4">
                <div className="mx-auto max-w-md relative">
                  <h3 className="mt-4 text-lg sm:text-xl font-medium text-blue-900 font-heading relative z-10">
                    No products found
                  </h3>
                  <button
                    onClick={() => {
                      setActiveFilter("all");
                      router.push("/all-products");
                    }}
                    className="mt-6 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    View All Products
                  </button>
                </div>
              </div>
            )}

            {/* {showComplimentary && complimentaryItems.length > 0 && (
              <div className="mt-16 pt-8 border-t border-blue-100">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 font-heading tracking-tight mb-3 relative">
                    Complimentary Items
                  </h2>
                  <p className="text-blue-800/80 max-w-md sm:max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-body">
                    Products that pair perfectly with your {activeFilter}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
                  {complimentaryItems.map((product, index) => (
                    <ProductCard key={`comp-${index}`} product={product} />
                  ))}
                </div>
              </div>
            )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default AllProducts;