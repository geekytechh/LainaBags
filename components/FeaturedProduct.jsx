import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    image: assets.header_macbook_image,
    title: "laptop bag",
    displayTitle: "LAPTOP BAGS",
    description: "Premium laptop bags for professionals and students.",
  },
  {
    id: 2,
    image: assets.boy_with_laptop_image,
    title: "backpack",
    displayTitle: "BACKPACKS",
    description: "Stylish and functional backpacks for everyday use.",
  },
  {
    id: 3,
    image: assets.header_headphone_image,
    title: "sling bag",
    displayTitle: "SLING BAGS",
    description: "Compact and trendy sling bags for the modern lifestyle.",
  },
];

const FeaturedProduct = () => {
  const router = useRouter();

  return (
    <section className="px-4 py-24 bg-gradient-to-b from-white to-blue-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-4 py-1.5 rounded-full mb-4 shadow-sm">PREMIUM QUALITY</span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl text-stone-900 font-heading">
            FEATURED COLLECTIONS
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mb-6"></div>
          <p className="max-w-2xl text-lg leading-relaxed text-stone-600 font-body">
            Discover our most popular and trending bag collections, meticulously
            crafted for style, durability, and everyday functionality.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {products.map(({ id, image, title, description }, index) => {
            // Different accent colors for each card - all in blue shades
            const accentColors = [
              "from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300",
              "from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400",
              "from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500"
            ];
            
            return (
              <div
                key={id}
                className="overflow-hidden relative rounded-2xl border shadow-xl transition-all duration-500 transform group hover:shadow-2xl border-stone-100 hover:-translate-y-2"
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 z-10 w-24 h-24 bg-gradient-to-bl to-transparent from-white/20"></div>
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full backdrop-blur-md bg-white/30"></div>
                
                <div className="overflow-hidden relative h-96">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t to-transparent opacity-80 transition-opacity duration-300 from-black/80 via-black/40 group-hover:opacity-70"></div>
                </div>
                
                <div className="absolute right-0 bottom-0 left-0 p-8 text-white">
                  <h3 className="mb-3 text-2xl font-bold tracking-wide transition-colors duration-300 font-heading group-hover:text-blue-300">{displayTitle}</h3>
                  <p className="mb-6 text-white/90 font-body">{description}</p>
                  <button 
                    onClick={() => router.push('/all-products')}
                    className={`px-6 py-3 text-sm font-medium text-white bg-gradient-to-r rounded-full shadow-lg opacity-0 transition-all duration-300 transform translate-y-4 ${accentColors[index]} hover:shadow-xl group-hover:translate-y-0 group-hover:opacity-100`}
                  >
                    Explore Collection
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
