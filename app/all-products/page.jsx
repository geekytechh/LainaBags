"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { Filter, X } from "lucide-react";

const fetcher = (url) => fetch(url, { cache: "no-store" }).then((res) => res.json());

const AllProducts = () => {
  const { category, setCategory } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
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
    } else {
      setFilteredProducts([]);
    }
  }, [products, activeFilter]);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "backpack", name: "Backpack" },
    { id: "laptop bag", name: "Laptop Bag" },
    { id: "sling bag", name: "Sling Bag" },
    { id: "duffel bag", name: "Duffel Bag" },
    { id: "gym bag", name: "Gym Bag" },
    { id: "accessories", name: "Accessories" },
    { id: "complementary items", name: "Complementary Items" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-sky-50 via-white to-sky-50 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4">
              <span className="px-4 py-1.5 bg-sky-100 border border-sky-200 rounded-full text-xs font-bold tracking-wider text-sky-700 uppercase">
                Complete Collection
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              <span className="text-slate-900">Our</span>{" "}
              <span className="text-sky-600">Collection</span>
            </h1>
            <div className="w-20 h-1 bg-sky-600 mx-auto rounded-full mb-4"></div>
            <p className="text-slate-600 text-lg leading-relaxed">
              Explore our complete collection of premium bags, designed for every lifestyle and occasion
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-bold hover:bg-sky-700 transition-all"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <h2 className="text-lg font-bold text-slate-900">Filter by Category</h2>
            </div>
            <div className="px-4 py-2 bg-sky-50 border border-sky-200 rounded-xl">
              <span className="text-sm font-bold text-sky-700">
                {filteredProducts.length} products
              </span>
            </div>
          </div>

          {/* Mobile Filter Dropdown */}
          {showFilters && (
            <div className="md:hidden mb-4 p-4 bg-white border border-slate-200 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-slate-900">Categories</span>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveFilter(cat.id);
                      setShowFilters(false);
                      if (cat.id === "all") {
                        router.push("/all-products");
                      } else {
                        router.push(`/all-products?category=${cat.id}`);
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      activeFilter === cat.id
                        ? "bg-sky-600 text-white shadow-lg"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Desktop Filters */}
          <div className="hidden md:flex flex-wrap gap-3">
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
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeFilter === cat.id
                    ? "bg-sky-600 text-white shadow-lg scale-105"
                    : "bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-700 border border-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid - Centered */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-sky-200 rounded-full border-t-sky-600 animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600 font-medium">Loading products...</p>
            </div>
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sky-100 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-sky-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">No products found</h3>
                  <p className="text-slate-600 mb-6">Try selecting a different category</p>
                  <button
                    onClick={() => {
                      setActiveFilter("all");
                      router.push("/all-products");
                    }}
                    className="px-6 py-3 bg-sky-600 text-white rounded-xl font-bold text-sm hover:bg-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    View All Products
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
