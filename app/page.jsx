"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import HeaderSlider from "@/components/HeaderSlider";

// Dynamically import components that are below the fold
const HomeProducts = dynamic(() => import("@/components/HomeProducts"), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-200 rounded-xl mt-8"></div>,
});

const Banner = dynamic(() => import("@/components/Banner"), {
  loading: () => <div className="h-64 w-full animate-pulse bg-gray-200 rounded-xl mt-8"></div>,
});

const SearchBags = dynamic(() => import("@/components/InstagramReels"), {
  loading: () => <div className="h-[500px] w-full animate-pulse bg-gray-200 rounded-xl mt-8"></div>,
});

const Home = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="relative">
          <HeaderSlider />
          {/* Clean space beneath the slider */}
          <div className="h-6"></div>
        </div>
        <Suspense fallback={<div className="h-96 w-full animate-pulse bg-gray-200 rounded-xl mt-8"></div>}>
          <HomeProducts />
        </Suspense>
        <Suspense fallback={<div className="h-64 w-full animate-pulse bg-gray-200 rounded-xl mt-8"></div>}>
          <Banner />
        </Suspense>
        <Suspense fallback={<div className="h-[500px] w-full animate-pulse bg-gray-200 rounded-xl mt-8"></div>}>
          <SearchBags />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
