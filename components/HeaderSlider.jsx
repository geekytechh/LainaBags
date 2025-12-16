"use client";
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const HeaderSlider = () => {
  const router = useRouter();
  const sliderData = [
    {
      id: 1,
      title: "Elegance",
      subtitle: "Redefined",
      description: "Where luxury meets functionality in every meticulously crafted piece",
      buttonText: "Explore Collection",
      imgSrc: assets.product,
      bgGradient: "from-sky-50 to-sky-100",
    },
    {
      id: 2,
      title: "Timeless",
      subtitle: "Sophistication",
      description: "Crafted for the discerning professional who values quality",
      buttonText: "Discover More",
      imgSrc: assets.student,
      bgGradient: "from-slate-50 to-sky-50",
    },
    {
      id: 3,
      title: "Artisan",
      subtitle: "Craftsmanship",
      description: "Premium materials, uncompromising quality, exceptional design",
      buttonText: "Shop Now",
      imgSrc: assets.business,
      bgGradient: "from-sky-100 to-slate-50",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, sliderData.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 3000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 3000);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl shadow-lg border border-slate-200">
      {sliderData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ${
            currentSlide === index
              ? "opacity-100 z-10"
              : "opacity-0 z-0"
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`}></div>

          <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
                {/* Content */}
                <div className="text-slate-900 space-y-6">
                  <div className="inline-block">
                    <span className="px-4 py-1.5 bg-sky-100 border border-sky-200 rounded-full text-xs font-bold tracking-wider text-sky-700 uppercase">
                      Premium Collection
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                      <span className="block text-slate-900">{slide.title}</span>
                      <span className="block text-sky-600">{slide.subtitle}</span>
                    </h1>
                  </div>

                  <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      onClick={() => router.push("/all-products")}
                      className="group flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-sky-700 transition-all duration-300 hover:scale-105"
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a
                      href="https://wa.me/919326123535"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-105"
                    >
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Image */}
                <div className="relative hidden lg:block">
                  <div className="relative w-full h-[400px]">
                    <div className="absolute inset-0 bg-white/50 rounded-2xl border border-slate-200"></div>
                    <Image
                      src={slide.imgSrc}
                      alt={slide.title}
                      fill
                      className="object-contain object-center p-8 rounded-2xl"
                      sizes="(max-width: 1024px) 0vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full flex items-center justify-center text-slate-700 hover:text-sky-600 hover:bg-white transition-all duration-200 shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full flex items-center justify-center text-slate-700 hover:text-sky-600 hover:bg-white transition-all duration-200 shadow-lg"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsPlaying(false);
              setTimeout(() => setIsPlaying(true), 3000);
            }}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? "w-8 h-2 bg-sky-600"
                : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
