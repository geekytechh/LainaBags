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
  Sparkles,
  ChevronDown,
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
      <div className="hidden bg-sky-50 border-b border-sky-100 text-sky-700 text-xs font-medium py-2 md:block">
        <div className="container mx-auto px-6 flex justify-center items-center gap-6">
          <a href="tel:+919326123535" className="flex items-center gap-1.5 hover:text-sky-600 transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span>+91 93261 23535</span>
          </a>
          <div className="w-px h-3 bg-sky-200"></div>
          <a href="mailto:support@lainabags.com" className="flex items-center gap-1.5 hover:text-sky-600 transition-colors">
            <Mail className="w-3.5 h-3.5" />
            <span>support@lainabags.com</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-sky-100" 
          : "bg-white/90 backdrop-blur-sm"
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group flex-shrink-0"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-sky-100 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 p-1.5 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/search.png"
                    alt="Laina Bags"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-black text-slate-900 leading-tight">Laina Bags</span>
                <span className="text-[9px] font-bold text-sky-600 uppercase tracking-wider">Premium Quality</span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="relative px-4 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors duration-200 rounded-lg hover:bg-sky-50"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 rounded-lg text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-all duration-200"
                >
                  <Search className="w-5 h-5" />
                </button>
                
                {isSearchOpen && (
                  <div className="absolute top-full right-0 mt-2 w-[90vw] sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                    <div className="p-4 border-b border-slate-100">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                    {searchResults.length > 0 ? (
                      <div className="max-h-80 overflow-y-auto">
                        {searchResults.map((product) => (
                          <div
                            key={product._id}
                            className="p-3 hover:bg-sky-50 cursor-pointer border-b border-slate-100 last:border-0 transition-colors"
                            onClick={() => {
                              router.push(`/product/${product._id}`);
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                          >
                            <div className="flex gap-3 items-center">
                              <Image
                                src={product.images?.[0] || product.image?.[0]}
                                alt={product.name}
                                width={50}
                                height={50}
                                className="object-cover rounded-lg"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-slate-900 truncate">{product.name}</h4>
                                <p className="text-xs text-slate-500">{product.category}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : searchQuery && (
                      <div className="p-4 text-center text-sm text-slate-500">No results found</div>
                    )}
                  </div>
                )}
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919326123535"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order Now</span>
              </a>

              {/* Account */}
              {user ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <button
                  onClick={openSignIn}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-all duration-200"
                >
                  <User className="w-5 h-5" />
                </button>
              )}

              {/* Seller Dashboard */}
              {isSeller && (
                <button
                  onClick={() => router.push("/seller")}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-semibold shadow-lg hover:bg-sky-700 transition-all duration-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Seller</span>
                </button>
              )}

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-all duration-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-sky-100 bg-white">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="block py-3 px-4 text-base font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/919326123535"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 px-4 text-base font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
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
