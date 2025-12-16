"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Upload, X, Package, DollarSign, MessageCircle } from "lucide-react";

const AddProduct = () => {
  const { getToken, router } = useAppContext();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Backpack");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("+917045010589");
  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editId) {
      setIsEditing(true);
      setProductId(editId);
      fetchProductData(editId);
    }
  }, [editId]);

  const fetchProductData = async (id) => {
    try {
      const token = await getToken();
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || window.location.origin;
      const apiUrl = `${baseUrl}/api/product/${id}`;
      const { data } = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        const product = data.product;
        setName(product.name || "");
        setDescription(product.description || "");
        setCategory(product.category || "Backpack");
        setPrice(product.price || "");
        setOfferPrice(product.offerPrice || "");
        setWhatsappNumber(product.whatsappNumber || "+919326123535");
        setColors(product.colors || []);
        setPreviewImages(product.image || []);
      } else {
        toast.error(data.message || "Failed to fetch product data");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      if (error.response) {
        toast.error(`Error: ${error.response.data?.message || error.response.statusText || 'Failed to fetch product data'}`);
      } else if (error.request) {
        toast.error('Network error: No response received from server');
      } else {
        toast.error(`Error: ${error.message || 'Unknown error occurred'}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);
    formData.append("whatsappNumber", whatsappNumber);
    formData.append("colors", JSON.stringify(colors));

    files.forEach((file) => {
      formData.append("images", file);
    });

    if (isEditing && files.length === 0) {
      formData.append("existingImages", JSON.stringify(previewImages));
    }

    try {
      const token = await getToken();
      let response;

      if (isEditing) {
        formData.append("productId", productId);
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || window.location.origin;
        response = await axios.put(`${baseUrl}/api/product/update`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || window.location.origin;
        response = await axios.post(`${baseUrl}/api/product/add`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      if (response.data.success) {
        toast.success(response.data.message);
        if (isEditing) {
          router.push("/seller/product-list");
        } else {
          resetForm();
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFiles([]);
    setPreviewImages([]);
    setName("");
    setDescription("");
    setCategory("Backpack");
    setPrice("");
    setOfferPrice("");
    setColors([]);
    setColorInput("");
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setFiles((prev) => [...prev, ...newFiles]);
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const isBlob = previewImages[index].startsWith("blob:");

    if (isBlob) {
      const blobUrlsBeforeIndex = previewImages
        .slice(0, index)
        .filter((url) => url.startsWith("blob:")).length;

      const newFiles = [...files];
      newFiles.splice(blobUrlsBeforeIndex, 1);
      setFiles(newFiles);

      URL.revokeObjectURL(previewImages[index]);
    }

    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                {isEditing ? "Edit Product" : "Add New Product"}
              </h1>
              <p className="text-slate-600 font-medium">
                {isEditing ? "Update your product details" : "Create a new product listing"}
              </p>
            </div>

            <Link
              href="/seller/product-list"
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-all font-bold text-sm shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  placeholder="Enter product name"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  placeholder="Enter product description"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Category *
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 appearance-none bg-white"
                  >
                    <option value="Backpack">Backpack</option>
                    <option value="Laptop Bag">Laptop Bag</option>
                    <option value="Sling Bag">Hiking Bag</option>
                    <option value="Duffel Bag">Duffel Bag</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Complementary Items">Complementary Items</option>
                  </select>
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Price (₹) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min="0"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    placeholder="Enter price"
                  />
                </div>
              </div>

              {/* Offer Price */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Offer Price (₹) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    required
                    min="0"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    placeholder="Enter offer price"
                  />
                </div>
              </div>

              {/* WhatsApp Number */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  WhatsApp Number *
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    placeholder="Enter WhatsApp number with country code"
                  />
                </div>
              </div>
            </div>

            {/* Product Images */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Product Images *
              </label>
              <div className="flex flex-wrap gap-4 mb-4">
                {previewImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 border-2 border-slate-200 rounded-xl overflow-hidden shadow-lg group"
                  >
                    <Image
                      src={image}
                      alt={`Preview ${index}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-lg p-1.5 hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all group">
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-600 mb-1" />
                  <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600">Upload</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                  />
                </label>
              </div>
              <p className="text-sm text-slate-500">
                Upload up to 5 images. First image will be used as the product thumbnail.
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => router.push("/seller/product-list")}
                className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 rounded-full border-t-white animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : isEditing ? (
                  "Update Product"
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
