"use client";
import React, { useState, useEffect, useRef } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const preloadImages = (imageSources) => {
  if (typeof window !== "undefined") {
    imageSources.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }
};

const HeaderSlider = () => {
  const router = useRouter();
  const sliderData = [
    {
      id: 1,
      title: "LUXURY TRAVEL COMPANIONS",
      subtitle: "Elevate Your Journey with Premium Travel Bags",
      offer: "NEW COLLECTION",
      buttonText1: "SHOP NOW",
      buttonText2: "LEARN MORE",
      imgSrc: assets.product,
      bgColor: "bg-gradient-to-r from-blue-800 to-blue-900",
      textColor: "text-stone-100",
      accentColor: "text-blue-300",
      graphicColor: "bg-blue-400",
    },
    {
      id: 2,
      title: "STUDENT ESSENTIAL SERIES",
      subtitle: "Smart Design Meets Ultimate Durability",
      offer: "BACK TO SCHOOL",
      buttonText1: "EXPLORE COLLECTION",
      buttonText2: "VIEW DETAILS",
      imgSrc: assets.student,
      bgColor: "bg-gradient-to-r from-blue-700 to-blue-800",
      textColor: "text-stone-100",
      accentColor: "text-blue-200",
      graphicColor: "bg-blue-300",
    },
    {
      id: 3,
      title: "BUSINESS & PROFESSIONAL",
      subtitle: "Sophisticated Bags for the Modern Professional",
      offer: "PREMIUM LEATHER",
      buttonText1: "DISCOVER NOW",
      buttonText2: "CONTACT US",
      imgSrc: assets.business,
      bgColor: "bg-gradient-to-r from-blue-900 to-blue-800",
      textColor: "text-stone-100",
      accentColor: "text-blue-400",
      graphicColor: "bg-blue-500",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    preloadImages(sliderData.map((slide) => slide.imgSrc));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  // Touch Handlers (Mobile)
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e) => {
    if (touchStart === null) return;
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) {
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }
    const distance = touchStart - touchEnd;
    const threshold = 50;

    if (distance > threshold) {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    } else if (distance < -threshold) {
      setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mouse Handlers (Desktop drag)
  const handleMouseDown = (e) => {
    e.preventDefault();
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || touchStart === null) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    if (touchStart === null || touchEnd === null) {
      setTouchStart(null);
      setTouchEnd(null);
      setIsDragging(false);
      return;
    }
    const distance = touchStart - touchEnd;
    const threshold = 50;

    if (distance > threshold) {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    } else if (distance < -threshold) {
      setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
  };

  return (
    <div
      className="relative overflow-hidden w-full md:max-w-full mx-auto rounded-2xl shadow-lg h-[550px] cursor-grab active:cursor-grabbing bg-gradient-to-b from-stone-50 to-stone-100"
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {sliderData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 ${
            slide.bgColor
          } flex flex-col md:flex-row items-center justify-between px-4 md:px-16 lg:px-24 py-6 ${
            slide.textColor
          } transition-opacity duration-700 ${
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div
              className={`absolute top-8 left-8 w-16 h-16 rounded-full ${slide.graphicColor} blur-xl animate-pulse`}
            />
            <div
              className={`absolute bottom-16 right-16 w-14 h-14 rounded-full ${slide.graphicColor} blur-lg animate-pulse`}
            />
            <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-[#ffffff40] rounded-full backdrop-blur-sm animate-spin-slow"></div>
            <div className="absolute bottom-1/4 left-1/4 w-12 h-12 border border-[#ffffff30] rounded-full backdrop-blur-sm animate-bounce animation-delay-2000"></div>
          </div>

          {/* Left Text Content */}
          <div className="z-10 px-2 mt-6 mb-4 space-y-3 w-full text-center md:space-y-3 md:w-3/4 md:text-left md:mt-0 md:mb-0">
            <p className="bg-white/15 backdrop-blur-md border border-white/30 inline-block px-5 py-1.5 rounded-full text-xs font-medium tracking-[0.2em] font-body shadow-lg">
              {slide.offer}
            </p>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight leading-snug drop-shadow-md md:text-5xl lg:text-6xl font-heading">
              {slide.title.split(" ").map((word, i) => (
                <React.Fragment key={i}>
                  {i === 1 ? (
                    <span className={`${slide.accentColor} font-bold`}>
                      {word}{" "}
                    </span>
                  ) : (
                    `${word} `
                  )}
                </React.Fragment>
              ))}
            </h1>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed opacity-90 md:mx-0 md:text-xl lg:text-2xl font-body">
              {slide.subtitle}
            </p>
            
      
            
            <div className="flex justify-center pt-4 md:justify-start">
              <button
                onClick={() => router.push("/all-products")}
                className="px-6 py-2 w-full text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-xl transition-all duration-300 transform hover:from-blue-400 hover:to-blue-300 text-stone-100 md:px-8 md:py-3 md:text-base hover:shadow-2xl hover:-translate-y-1 font-body sm:w-auto"
              >
                {slide.buttonText1}
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex z-10 justify-center items-end pb-6 w-full md:w-3/5 md:pb-8">
            <div className="relative w-full max-w-[90%] sm:max-w-[320px] md:max-w-[520px] h-[220px] sm:h-[260px] md:h-[380px] transform transition-all duration-700 hover:scale-105">
              <div className="absolute -inset-4 bg-gradient-to-r to-transparent rounded-full opacity-70 blur-xl animate-pulse from-white/10"></div>
              <Image
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                fill
                className="object-contain object-bottom filter brightness-110 drop-shadow-2xl"
                sizes="(max-width: 768px) 90vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="flex absolute right-0 left-0 bottom-4 z-20 gap-2 justify-center">
        {sliderData.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              currentSlide === index
                ? "bg-blue-400 scale-125 shadow-lg shadow-blue-400/50"
                : "bg-white/40"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1} indicator`}
            role="button"
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;