"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { Filter, X, Sparkles, ShoppingBag } from "lucide-react";

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
    { id: "hiking bag", name: "Hiking Bag" },
    { id: "duffel bag", name: "Duffel Bag" },
    { id: "accessories", name: "Accessories" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header with Graphics */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E")`
        }}></div>

        {/* Floating Bag Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <ShoppingBag className="absolute top-16 left-20 w-12 h-12 rotate-12 animate-float" />
          <ShoppingBag className="absolute top-32 right-32 w-10 h-10 -rotate-12 animate-float" style={{ animationDelay: '1s' }} />
          <ShoppingBag className="absolute bottom-20 left-1/3 w-14 h-14 rotate-6 animate-float" style={{ animationDelay: '2s' }} />
        </div>


        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wide">Complete Collection</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
              Our Products
            </h1>
            <div className="w-20 h-1 bg-white/40 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Browse our complete range of premium bags for every need
            </p>
          </div>
        </div>
      </div>

      {/* Main Content with Graphics */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Background Graphics */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-50/30 rounded-full blur-3xl"></div>
        </div>

        {/* Filter Section */}
        <div className="mb-8 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <h2 className="text-lg font-bold text-slate-900">Categories</h2>
            </div>
            <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
              <span className="text-sm font-bold text-blue-700">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </span>
            </div>
          </div>

          {/* Mobile Filter Dropdown */}
          {showFilters && (
            <div className="md:hidden mb-4 p-4 bg-white border border-slate-200 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-slate-900">Filter by Category</span>
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
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeFilter === cat.id
                      ? "bg-blue-600 text-white shadow-lg"
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
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${activeFilter === cat.id
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative z-10">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full border-t-blue-600 animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600 font-medium">Loading products...</p>
              </div>
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">No products found</h3>
                    <p className="text-slate-600 mb-6 text-sm">Try selecting a different category</p>
                    <button
                      onClick={() => {
                        setActiveFilter("all");
                        router.push("/all-products");
                      }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg"
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
    </div>
  );
};

export default AllProducts;
