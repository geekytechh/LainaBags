"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

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
    <div className="flex flex-col min-h-screen px-4 sm:px-6 md:px-10 py-6">
      <div className="flex-1 w-full max-w-7xl mx-auto">
        <div className="mb-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-heading font-bold text-stone-800">
                Product Management
              </h1>
              <p className="text-sm text-stone-600 font-body">
                Manage your product listings
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-stone-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-full border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Link
                href="/seller"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-body text-sm shadow-soft hover:shadow-hover"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Product
              </Link>
            </div>
          </div>

          {/* Table or Loader */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loading />
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-soft border border-blue-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-stone-200 text-sm">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-blue-700 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left hidden sm:table-cell font-medium text-blue-700 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-stone-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-4 py-3 text-center font-medium text-blue-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <tr
                          key={product._id}
                          className="hover:bg-blue-50/50 transition-colors"
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-14 h-14 bg-blue-50 rounded-md overflow-hidden border border-blue-100 flex-shrink-0">
                                <Image
                                  src={product.image[0]}
                                  alt={product.name}
                                  width={56}
                                  height={56}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="text-blue-800 font-medium font-body line-clamp-2">
                                {product.name}
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4 hidden sm:table-cell">
                            <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                              {product.category}
                            </span>
                          </td>

                          <td className="px-4 py-4 text-stone-600">
                            ₹{product.price.toLocaleString()}
                          </td>

                          <td className="px-4 py-4 text-center">
                            <div className="flex justify-center gap-3">
                              <button
                                onClick={() => {
                                  if (product && product._id) {
                                    router.push(`/product/${product._id}`);
                                  } else {
                                    console.error('Invalid product data:', product);
                                  }
                                }}
                                className="text-blue-600 hover:text-blue-900 transition-colors"
                                title="View Product"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => {
                                  if (product && product._id) {
                                    router.push(`/seller?edit=${product._id}`);
                                  } else {
                                    console.error('Invalid product data:', product);
                                  }
                                }}
                                className="text-yellow-600 hover:text-yellow-900 transition-colors"
                                title="Edit Product"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => deleteProduct(product._id)}
                                disabled={deletingId === product._id}
                                className="text-red-600 hover:text-red-900 transition-colors disabled:opacity-50"
                                title="Delete Product"
                              >
                                {deletingId === product._id ? (
                                  <svg
                                    className="w-5 h-5 animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    ></path>
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-10 text-stone-500"
                        >
                          {searchTerm ? (
                            <div>
                              <p className="text-lg mb-1">No products found</p>
                              <p className="text-sm">
                                Try adjusting your search or filters
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-lg mb-1">
                                You haven't added any products yet
                              </p>
                              <Link
                                href="/seller"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                              >
                                <svg
                                  className="w-5 h-5 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                  />
                                </svg>
                                Add your first product
                              </Link>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
