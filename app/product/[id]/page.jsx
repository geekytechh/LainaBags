"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import { MessageCircle, CheckCircle2, Package, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

const Product = () => {
  const { id } = useParams();
  const { products, router } = useAppContext();
  const [mainImage, setMainImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productData, setProductData] = useState(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  useEffect(() => {
    if (products && products.length > 0) {
      fetchProductData();
    }
  }, [id, products]);

  useEffect(() => {
    if (!productData) return;

    const handleKeyDown = (e) => {
      if (isZoomOpen) {
        if (e.key === 'Escape') {
          setIsZoomOpen(false);
        } else if (e.key === 'ArrowLeft') {
          handlePrevImage();
        } else if (e.key === 'ArrowRight') {
          handleNextImage();
        }
      } else {
        if (e.key === 'ArrowLeft') {
          handlePrevImage();
        } else if (e.key === 'ArrowRight') {
          handleNextImage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [productData, currentImageIndex, isZoomOpen]);

  // Reset image index when variant changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedVariant]);

  if (!productData) return <Loading />;

  const discount = Math.round(
    ((productData.price - productData.offerPrice) / productData.price) * 100
  );

  // Determine which images to display based on selected variant
  const displayImages = selectedVariant ? selectedVariant.images : productData.image;
  const hasMultipleImages = displayImages && displayImages.length > 1;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleZoomClick = () => {
    setIsZoomOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div>
              <div className="mb-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-lg relative group">
                <div className="relative aspect-square">
                  <Image
                    src={displayImages[currentImageIndex]}
                    alt={productData.name}
                    fill
                    className="object-contain rounded-xl cursor-zoom-in"
                    priority
                    onClick={handleZoomClick}
                  />

                  {/* Navigation Arrows */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-lg z-10"
                      >
                        <ChevronLeft className="w-6 h-6 text-slate-700" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-lg z-10"
                      >
                        <ChevronRight className="w-6 h-6 text-slate-700" />
                      </button>
                    </>
                  )}

                  {/* Zoom Icon */}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all">
                    <ZoomIn className="w-5 h-5 text-slate-700" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {displayImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${currentImageIndex === index
                      ? "border-sky-600 shadow-lg scale-105"
                      : "border-slate-200 hover:border-sky-300"
                      }`}
                  >
                    <Image
                      src={image}
                      alt={`${productData.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              {/* Color Variant Selector */}
              {productData.colorVariants && productData.colorVariants.length > 0 && (
                <div className="mb-6 p-5 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Select Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {/* Default/Main Color Button */}
                    <button
                      onClick={() => setSelectedVariant(null)}
                      className={`group flex flex-col items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${selectedVariant === null
                        ? 'border-purple-600 bg-white shadow-lg scale-105'
                        : 'border-slate-200 bg-white hover:border-purple-300 hover:scale-105'
                        }`}
                    >
                      <div className="relative">
                        <div
                          className="w-12 h-12 rounded-full border-2 border-slate-300 shadow-sm"
                          style={{
                            backgroundImage: `url(${productData.image[0]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        />
                        {selectedVariant === null && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <span className={`text-xs font-bold ${selectedVariant === null ? 'text-purple-900' : 'text-slate-700'
                        }`}>
                        Default
                      </span>
                    </button>

                    {/* Color Variant Buttons */}
                    {productData.colorVariants.map((variant, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedVariant(variant)}
                        className={`group flex flex-col items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${selectedVariant?.color === variant.color
                          ? 'border-purple-600 bg-white shadow-lg scale-105'
                          : 'border-slate-200 bg-white hover:border-purple-300 hover:scale-105'
                          }`}
                      >
                        <div className="relative">
                          <div
                            className="w-12 h-12 rounded-full border-2 border-slate-300 shadow-sm"
                            style={{
                              backgroundColor: variant.color.startsWith('#')
                                ? variant.color
                                : variant.color.toLowerCase()
                            }}
                          />
                          {selectedVariant?.color === variant.color && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <span className={`text-xs font-bold ${selectedVariant?.color === variant.color ? 'text-purple-900' : 'text-slate-700'
                          }`}>
                          {variant.color}
                        </span>
                      </button>
                    ))}
                  </div>
                  {selectedVariant && (
                    <p className="text-xs text-purple-700 font-bold mt-3 flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      Viewing {selectedVariant.color} variant
                    </p>
                  )}
                </div>
              )}

              {/* Brand */}
              <div className="mb-3 flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 bg-sky-100 border border-sky-200 rounded-full text-xs font-bold tracking-wider text-sky-700 uppercase">
                  Laina Bags
                </span>
                {productData.isBestseller && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1 shadow-md">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Bestseller
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
                {productData.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl md:text-4xl font-black text-sky-600">
                  ₹{productData.offerPrice}
                </span>
                {productData.price > productData.offerPrice && (
                  <>
                    <span className="text-xl line-through text-slate-400 font-medium">
                      ₹{productData.price}
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-black">
                      -{discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-sm font-bold text-slate-700">
                  <Package className="w-4 h-4" />
                  {productData.category}
                  {productData.subsection && ` - ${productData.subsection}`}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-sky-600" />
                  Description
                </h3>
                <p className="text-slate-700 leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>
                  {productData.description}
                </p>
              </div>

              {/* WhatsApp Order Button */}
              <button
                onClick={() => {
                  const message = `Hi, I'm interested in ${productData.name}. Could you provide more information?`;
                  const phoneNumber = productData.whatsappNumber || "+919326123535";
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, "_blank");
                }}
                className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-2xl font-black text-lg shadow-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 mb-6"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Order on WhatsApp</span>
              </button>

              {/* Product Info */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-black text-slate-900 mb-4">Product Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Brand</span>
                    <span className="text-sm font-bold text-slate-900">Laina Bags</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Category</span>
                    <span className="text-sm font-bold text-slate-900">{productData.category}</span>
                  </div>
                  {productData.colors && productData.colors.length > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Colors</span>
                      <div className="flex gap-2">
                        {productData.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-full border-2 border-slate-300 shadow-sm"
                            style={{
                              backgroundColor: color.startsWith('#') ? color : color.toLowerCase(),
                            }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Quality</span>
                    <span className="text-sm font-bold text-sky-600">Premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {products.filter((p) => p._id !== id && p.category === productData.category).length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-200">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
                  You May Also Like
                </h2>
                <div className="w-20 h-1 bg-sky-600 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products
                  .filter((p) => p._id !== id && p.category === productData.category)
                  .slice(0, 5)
                  .map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
              </div>

              <div className="text-center mt-10">
                <button
                  onClick={() => router.push("/all-products")}
                  className="px-8 py-3 bg-sky-600 text-white rounded-xl font-bold text-sm hover:bg-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View All Products
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {hasMultipleImages && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all z-10"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all z-10"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}

          <div className="relative max-w-5xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={productData.image[currentImageIndex]}
              alt={productData.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-bold">
            {currentImageIndex + 1} / {productData.image.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
