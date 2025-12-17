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
  const [subsection, setSubsection] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("+917045010589");
  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

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
        setSubsection(product.subsection || "");
        setPrice(product.price || "");
        setOfferPrice(product.offerPrice || "");
        setWhatsappNumber(product.whatsappNumber || "+917045010589");
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
    formData.append("subsection", subsection);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);
    formData.append("whatsappNumber", whatsappNumber);
    formData.append("colors", JSON.stringify(colors));

    files.forEach((file) => {
      formData.append("images", file);
    });

    // ⭐ ADD COLOR VARIANTS ⭐
    if (colorVariants.length > 0) {
      // Send variant metadata (color names)
      const variantsMetadata = colorVariants.map(v => ({ color: v.color }));
      formData.append('colorVariants', JSON.stringify(variantsMetadata));

      // Send variant files with color-specific keys
      colorVariants.forEach(variant => {
        variant.files.forEach(file => {
          formData.append(`variant_${variant.color}`, file);
        });
      });
    }

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
    setSubsection("");
    setPrice("");
    setOfferPrice("");
    setColors([]);
    setColorInput("");
  };

  const handleFileChange = async (e) => {
    const newFiles = Array.from(e.target.files);

    try {
      // Dynamically import the compression library
      const imageCompression = (await import('browser-image-compression')).default;

      // Compression options
      const options = {
        maxSizeMB: 0.8, // Max size per image (800KB)
        maxWidthOrHeight: 1920, // Max dimension
        useWebWorker: true,
        fileType: 'image/jpeg', // Convert to JPEG for better compression
      };

      // Show loading toast
      const loadingToast = toast.loading('Compressing images...');

      // Compress all images
      const compressedFiles = await Promise.all(
        newFiles.map(async (file) => {
          try {
            const compressedFile = await imageCompression(file, options);
            return compressedFile;
          } catch (error) {
            console.error('Error compressing image:', error);
            return file; // Use original if compression fails
          }
        })
      );

      toast.dismiss(loadingToast);
      toast.success(`${compressedFiles.length} image(s) compressed successfully!`);

      // Create previews
      const newPreviews = compressedFiles.map((file) => URL.createObjectURL(file));

      setFiles((prev) => [...prev, ...compressedFiles]);
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    } catch (error) {
      console.error('Error in handleFileChange:', error);
      toast.error('Error processing images');
    }
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

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newPreviews = [...previewImages];
    const draggedPreview = newPreviews[draggedIndex];
    newPreviews.splice(draggedIndex, 1);
    newPreviews.splice(dropIndex, 0, draggedPreview);

    // Also reorder files array if dealing with blob URLs
    const newFiles = [...files];
    const draggedIsBlob = previewImages[draggedIndex].startsWith("blob:");
    const dropIsBlob = previewImages[dropIndex].startsWith("blob:");

    if (draggedIsBlob && dropIsBlob) {
      const draggedBlobIndex = previewImages
        .slice(0, draggedIndex)
        .filter((url) => url.startsWith("blob:")).length;
      const dropBlobIndex = previewImages
        .slice(0, dropIndex)
        .filter((url) => url.startsWith("blob:")).length;

      const draggedFile = newFiles[draggedBlobIndex];
      newFiles.splice(draggedBlobIndex, 1);
      newFiles.splice(dropBlobIndex, 0, draggedFile);
      setFiles(newFiles);
    }

    setPreviewImages(newPreviews);
    setDraggedIndex(null);
  };

  // Color Variant Functions
  const handleVariantFileChange = async (e) => {
    const newFiles = Array.from(e.target.files);

    try {
      const imageCompression = (await import('browser-image-compression')).default;
      const options = {
        maxSizeMB: 0.5, // Reduced from 0.8 to prevent 413 errors
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/jpeg',
      };

      const loadingToast = toast.loading('Compressing images...');
      const compressedFiles = await Promise.all(
        newFiles.map(async (file) => {
          try {
            return await imageCompression(file, options);
          } catch (error) {
            console.error('Error compressing image:', error);
            return file;
          }
        })
      );

      toast.dismiss(loadingToast);
      toast.success(`${compressedFiles.length} image(s) compressed successfully!`);

      const newPreviews = compressedFiles.map((file) => URL.createObjectURL(file));
      setCurrentVariantFiles((prev) => [...prev, ...compressedFiles]);
      setCurrentVariantPreviews((prev) => [...prev, ...newPreviews]);
    } catch (error) {
      console.error('Error in handleVariantFileChange:', error);
      toast.error('Error processing images');
    }
  };

  const removeVariantImage = (index) => {
    const newFiles = [...currentVariantFiles];
    const newPreviews = [...currentVariantPreviews];

    URL.revokeObjectURL(newPreviews[index]);
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setCurrentVariantFiles(newFiles);
    setCurrentVariantPreviews(newPreviews);
  };

  const addColorVariant = () => {
    if (!currentVariantColor) {
      toast.error('Please select a color');
      return;
    }
    if (currentVariantFiles.length === 0) {
      toast.error('Please upload at least one image for this color variant');
      return;
    }

    // Check if color already exists
    if (colorVariants.some(v => v.color === currentVariantColor)) {
      toast.error(`${currentVariantColor} variant already exists`);
      return;
    }

    const newVariant = {
      color: currentVariantColor,
      files: currentVariantFiles,
      previews: currentVariantPreviews,
    };

    setColorVariants([...colorVariants, newVariant]);
    setCurrentVariantColor("");
    setCurrentVariantFiles([]);
    setCurrentVariantPreviews([]);
    toast.success(`${currentVariantColor} variant added!`);
  };

  const removeColorVariant = (color) => {
    const variant = colorVariants.find(v => v.color === color);
    if (variant) {
      variant.previews.forEach(preview => URL.revokeObjectURL(preview));
    }
    setColorVariants(colorVariants.filter(v => v.color !== color));
    toast.success(`${color} variant removed`);
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

              {/* Subsection (only for Accessories) */}
              {category === "Accessories" && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Subsection *
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select
                      value={subsection}
                      onChange={(e) => setSubsection(e.target.value)}
                      required={category === "Accessories"}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 appearance-none bg-white"
                    >
                      <option value="">Select Subsection</option>
                      <option value="Keychains">Keychains</option>
                      <option value="Wallets">Wallets</option>
                      <option value="Pouches">Pouches</option>
                      <option value="Straps">Straps</option>
                      <option value="Card Holders">Card Holders</option>
                      <option value="Organizers">Organizers</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              )}

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

            {/* Main Product Images */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Main Product Images *
              </label>
              <p className="text-sm text-slate-500 mb-3">
                Upload images for the default/first color variant
              </p>
              <div className="flex flex-wrap gap-4 mb-4">
                {previewImages.map((image, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`relative w-24 h-24 border-2 rounded-xl overflow-hidden shadow-lg group cursor-move transition-all ${draggedIndex === index
                      ? "opacity-50 scale-95 border-blue-500"
                      : "border-slate-200 hover:border-blue-400"
                      }`}
                  >
                    <Image
                      src={image}
                      alt={`Preview ${index}`}
                      fill
                      className="object-cover pointer-events-none"
                    />
                    {index === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-xs font-bold text-center py-1">
                        Main
                      </div>
                    )}
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
                Upload up to 5 images. First image will be used as the product thumbnail. Drag images to reorder.
              </p>
            </div>

            {/* Color Variants Section */}
            <div className="md:col-span-2 mt-8 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200">
              <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
                <Package className="w-6 h-6 text-purple-600" />
                Color Variants (Optional)
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Add different color variants with their own images. Customers can switch between colors on the product page.
              </p>

              {/* Add New Variant Form */}
              <div className="bg-white p-6 rounded-xl border border-purple-200 mb-6">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Add Color Variant</h4>

                {/* Color Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Select Color
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {[
                      { name: 'Black', value: '#000000' },
                      { name: 'White', value: '#FFFFFF' },
                      { name: 'Red', value: '#DC2626' },
                      { name: 'Blue', value: '#2563EB' },
                      { name: 'Green', value: '#16A34A' },
                      { name: 'Yellow', value: '#EAB308' },
                      { name: 'Orange', value: '#EA580C' },
                      { name: 'Purple', value: '#9333EA' },
                      { name: 'Pink', value: '#EC4899' },
                      { name: 'Brown', value: '#92400E' },
                      { name: 'Gray', value: '#6B7280' },
                      { name: 'Navy', value: '#1E3A8A' },
                    ].map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setCurrentVariantColor(color.name)}
                        className={`flex flex-col items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${currentVariantColor === color.name
                          ? 'border-purple-600 bg-purple-50 shadow-lg'
                          : 'border-slate-200 bg-white hover:border-purple-300'
                          }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full border-2 border-slate-300 shadow-sm"
                          style={{ backgroundColor: color.value }}
                        />
                        <span className="text-xs font-bold text-slate-700">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload Images for Variant */}
                {currentVariantColor && (
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Upload Images for {currentVariantColor}
                    </label>
                    <div className="flex flex-wrap gap-4 mb-3">
                      {currentVariantPreviews.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-20 h-20 border-2 border-purple-200 rounded-lg overflow-hidden shadow-md group"
                        >
                          <Image
                            src={image}
                            alt={`${currentVariantColor} ${index}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeVariantImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-lg p-1 hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <label className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer hover:bg-purple-50 hover:border-purple-400 transition-all">
                        <Upload className="w-5 h-5 text-purple-400 mb-1" />
                        <span className="text-xs font-bold text-purple-600">Add</span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleVariantFileChange}
                          accept="image/*"
                          multiple
                        />
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={addColorVariant}
                      className="px-6 py-2.5 bg-purple-600 text-white rounded-lg font-bold text-sm hover:bg-purple-700 transition-all shadow-lg"
                    >
                      Add {currentVariantColor} Variant
                    </button>
                  </div>
                )}
              </div>

              {/* Display Added Variants */}
              {colorVariants.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-4">Added Color Variants ({colorVariants.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {colorVariants.map((variant) => (
                      <div
                        key={variant.color}
                        className="bg-white p-4 rounded-xl border border-purple-200 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-full border-2 border-slate-300 shadow-sm"
                              style={{
                                backgroundColor: variant.color.startsWith('#')
                                  ? variant.color
                                  : variant.color.toLowerCase()
                              }}
                            />
                            <div>
                              <h5 className="font-bold text-slate-900">{variant.color}</h5>
                              <p className="text-xs text-slate-500">{variant.previews.length} images</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeColorVariant(variant.color)}
                            className="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200 transition-all"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="flex gap-2 overflow-x-auto">
                          {variant.previews.slice(0, 4).map((img, idx) => (
                            <div key={idx} className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200">
                              <Image src={img} alt={`${variant.color} ${idx}`} fill className="object-cover" />
                            </div>
                          ))}
                          {variant.previews.length > 4 && (
                            <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                              <span className="text-xs font-bold text-slate-600">+{variant.previews.length - 4}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
