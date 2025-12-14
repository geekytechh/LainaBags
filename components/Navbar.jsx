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
} from "lucide-react";

// Multi-language brand switcher
const MultiLanguageBrand = () => {
  const languages = [
    { lang: "English", text: "Search Bags" },
    { lang: "Marathi", text: "सर्च बॅग्स" },
    { lang: "Gujarati", text: "સર્ચ બેગ્સ" },
    { lang: "Tamil", text: "சர்ச் பேக்ஸ்" },
  ];
  const [currentLangIndex, setCurrentLangIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLangIndex((prev) => (prev + 1) % languages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-xl font-bold tracking-tight leading-none text-blue-700 transition-all duration-500 md:text-3xl font-logo">
      {languages[currentLangIndex].text}
    </span>
  );
};

const Navbar = () => {
  const router = useRouter();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const isSeller = user?.publicMetadata?.role === "seller";

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  return (
    <nav className="sticky top-0 z-50 text-blue-700 bg-white shadow-xl">
      {/* Top Contact Bar */}
      <div className="hidden justify-end items-center px-8 py-2 space-x-6 text-xs bg-blue-50 md:flex">
        <a
          href="tel:+919326123535"
          className="flex items-center transition-colors duration-200 hover:text-blue-600"
        >
          <Phone className="mr-1.5 w-3 h-3" /> +91 93261 23535
        </a>
        <a
          href="tel:+918828081163"
          className="flex items-center transition-colors duration-200 hover:text-blue-600"
        >
          <Phone className="mr-1.5 w-3 h-3" /> +91 88280 81163
        </a>
        <a
          href="mailto:support@searchbag.in"
          className="flex items-center transition-colors duration-200 hover:text-blue-600"
        >
          <Mail className="mr-1.5 w-3 h-3" /> support@searchbag.in
        </a>
      </div>

      {/* Main Navbar */}
      <div className="flex justify-between items-center px-6 py-4 md:px-16 lg:px-24">
        {/* Logo */}
        <div
          className="flex gap-3 items-center cursor-pointer md:gap-4 group"
          onClick={() => router.push("/")}
        >
          <div className="relative w-12 h-12 transition-transform duration-300 transform md:w-16 md:h-16 group-hover:scale-110">
            <Image
              src="/images/search.png"
              alt="Search Bags Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="transition-transform duration-300 transform group-hover:translate-x-1">
            <MultiLanguageBrand />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden gap-10 items-center md:flex">
          {["/", "/all-products", "/about", "/contact"].map((path, index) => (
            <Link
              key={index}
              href={path}
              className="relative text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:text-blue-500 group font-body"
            >
              {path === "/" ? "Home" : path.slice(1).replace("-", " ")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-full shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-300/30 hover:scale-105 font-body"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Right Section */}
        <div className="flex gap-4 items-center md:gap-6">
          {/* Search - Desktop Only */}
          <div className="hidden relative md:block" ref={searchRef}>
            <Search
              className="w-5 h-5 transition-colors duration-200 cursor-pointer hover:text-blue-500"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            {isSearchOpen && (
              <div className="absolute top-full right-0 z-50 mt-3 bg-white rounded-xl border border-blue-200 shadow-2xl
                /* Mobile styles */
                w-[260px] max-w-[260px]
                /* Desktop styles - completely separate from mobile */
                md:w-[320px] md:max-w-md">
                <div className="p-2.5 md:p-4">
                  <input
                    type="text"
                    placeholder="Search bags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 md:px-4 py-2 md:py-2.5 w-full rounded-lg border bg-blue-50 border-blue-100 text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-body text-sm md:text-base"
                    autoFocus
                  />
                </div>
                {searchResults.length > 0 ? (
                  <div className="overflow-y-auto max-h-64 border-t border-blue-100">
                    {searchResults.map((product) => (
                      <div
                        key={product._id}
                        className="p-3 transition-colors duration-150 cursor-pointer hover:bg-blue-50"
                        onClick={() => {
                          if (product && product._id) {
                            router.push(`/product/${product._id}`);
                          } else {
                            console.error('Invalid product data:', product);
                          }
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <div className="flex gap-3 items-center">
                          <Image
                            src={product.images?.[0] || product.image?.[0]}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="object-cover rounded-md shadow-sm"
                          />
                          <div className="font-body">
                            <h4 className="text-sm font-medium text-stone-900 font-heading">
                              {product.name}
                            </h4>
                            <p className="text-xs font-medium text-blue-600">
                              {product.category}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  searchQuery && (
                    <div className="p-3 text-sm text-center text-stone-500 font-body">
                      No results found
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Auth Controls */}
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <button
              onClick={openSignIn}
              className="flex gap-2 items-center transition-colors duration-200 hover:text-blue-500 font-body"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
              <span className="text-sm uppercase">Account</span>
            </button>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex gap-3 items-center md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X size={28} className="text-blue-700" />
            ) : (
              <Menu size={28} className="text-blue-700" />
            )}
          </button>
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs bg-blue-600 text-white hover:bg-blue-700 px-4 py-1.5 rounded-full transition shadow-soft hover:shadow-hover font-body"
            >
              Seller
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="text-blue-700 bg-white border-t border-blue-100 shadow-lg md:hidden animate-fadeIn">
          <div className="flex flex-col px-6 py-5 space-y-5">
            {["/", "/all-products", "/about", "/contact"].map((path, index) => (
              <Link
                key={index}
                href={path}
                className="py-2 text-sm font-medium tracking-wide uppercase border-b border-blue-100 transition-all duration-300 hover:text-blue-500 font-body"
                onClick={() => setMobileMenuOpen(false)}
              >
                {path === "/" ? "Home" : path.slice(1).replace("-", " ")}
              </Link>
            ))}

            <a
              href="https://wa.me/919326123535"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 items-center py-2 text-sm font-medium border-b border-blue-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageCircle className="w-4 h-4 text-blue-500" />
              <span>Chat on WhatsApp</span>
            </a>

            <div className="flex gap-2 items-center py-2 text-sm font-medium border-b border-blue-100">
              <Phone className="w-4 h-4 text-blue-500" />
              <a href="tel:+919326123535">+91 93261 23535</a>
            </div>
            <div className="flex gap-2 items-center py-2 text-sm font-medium border-b border-blue-100">
              <Phone className="w-4 h-4 text-blue-500" />
              <a href="tel:+918828081163">+91 88280 81163</a>
            </div>
            <div className="flex gap-2 items-center py-2 text-sm font-medium">
              <Mail className="w-4 h-4 text-blue-500" />
              <a href="mailto:support@searchbag.in">
                support@searchbag.in
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
