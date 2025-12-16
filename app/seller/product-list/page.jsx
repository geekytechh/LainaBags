"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { Search, Plus, Eye, Edit, Trash2, Package } from "lucide-react";

const ProductList = () => {
  const { router, getToken, user } = useAppContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken();
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || window.location.origin;
      const apiUrl = `${baseUrl}/api/product/seller-list`;
      const { data } = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      setDeletingId(id);
      const token = await getToken();
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || window.location.origin;
      const apiUrl = `${baseUrl}/api/product/delete/${id}`;
      const { data } = await axios.delete(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success("Product deleted successfully");
        fetchSellerProduct();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerProduct();
    }
  }, [user]);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                Product Management
              </h1>
              <p className="text-slate-600 font-medium">
                Manage your product listings
              </p>
            </div>

            <Link
              href="/seller"
              className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-black text-sm shadow-xl hover:shadow-2xl transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add Product</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products by name or category..."
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-300 bg-white shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            {filteredProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-sky-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-black text-sky-700 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left hidden md:table-cell text-xs font-black text-sky-700 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-sky-700 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-black text-sky-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredProducts.map((product) => (
                      <tr
                        key={product._id}
                        className="hover:bg-sky-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden border-2 border-slate-200 flex-shrink-0">
                              <Image
                                src={product.image[0]}
                                alt={product.name}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="font-bold text-slate-900 line-clamp-2">
                              {product.name}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-100 border border-sky-200 rounded-lg text-xs font-black text-sky-700">
                            <Package className="w-3 h-3" />
                            {product.category}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-black text-sky-600">
                              ₹{product.offerPrice?.toLocaleString() || product.price.toLocaleString()}
                            </span>
                            {product.offerPrice && product.price > product.offerPrice && (
                              <span className="text-xs text-slate-400 line-through">
                                ₹{product.price.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-center items-center gap-3">
                            <button
                              onClick={() => {
                                if (product && product._id) {
                                  router.push(`/product/${product._id}`);
                                }
                              }}
                              className="p-2 text-sky-600 hover:bg-sky-100 rounded-lg transition-all"
                              title="View Product"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                if (product && product._id) {
                                  router.push(`/seller?edit=${product._id}`);
                                }
                              }}
                              className="p-2 text-amber-600 hover:bg-amber-100 rounded-lg transition-all"
                              title="Edit Product"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(product._id)}
                              disabled={deletingId === product._id}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all disabled:opacity-50"
                              title="Delete Product"
                            >
                              {deletingId === product._id ? (
                                <div className="w-5 h-5 border-2 border-red-600/30 rounded-full border-t-red-600 animate-spin"></div>
                              ) : (
                                <Trash2 className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sky-100 flex items-center justify-center">
                    <Package className="w-10 h-10 text-sky-600" />
                  </div>
                  {searchTerm ? (
                    <>
                      <h3 className="text-xl font-black text-slate-900 mb-2">No products found</h3>
                      <p className="text-slate-600 mb-6">Try adjusting your search or filters</p>
                      <button
                        onClick={() => setSearchTerm("")}
                        className="px-6 py-3 bg-sky-600 text-white rounded-xl font-black text-sm hover:bg-sky-700 transition-all shadow-lg"
                      >
                        Clear Search
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-black text-slate-900 mb-2">
                        You haven't added any products yet
                      </h3>
                      <p className="text-slate-600 mb-6">Get started by adding your first product</p>
                      <Link
                        href="/seller"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-xl font-black text-sm hover:bg-sky-700 transition-all shadow-lg hover:shadow-xl"
                      >
                        <Plus className="w-5 h-5" />
                        <span>Add Your First Product</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
