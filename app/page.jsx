"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";

// Dynamically import HomeProducts component
const HomeProducts = dynamic(() => import("@/components/HomeProducts"), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-200 rounded-xl mt-8"></div>,
});

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Width with Models */}
      <HeroSection />

      {/* Products Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Suspense fallback={<div className="h-96 w-full animate-pulse bg-gray-200 rounded-xl"></div>}>
          <HomeProducts />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
