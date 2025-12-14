import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Banner = () => {
  const router = useRouter();

  return (
    <section className="overflow-hidden relative px-4 py-24 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 rounded-2xl border border-blue-500 shadow-xl sm:px-6 lg:px-8">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b to-transparent from-blue-500/30"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl bg-blue-400/30"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl bg-blue-300/30"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/noise.svg')] opacity-30"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 justify-between items-center md:flex-row md:gap-16">
          {/* Left Content - Brand Info */}
          <div className="space-y-6 text-center sm:space-y-8 md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex gap-3 items-center sm:gap-4">
                <div className="flex overflow-hidden justify-center items-center w-14 h-14 rounded-full shadow-lg transition-transform duration-300 transform sm:h-16 sm:w-16 hover:rotate-12">
                  <Image
                    src="/images/search.png"
                    alt="SearchBag Logo"
                    width={40}
                    height={40}
                    className="object-cover rounded-full"
                    style={{ background: 'transparent' }}
                  />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl">
                  SEARCH BAG
                </h1>
              </div>
              <p className="px-4 py-1 mt-2 text-sm italic text-blue-100 rounded-full border shadow-md sm:text-base font-body bg-blue-900/30 border-blue-400/30">Since 2007</p>
            </div>

            <div className="p-4 space-y-2 rounded-xl border shadow-md backdrop-blur-sm sm:space-y-3 bg-blue-900/30 border-blue-400/30">
              <p className="text-base font-medium text-blue-100 sm:text-lg font-body">
                Manufacturer & Wholesaler
              </p>
              <p className="text-lg font-semibold text-white drop-shadow-sm sm:text-xl font-heading">
                Soft Luggage Experts
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center text-xs text-blue-100 md:justify-start sm:text-sm font-body">
              {
                ["Laptop Bags", "College Bags", "School Bags", "Luggage", "Traveling Bags",].map((item, index) => (
                  <span
                    key={index}
                    className="bg-blue-900/40 border border-blue-400/30 px-3 sm:px-4 py-1.5 rounded-full shadow-md hover:bg-blue-800/60 hover:border-blue-300/50 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {item}
                  </span>
                ))
              }
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="p-4 mt-6 space-y-4 text-center rounded-2xl border shadow-lg backdrop-blur-sm sm:space-y-6 md:text-right md:mt-0 bg-blue-900/30 sm:p-5 border-blue-400/30">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col md:items-end">
                <div className="inline-flex items-center gap-2 bg-blue-200/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md border border-blue-300/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-blue-200 animate-pulse sm:h-5 sm:w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-base font-medium text-blue-100 sm:text-lg font-body">
                    Bulk Deals · Huge Variety · Best Industry Prices
                  </p>
                </div>
              </div>
              <p className="text-lg font-semibold text-white drop-shadow-sm sm:text-xl font-heading">
                Specialist in Complementary Items
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3 md:items-end sm:space-y-4">
              <button
                onClick={() => router.push("/all-products")}
                className="relative px-6 py-2 text-base font-medium text-blue-800 bg-gradient-to-r from-blue-300 to-blue-100 rounded-full shadow-xl transition-all duration-300 transform hover:from-blue-200 hover:to-white sm:px-8 sm:py-3 sm:text-lg hover:shadow-2xl group font-body hover:-translate-y-1"
              >
                <span className="relative z-10 mr-2">Explore Products</span>
              </button>
              <div className="flex gap-2 items-center mt-2 sm:gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-blue-200 sm:h-5 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <p className="text-sm font-medium text-blue-100 transition-colors sm:text-base hover:text-white font-body">
                  www.searchbag.in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
