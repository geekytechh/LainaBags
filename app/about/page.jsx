"use client";

import Image from "next/image";
import React from "react";
import { Award, Users, Package, Clock, CheckCircle2, Sparkles } from "lucide-react";

const AboutPage = () => {
  const coreValues = [
    {
      title: "Premium Quality",
      description: "We source the finest materials and partner with skilled artisans to create exceptional products.",
      icon: Award,
    },
    {
      title: "Customer Satisfaction",
      description: "Your happiness is our priority. We strive to exceed expectations in every interaction.",
      icon: Users,
    },
    {
      title: "Affordable Pricing",
      description: "We offer high-quality products at reasonable prices so everyone can enjoy stylish bags.",
      icon: Package,
    },
    {
      title: "Timely Delivery",
      description: "We ensure our products reach you on time, every time.",
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V4h4V2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V4h4V2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-bold tracking-wider uppercase">
                Since 2007
              </span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
              About Laina Bags
            </h1>
            <div className="w-24 h-1.5 bg-white/30 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Established in 2007 in Mumbai, we are a premier manufacturer and
              wholesaler of high-quality bags, crafting elegance in every stitch.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-sky-50 to-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
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
                <div className="inline-block mb-4">
                  <span className="px-4 py-1.5 bg-sky-100 border border-sky-200 rounded-full text-xs font-bold tracking-wider text-sky-700 uppercase">
                Our Mission
              </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Crafting Excellence
                </h2>
                <div className="w-16 h-1 bg-sky-600 rounded-full mb-6"></div>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    At Laina Bags, our mission is to offer high-quality, stylish,
                    and durable bags that meet the diverse needs of our customers.
                    We are committed to delivering innovative products at affordable
                    prices, ensuring that everyone can enjoy premium value.
                  </p>
                  <p>
                    With a strong focus on customer satisfaction and timely service,
                    we aim to build lasting relationships and become a trusted brand
                    in every customer's journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-16 md:py-24 bg-gradient-to-b from-white to-sky-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block mb-4">
                <span className="px-4 py-1.5 bg-sky-100 border border-sky-200 rounded-full text-xs font-bold tracking-wider text-sky-700 uppercase">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                What Makes Us Different
              </h2>
              <div className="w-20 h-1 bg-sky-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="p-6 bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 rounded-xl bg-sky-100 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-sky-600" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-sky-600 to-sky-500 px-8 py-10 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                  Our Story
                </h2>
                <div className="w-20 h-1 bg-white/30 mx-auto rounded-full"></div>
              </div>
              
              <div className="p-8 md:p-12">
                <div className="space-y-6">
                  <div className="p-6 bg-sky-50 rounded-xl border-l-4 border-sky-600">
                    <p className="text-slate-700 leading-relaxed">
                      Established in the year 2007 at Mumbai, Maharashtra, we "Laina Bags" 
                      are a Sole Proprietorship based firm, engaged as the foremost Manufacturer 
                      and Wholesaler of Messenger Bags, Boys Backpack, and more.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-slate-200">
                    <p className="text-slate-700 leading-relaxed">
                      Our products are high in demand due to their premium quality and
                      affordable prices. Furthermore, we ensure to timely deliver
                      these products to our clients, through this we have gained a
                      huge clients base in the market.
                    </p>
                  </div>
                  <div className="p-6 bg-sky-50 rounded-xl border-l-4 border-sky-600">
                    <p className="text-slate-700 leading-relaxed">
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
    </div>
  );
};

export default AboutPage;
