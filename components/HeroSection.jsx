"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight, MessageCircle, ShoppingBag, Award, Clock, Users } from "lucide-react";

const HeroSection = () => {
    const router = useRouter();

    return (
        <div className="relative w-full overflow-hidden bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 pb-16 md:pb-20">
            {/* Animated Background Graphics */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#27C5F7] rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#1eb5e7] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-[#3dd0ff] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Geometric Pattern */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E")`
            }}></div>

            {/* Floating Bag Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
                <ShoppingBag className="absolute top-16 left-10 w-11 h-11 rotate-12 animate-float" />
                <ShoppingBag className="absolute top-24 right-20 w-9 h-9 -rotate-12 animate-float" style={{ animationDelay: '1s' }} />
                <ShoppingBag className="absolute bottom-24 left-1/4 w-10 h-10 rotate-6 animate-float" style={{ animationDelay: '2s' }} />
                <ShoppingBag className="absolute bottom-32 right-1/3 w-8 h-8 -rotate-6 animate-float" style={{ animationDelay: '1.5s' }} />
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-10 md:py-12 lg:py-14">
                    {/* Left Content */}
                    <div className="text-white space-y-6 z-10 order-2 lg:order-1">
                        {/* Location Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full hover:shadow-md transition-all">
                            <MapPin className="w-4 h-4 text-[#27C5F7]" />
                            <span className="text-sm font-bold uppercase tracking-wide text-slate-700">Mumbai, India</span>
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-3">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                                <span className="block">Mumbai's Trusted</span>
                                <span className="block text-white">Bag Manufacturer</span>
                            </h1>
                            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-lg">
                                Premium quality bags for wholesale and retail since 2010
                            </p>
                        </div>

                        {/* Key Points - Clean Single Line Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            <div className="group flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-200 hover:shadow-lg hover:scale-105 transition-all">
                                <div className="w-10 h-10 rounded-lg bg-blue-900/10 flex items-center justify-center flex-shrink-0">
                                    <Award className="w-5 h-5 text-blue-900" />
                                </div>
                                <p className="text-sm font-bold text-slate-700 leading-tight">Manufacturer & Wholesaler</p>
                            </div>
                            <div className="group flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-200 hover:shadow-lg hover:scale-105 transition-all">
                                <div className="w-10 h-10 rounded-lg bg-blue-900/10 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-5 h-5 text-blue-900" />
                                </div>
                                <p className="text-sm font-bold text-slate-700 leading-tight">15+ Years Experience</p>
                            </div>
                            <div className="group flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-200 hover:shadow-lg hover:scale-105 transition-all">
                                <div className="w-10 h-10 rounded-lg bg-blue-900/10 flex items-center justify-center flex-shrink-0">
                                    <Users className="w-5 h-5 text-blue-900" />
                                </div>
                                <p className="text-sm font-bold text-slate-700 leading-tight">50,000+ Customers</p>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-3">
                            <button
                                onClick={() => router.push("/all-products")}
                                className="group px-7 py-3.5 bg-white text-blue-900 rounded-xl font-bold text-sm hover:bg-blue-900 hover:text-white hover:border-white transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-xl"
                            >
                                <span>View Catalog</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <a
                                href="https://wa.me/917045010589"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-7 py-3.5 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-xl"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>Get Quote</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative z-10 order-1 lg:order-2">
                        {/* Main Image Container */}
                        <div
                            className="relative w-full max-w-[480px] md:max-w-[520px] lg:max-w-[560px] mx-auto h-[340px] md:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-200 group p-4"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/lappy.jpg"
                                    alt="Laina Bags - Premium Quality Bags"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Enhanced Decorative Elements */}
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#27C5F7]/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-[#3dd0ff]/20 rounded-full blur-3xl"></div>

                        {/* Enhanced Border Accent */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#27C5F7]/30 to-[#1eb5e7]/30 rounded-3xl -z-10 blur-xl"></div>
                    </div>
                </div>
            </div>

            {/* Seamless Wave Transition */}
            <div className="absolute bottom-0 left-0 right-0 -mb-1">
                <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
                    <path d="M0,50 C240,80 480,20 720,50 C960,80 1200,20 1440,50 L1440,100 L0,100 Z" fill="white" />
                </svg>
            </div>


        </div>
    );
};

export default HeroSection;
