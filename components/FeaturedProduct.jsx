import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const FeaturedProduct = () => {
  const router = useRouter();

  const products = [
    {
      id: 1,
      image: assets.product,
      title: "Professional",
      subtitle: "Series",
      description: "Sophisticated laptop bags for modern professionals",
      badge: "NEW",
    },
    {
      id: 2,
      image: assets.student,
      title: "Urban",
      subtitle: "Explorer",
      description: "Versatile backpacks for style and everyday adventures",
      badge: "POPULAR",
    },
    {
      id: 3,
      image: assets.business,
      title: "Minimalist",
      subtitle: "Essential",
      description: "Elegant sling bags blending functionality with design",
      badge: "TRENDING",
    },
  ];

  return (
    <section className="relative py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-sky-100 border border-sky-200 rounded-full text-xs font-bold tracking-wider text-sky-700 uppercase">
              Signature Collections
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            <span className="text-slate-900">Featured</span>{" "}
            <span className="text-sky-600">Collections</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 leading-relaxed">
            Handpicked collections that embody our commitment to excellence
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase shadow-lg ${
                  product.badge === "NEW" 
                    ? "bg-sky-600 text-white"
                    : product.badge === "POPULAR"
                    ? "bg-amber-500 text-white"
                    : "bg-purple-600 text-white"
                }`}>
                  {product.badge}
                </span>
              </div>

              {/* Image */}
              <div className="relative h-64 bg-gradient-to-br from-slate-50 to-sky-50 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain object-center p-6 transition-transform duration-700 group-hover:scale-110"
                  quality={95}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-2xl font-black text-slate-900 mb-1">
                    {product.title}
                  </h3>
                  <h4 className="text-xl font-bold text-sky-600">
                    {product.subtitle}
                  </h4>
                </div>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {product.description}
                </p>

                <button
                  onClick={() => router.push("/all-products")}
                  className="group flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white rounded-xl font-bold text-sm hover:bg-sky-700 transition-all duration-300"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
