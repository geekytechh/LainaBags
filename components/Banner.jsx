import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Award, Users, Package, TrendingUp, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

const Banner = () => {
  const router = useRouter();

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Package, value: "15+", label: "Years Experience" },
    { icon: TrendingUp, value: "100+", label: "Premium Products" },
  ];

  const features = [
    "Premium Quality Materials",
    "Expert Craftsmanship",
    "Free Shipping Above ₹2000",
    "24/7 Customer Support",
  ];

  return (
    <section className="relative py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-1.5 bg-sky-100 border border-sky-200 rounded-full text-xs font-bold tracking-wider text-sky-700 uppercase">
                Since 2007
              </span>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
                <span className="text-slate-900">Premium Bags</span>
                <br />
                <span className="text-sky-600">Crafted with Excellence</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                Manufacturer & Wholesaler specializing in premium soft luggage. 
                Your trusted partner for quality bags since 2007.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-sky-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-slate-700 font-medium text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-sky-100 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-sky-600" />
                  </div>
                  <div className="text-xl font-black text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-xs font-medium text-slate-600 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => router.push("/all-products")}
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-sky-700 transition-all duration-300 hover:scale-105"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://wa.me/919326123535"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-slate-50"></div>
              <div className="relative aspect-square bg-white p-12">
                <Image
                  src="/images/search.png"
                  alt="Laina Bags"
                  width={400}
                  height={400}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl border border-slate-200 p-3 transform rotate-3 hover:rotate-0 transition-transform">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Package className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Bulk Orders</div>
                  <div className="text-sm font-black text-slate-900">Best Prices</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl border border-slate-200 p-3 transform -rotate-3 hover:rotate-0 transition-transform">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Quality</div>
                  <div className="text-sm font-black text-slate-900">Guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Our Specializations</h3>
            <p className="text-slate-600">Premium bags for every need</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["Laptop Bags", "College Bags", "School Bags", "Luggage", "Traveling Bags", "Accessories"].map((item, index) => (
              <div
                key={index}
                className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:border-sky-300 hover:text-sky-700 hover:bg-sky-50 transition-all duration-300 cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
