"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import { MessageCircle, CheckCircle2, Package } from "lucide-react";

const Product = () => {
  const { id } = useParams();
  const { products, router } = useAppContext();
  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  useEffect(() => {
    if (products && products.length > 0) {
      fetchProductData();
    }
  }, [id, products]);

  if (!productData) return <Loading />;

  const discount = Math.round(
    ((productData.price - productData.offerPrice) / productData.price) * 100
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div>
              <div className="mb-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                <div className="relative aspect-square">
                  <Image
                    src={mainImage || productData.image[0]}
                    alt={productData.name}
                    fill
                    className="object-contain rounded-xl"
                    priority
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {productData.image.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      (mainImage || productData.image[0]) === image
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
              {/* Brand */}
              <div className="mb-3">
                <span className="px-3 py-1 bg-sky-100 border border-sky-200 rounded-full text-xs font-bold tracking-wider text-sky-700 uppercase">
                  Laina Bags
                </span>
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
                </span>
              </div>

              {/* Description */}
              <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-sky-600" />
                  Description
                </h3>
                <p className="text-slate-700 leading-relaxed">
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
    </div>
  );
};

export default Product;
