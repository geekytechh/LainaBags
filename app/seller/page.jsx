"use client";
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
  const [whatsappNumber, setWhatsappNumber] = useState("+919326123535");
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
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(`Error: ${error.response.data?.message || error.response.statusText || 'Failed to fetch product data'}`);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('Network error: No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
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

    // Append each file individually
    files.forEach((file) => {
      formData.append("images", file);
    });

    // If editing and no new files, pass existing images
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
      // Find the corresponding file index
      const blobUrlsBeforeIndex = previewImages
        .slice(0, index)
        .filter((url) => url.startsWith("blob:")).length;

      // Remove the corresponding file
      const newFiles = [...files];
      newFiles.splice(blobUrlsBeforeIndex, 1);
      setFiles(newFiles);

      // Revoke the blob URL
      URL.revokeObjectURL(previewImages[index]);
    }

    // Remove the preview image
    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  return (
    <div className="flex-1">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-heading font-bold text-stone-800">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="text-stone-600 font-body">
              {isEditing
                ? "Update your product details"
                : "Create a new product listing"}
            </p>
          </div>

          <Link
            href="/seller/product-list"
            className="flex items-center gap-2 px-4 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors font-body shadow-soft hover:shadow-hover"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
            Back to Products
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-soft border border-stone-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1 font-body">
                Product Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body"
                placeholder="Enter product name"
              />
            </div>

            {/* Product Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1 font-body">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body"
                placeholder="Enter product description"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1 font-body">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body"
              >
                <option value="Backpack">Backpack</option>
                <option value="Laptop Bag">Laptop Bag</option>
                <option value="Sling Bag">Sling Bag</option>
                <option value="Duffel Bag">Duffel Bag</option>
                <option value="Gym Bag">Gym Bag</option>
                <option value="Accessories">Accessories</option>
                <option value="Complementary Items">Complementary Items</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1 font-body">
                Price (₹) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body"
                placeholder="Enter price"
              />
            </div>

            {/* Offer Price */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1 font-body">
                Offer Price (₹) *
              </label>
              <input
                type="number"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                required
                min="0"
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body"
                placeholder="Enter offer price"
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1 font-body">
                WhatsApp Number *
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body"
                placeholder="Enter WhatsApp number with country code"
              />
            </div>

          </div>

          {/* Product Images */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2 font-body">
              Product Images *
            </label>
            <div className="flex flex-wrap gap-4 mb-4">
              {previewImages.map((image, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border border-stone-300 rounded-lg overflow-hidden shadow-soft"
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
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-stone-300 border-dashed rounded-lg cursor-pointer hover:bg-stone-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 text-stone-400 mb-1"
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
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                />
              </label>
            </div>
            <p className="text-sm text-stone-500 font-body">
              Upload up to 5 images. First image will be used as the product
              thumbnail.
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push("/seller/product-list")}
              className="px-6 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors font-body shadow-soft hover:shadow-hover"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-body shadow-soft hover:shadow-hover disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
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
  );
};

export default AddProduct;
