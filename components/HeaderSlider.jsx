"use client";
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";

const HeaderSlider = () => {
  const router = useRouter();
  const sliderData = [
    {
      id: 1,
      title: "Style Meets",
      subtitle: "Functionality",
      description: "Discover bags that complement your lifestyle with premium craftsmanship",
      buttonText: "Shop Now",
      imgSrc: assets.product,
      bgGradient: "from-blue-50 via-slate-50 to-blue-50",
    },
    {
      id: 2,
      title: "Built for",
      subtitle: "Professionals",
      description: "Sophisticated designs for those who demand excellence in every detail",
      buttonText: "View Collection",
      imgSrc: assets.student,
      bgGradient: "from-slate-50 via-blue-50 to-slate-50",
    },
    {
      id: 3,
      title: "Quality You",
      subtitle: "Can Trust",
      description: "15+ years of expertise in creating durable, stylish bags",
      buttonText: "Explore More",
      imgSrc: assets.business,
      bgGradient: "from-blue-50 via-slate-50 to-blue-50",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Fixed: Now goes 0→1→2→0 (1→2→3 for user)
          setCurrentSlide((current) => (current + 1) % sliderData.length);
          return 0;
        }
        return prev + 0.5;
      });
    }, 25);

    return () => clearInterval(progressInterval);
  }, [isPlaying, sliderData.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 3000);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-slate-50">
      {sliderData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${currentSlide === index ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
            }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`}></div>

          {/* Subtle Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
                {/* Text Content */}
                <div className="text-slate-900 space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Laina Bags</span>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                      <span className="block text-slate-900">{slide.title}</span>
                      <span className="block bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                        {slide.subtitle}
                      </span>
                    </h1>
                  </div>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => router.push("/all-products")}
                      className="group px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a
                      href="https://wa.me/917045010589"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all hover:scale-105 text-center"
                    >
                      Order on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Image */}
                <div className="relative hidden lg:block">
                  <div className="relative w-full h-[450px]">
                    <div className="absolute inset-0 bg-white/60 rounded-2xl border border-slate-200 shadow-xl"></div>
                    <div className="absolute inset-0 p-10">
                      <Image
                        src={slide.imgSrc}
                        alt={slide.title}
                        fill
                        className="object-contain drop-shadow-lg"
                        sizes="(max-width: 1024px) 0vw, 50vw"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {sliderData.map((_, index) => (
          <button key={index} onClick={() => goToSlide(index)} className="group relative">
            <div className={`w-12 h-1 rounded-full transition-all ${currentSlide === index ? "bg-blue-200" : "bg-slate-300 hover:bg-slate-400"
              }`}></div>
            {currentSlide === index && (
              <div
                className="absolute top-0 left-0 h-1 bg-blue-600 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 z-20 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full shadow-sm">
        <span className="text-xs font-bold text-blue-700">
          {String(currentSlide + 1).padStart(2, '0')} / {String(sliderData.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default HeaderSlider;
