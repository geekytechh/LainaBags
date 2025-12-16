"use client";

import Image from "next/image";
import React from "react";
import { Award, Users, Package, Clock, Sparkles, ShoppingBag } from "lucide-react";

const AboutPage = () => {
  const coreValues = [
    {
      title: "Premium Quality",
      description: "Finest materials and skilled craftsmanship in every bag",
      icon: Award,
    },
    {
      title: "Customer First",
      description: "Your satisfaction is our top priority",
      icon: Users,
    },
    {
      title: "Fair Pricing",
      description: "Competitive wholesale and retail prices",
      icon: Package,
    },
    {
      title: "On-Time Delivery",
      description: "Reliable service you can count on",
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Graphics */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        {/* Animated Background Graphics */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E")`
        }}></div>

        {/* Floating Bag Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <ShoppingBag className="absolute top-20 left-10 w-16 h-16 rotate-12 animate-float" />
          <ShoppingBag className="absolute top-40 right-20 w-12 h-12 -rotate-12 animate-float" style={{ animationDelay: '1s' }} />
          <ShoppingBag className="absolute bottom-32 left-1/4 w-14 h-14 rotate-6 animate-float" style={{ animationDelay: '2s' }} />
          <ShoppingBag className="absolute bottom-20 right-1/3 w-10 h-10 -rotate-6 animate-float" style={{ animationDelay: '1.5s' }} />
        </div>



        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wide">Since 2010</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
              About Laina Bags
            </h1>
            <div className="w-20 h-1 bg-white/40 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Mumbai's trusted bag manufacturer since 2010, delivering quality and value
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section with Graphics */}
      <div className="relative py-16 md:py-20 overflow-hidden">
        {/* Background Graphics */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative h-96 md:h-[480px] bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xl">
                  <Image
                    src="/aboutt.png"
                    alt="About Laina Bags"
                    fill
                    className="object-contain p-8"
                    priority
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Our Story</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                  Quality Bags, <span className="text-blue-600">Trusted Service</span>
                </h2>
                <div className="w-16 h-1 bg-blue-600 rounded-full mb-6"></div>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    Founded in 2010 in Mumbai, Laina Bags has grown from a small operation
                    to one of the city's most trusted bag manufacturers. We specialize in
                    premium soft luggage for wholesale and retail customers.
                  </p>
                  <p>
                    With over 15 years of experience, we've served 50,000+ satisfied customers
                    by combining traditional craftsmanship with competitive pricing and reliable delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values with Graphics */}
      <div className="relative py-16 md:py-20 bg-slate-50 overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='2' fill='%233B82F6'/%3E%3C/svg%3E")`
        }}></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Why Choose Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
                What Sets Us Apart
              </h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="p-6 bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
