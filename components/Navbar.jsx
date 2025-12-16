"use client";
import React, { useState, useEffect, useRef } from "react";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Search,
  User,
  MessageCircle,
  Phone,
  Mail,
  ShoppingBag,
} from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const isSeller = user?.publicMetadata?.role === "seller";

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim()) {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || window.location.origin;
          const apiUrl = `${baseUrl}/api/products/search?q=${encodeURIComponent(searchQuery)}`;
          const response = await axios.get(apiUrl);
          setSearchResults(response.data);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };
    const debounceTimer = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/all-products", label: "Products" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-b border-blue-700/30">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-2 relative z-10">
          {/* Desktop View */}
          <div className="hidden md:flex justify-center items-center gap-6">
            <a href="tel:+919987225041" className="flex items-center gap-2 text-blue-100 hover:text-white transition-all duration-200 group">
              <Phone className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">+91 99872 25041</span>
            </a>
            <div className="w-px h-4 bg-blue-300/60"></div>
            <a href="tel:+917045010589" className="flex items-center gap-2 text-blue-100 hover:text-white transition-all duration-200 group">
              <Phone className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">+91 70450 10589</span>
            </a>
            <div className="w-px h-4 bg-blue-300/60"></div>
            <a href="mailto:info@lainabags.com" className="flex items-center gap-2 text-blue-100 hover:text-white transition-all duration-200 group">
              <Mail className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">info@lainabags.com</span>
            </a>
          </div>

          {/* Mobile View */}
          <div className="flex md:hidden justify-center items-center gap-4 text-xs">
            <a href="tel:+919987225041" className="flex items-center gap-1.5 text-blue-100 hover:text-white">
              <Phone className="w-3 h-3" />
              <span className="font-bold">+91 99872 25041</span>
            </a>
            <div className="w-px h-3 bg-blue-300/60"></div>
            <a href="mailto:info@lainabags.com" className="flex items-center gap-1.5 text-blue-100 hover:text-white">
              <Mail className="w-3 h-3" />
              <span className="font-bold">Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 relative ${scrolled ? "bg-white shadow-xl" : "bg-white/95"
        }`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Premium Logo - With Hover Animation */}
            <Link
              href="/"
              className="flex items-center gap-2.5 flex-shrink-0 relative group"
            >
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/logobg.png"
                  alt="Laina Bags"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-black bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent leading-tight tracking-tight transition-all duration-300 group-hover:from-blue-700 group-hover:via-blue-600 group-hover:to-blue-700">
                  Laina Bags
                </span>
              </div>
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path} className="relative px-5 py-2 text-sm font-bold text-slate-700 hover:text-blue-700 transition-all duration-300 group">
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-full opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300"></span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-8 transition-all duration-300 rounded-full"></span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="relative" ref={searchRef}>
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 rounded-xl text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all">
                  <Search className="w-5 h-5" />
                </button>

                {/* Search Modal - Centered on Mobile */}
                {isSearchOpen && (
                  <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:relative sm:inset-auto sm:pt-0 sm:px-0">
                    {/* Mobile Backdrop */}
                    <div className="fixed inset-0 bg-black/20 sm:hidden" onClick={() => setIsSearchOpen(false)}></div>

                    {/* Search Container */}
                    <div className="relative w-full max-w-md sm:absolute sm:top-full sm:right-0 sm:mt-3 sm:w-[420px] bg-white rounded-2xl shadow-2xl border-2 border-blue-100 overflow-hidden">
                      <div className="p-4 border-b border-blue-50 bg-blue-50/50">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                          <input ref={searchInputRef} type="text" placeholder="Search bags..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold bg-white" />
                        </div>
                      </div>

                      {searchResults.length > 0 ? (
                        <div className="max-h-96 overflow-y-auto">
                          {searchResults.map((product) => (
                            <div key={product._id} className="p-3 hover:bg-blue-50 cursor-pointer border-b border-blue-50/50 last:border-0" onClick={() => { router.push(`/product/${product._id}`); setIsSearchOpen(false); setSearchQuery(""); }}>
                              <div className="flex gap-3 items-center">
                                <div className="relative w-14 h-14 rounded-lg overflow-hidden ring-2 ring-blue-100">
                                  <Image src={product.images?.[0] || product.image?.[0]} alt={product.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-bold text-slate-900 truncate">{product.name}</h4>
                                  <p className="text-xs text-slate-500 font-semibold">{product.category}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : searchQuery && (
                        <div className="p-8 text-center">
                          <Search className="w-12 h-12 mx-auto mb-2 text-blue-300" />
                          <p className="text-sm font-bold text-slate-600">No results found</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <a href="https://wa.me/917045010589" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all">
                <MessageCircle className="w-4 h-4" />
                <span>Order</span>
              </a>

              {user ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <button onClick={openSignIn} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-all">
                  <User className="w-5 h-5" />
                </button>
              )}

              {isSeller && (
                <button onClick={() => router.push("/seller")} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Seller</span>
                </button>
              )}

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-blue-100 bg-white">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path} className="block py-2.5 px-4 text-base font-bold text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all" onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <a href="https://wa.me/917045010589" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2.5 px-4 text-base font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all" onClick={() => setMobileMenuOpen(false)}>
                <MessageCircle className="w-5 h-5" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
