import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Award, Users, Package, TrendingUp, ArrowRight, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";

const Banner = () => {
  const router = useRouter();

  const stats = [
    { icon: Users, value: "50K+", label: "Satisfied Customers" },
    { icon: Package, value: "15+", label: "Years in Business" },
    { icon: TrendingUp, value: "100+", label: "Product Varieties" },
  ];

  const features = [
    "Handpicked Premium Materials",
    "Skilled Artisan Craftsmanship",
    "Free Delivery on Orders ₹2000+",
    "Dedicated Customer Care Team",
  ];

  return (
    <section className="relative py-12 md:py-16 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Established 2010</span>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
                <span className="text-slate-900">Mumbai's Trusted</span>
                <br />
                <span className="text-blue-600">Bag Manufacturer</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                Leading manufacturer and wholesaler of premium bags.
                Serving Mumbai and beyond with quality bags since 2010.
              </p>
            </div>



            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-100 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => router.push("/all-products")}
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all hover:scale-105"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://wa.me/917045010589"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Quote</span>
              </a>
            </div>
          </div>

          {/* Right Image - Reduced Size */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-50"></div>
              <div className="relative aspect-square bg-white p-8">
                <Image
                  src="/images/banner.png"
                  alt="Laina Bags"
                  width={350}
                  height={350}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-3 -right-3 bg-white rounded-xl shadow-lg border border-slate-200 p-2.5 transform rotate-3 hover:rotate-0 transition-transform">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Package className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Wholesale</div>
                  <div className="text-sm font-black text-slate-900">Best Rates</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-lg border border-slate-200 p-2.5 transform -rotate-3 hover:rotate-0 transition-transform">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Quality</div>
                  <div className="text-sm font-black text-slate-900">Assured</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
