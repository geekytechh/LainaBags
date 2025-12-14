"use client";

import Image from "next/image";
import React from "react";
const AboutPage = () => {
  const coreValues = [
    {
      title: "PREMIUM QUALITY",
      description:
        "We source the finest materials and partner with skilled artisans to create exceptional products.",
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "CUSTOMER SATISFACTION",
      description:
        "Your happiness is our priority. We strive to exceed expectations in every interaction.",
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "AFFORDABLE PRICING",
      description:
        "We offer high-quality products at reasonable prices so everyone can enjoy stylish bags.",
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "TIMELY DELIVERY",
      description: "We ensure our products reach you on time, every time.",
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="overflow-hidden relative py-16 bg-gradient-to-r from-blue-900 to-blue-700 sm:py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl bg-blue-500/20"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl bg-blue-300/30"></div>
        <div className="container relative px-4 mx-auto sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-white drop-shadow-md sm:text-4xl md:text-5xl font-heading sm:mb-6">
              ABOUT SEARCH BAG
            </h1>
            <p className="px-2 py-3 mx-auto max-w-2xl text-base leading-relaxed text-blue-100 rounded-lg border shadow-lg backdrop-blur-sm sm:text-lg font-body bg-blue-900/10 border-blue-200/20">
              Established in 2007 in Mumbai, we are a premier manufacturer and
              wholesaler of high-quality bags.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-12 sm:py-16 md:py-20">
        <div className="container px-4 mx-auto sm:px-6">
          <div className="flex flex-col gap-8 items-center lg:flex-row sm:gap-12">
            <div className="order-2 mb-8 w-full lg:w-1/2 lg:mb-0 lg:order-1">
              <div className="overflow-hidden relative h-96 bg-blue-100 rounded-2xl shadow-xl sm:h-[400px] lg:h-[500px]">
                <Image
                  src="/aboutt.png"
                  alt="About Search Bag"
                  fill
                  className="object-contain rounded-2xl"
                  priority
                />
        
              </div>
            </div>
            <div className="order-1 p-8 w-full bg-white rounded-2xl border border-blue-100 shadow-lg lg:w-1/2 lg:order-2">
              <h2 className="mb-4 text-2xl font-bold text-blue-900 sm:text-3xl font-heading sm:mb-6">
                OUR MISSION
              </h2>
              <div className="mb-6 w-16 h-1 bg-blue-600 sm:w-20 sm:mb-8"></div>
              <p className="mb-4 text-sm leading-relaxed text-gray-700 sm:text-base font-body sm:mb-6">
                At Search Bag, our mission is to offer high-quality, stylish,
                and durable bags that meet the diverse needs of our customers.
                We are committed to delivering innovative products at affordable
                prices, ensuring that everyone can enjoy premium value.
              </p>
              <p className="text-sm leading-relaxed text-gray-700 sm:text-base font-body">
                With a strong focus on customer satisfaction and timely service,
                we aim to build lasting relationships and become a trusted brand
                in every customer's journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-12 bg-gradient-to-b from-white to-blue-50 sm:py-16 md:py-20">
        <div className="container px-4 mx-auto sm:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-16">
            <h2 className="mb-4 text-2xl font-bold text-blue-900 sm:text-3xl font-heading">
              WHY CHOOSE US
            </h2>
            <div className="mx-auto mb-6 w-20 h-1 bg-blue-600 sm:mb-8"></div>
            <p className="inline-block px-6 py-2 text-sm text-blue-800 rounded-full border border-blue-200 shadow-sm font-body sm:text-base bg-blue-100/50">
              What makes Search Bag stand out from the competition
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl border border-blue-100 shadow-lg transition-all duration-300 transform sm:p-8 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300"
              >
                <div className="flex justify-center items-center mb-4 w-12 h-12 bg-blue-100 rounded-full shadow-md sm:w-14 sm:h-14 sm:mb-6">
                  <div className="text-blue-600">
                    {React.cloneElement(value.icon, { className: 'w-6 h-6 sm:w-7 sm:h-7 text-blue-600' })}
                  </div>
                </div>
                <h3 className="mb-2 text-base font-semibold text-blue-900 sm:text-lg font-heading sm:mb-3">
                  {value.title}
                </h3>
                <p className="text-xs text-gray-600 font-body sm:text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="py-12 sm:py-16 md:py-20">
        <div className="container px-4 mx-auto sm:px-6">
          <div className="overflow-hidden mx-auto max-w-4xl bg-white rounded-2xl border border-blue-100 shadow-xl">
            <div className="px-6 py-8 bg-gradient-to-r from-blue-800 to-blue-600 sm:px-10">
              <h2 className="mb-4 text-2xl font-bold text-center text-white drop-shadow-md sm:text-3xl font-heading sm:mb-6">
                OUR STORY
              </h2>
              <div className="mx-auto w-16 h-1 bg-blue-200 sm:w-20"></div>
            </div>
            
            <div className="p-6 sm:p-10">
              <div className="relative z-10">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-70 blur-2xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-50 rounded-full opacity-70 blur-2xl"></div>
                
                <div className="relative space-y-4 text-sm text-gray-700 sm:text-base font-body sm:space-y-6">
                  <p className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 shadow-md">
                    Established in the year 2007 at Mumbai, Maharashtra, we "Search
                    Bag" are a Sole Proprietorship based firm, engaged as the
                    foremost Manufacturer and Wholesaler of Messenger Bags, Boys
                    Backpack, and more.
                  </p>
                  <p className="p-4 bg-gradient-to-r from-white to-blue-50 rounded-lg border border-blue-100 shadow-md">
                    Our products are high in demand due to their premium quality and
                    affordable prices. Furthermore, we ensure to timely deliver
                    these products to our clients, through this we have gained a
                    huge clients base in the market.
                  </p>
                  <p className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 shadow-md">
                    From humble beginnings in Mumbai's bustling bag market, we've
                    grown to become a trusted name in the industry, known for our
                    commitment to quality and customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
