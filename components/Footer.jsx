import React from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  Linkedin
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="pt-12 pb-8 text-blue-700 bg-white border-t border-blue-100 md:pt-16">

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-14">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex gap-3 items-center group">
              <Image
                src="/images/search.png"
                alt="Search Bags Logo"
                width={36}
                height={36}
                className="object-contain transition-transform duration-300 transform group-hover:scale-110"
              />
              <span className="text-2xl font-bold tracking-tight text-blue-700 font-logo">
                Search Bags
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-blue-600/80 font-body">
              Premium bags for every occasion. Discover our curated collection
              of high-quality bags designed for style and functionality.
            </p>
            <div className="flex gap-3 pt-2">
              <Link
                href="https://www.facebook.com/share/1HKbExT6wQ/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white bg-blue-600 rounded-full shadow-lg transition-all duration-300 transform hover:bg-blue-700 hover:shadow-blue-300/20 hover:scale-110"
              >
                <Facebook size={16} />
              </Link>
              <Link
                href="https://www.instagram.com/searchbag.in?igsh=MWdwdjZudzRuODY0OQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white bg-blue-600 rounded-full shadow-lg transition-all duration-300 transform hover:bg-blue-700 hover:shadow-blue-300/20 hover:scale-110"
              >
                <Instagram size={16} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/search-bag/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white bg-blue-600 rounded-full shadow-lg transition-all duration-300 transform hover:bg-blue-700 hover:shadow-blue-300/20 hover:scale-110"
              >
                <Linkedin size={16} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="pb-2 text-sm font-bold tracking-wide text-blue-700 uppercase border-b border-blue-200">
              Company
            </h3>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-4">
              {["About Us", "Contact", "Collections"].map(
                (item, index) => (
                  <li key={index} className="group">
                    <Link
                      href={item === "About Us" ? "/about" : item === "Contact" ? "/contact" : "/all-products"}
                      className="flex items-center text-sm transition-all duration-200 text-blue-600/80 hover:text-blue-700"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="pb-2 text-sm font-bold tracking-wide text-blue-700 uppercase border-b border-blue-200">
              Categories
            </h3>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-4">
              {["Backpack", "Laptop Bag", "Sling Bag", "Duffel Bag", "Gym Bag", "Accessories", "Complementary Items"].map(
                (item, index) => (
                  <li key={index} className="group">
                    <Link
                      href={`/all-products?category=${item.toLowerCase()}`}
                      className="flex items-center text-sm transition-all duration-200 text-blue-600/80 hover:text-blue-700"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="pb-2 text-sm font-bold tracking-wide text-blue-700 uppercase border-b border-blue-200">
              Contact Us
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <a 
                  href="https://maps.app.goo.gl/TkMbQxgaCfq13wn58"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start text-sm transition-all duration-200 text-blue-600/80 hover:text-blue-700"
                >
                  <MapPin size={14} className="flex-shrink-0 mt-1 mr-2 text-blue-500" />
                  <span>Shop No. 28, Lohe Ki Chawl, Mumbai Bag Market, Maulana Azad Road, Madanpura, Mumbai - 400 008.</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919326123535"
                  className="flex items-center text-sm transition-all duration-200 text-blue-600/80 hover:text-blue-700"
                >
                  <Phone size={14} className="flex-shrink-0 mr-2 text-blue-500" />
                  +91 93261 23535
                </a>
              </li>
              <li>
                <a
                  href="tel:+918828081163"
                  className="flex items-center text-sm transition-all duration-200 text-blue-600/80 hover:text-blue-700"
                >
                  <Phone size={14} className="flex-shrink-0 mr-2 text-blue-500" />
                  +91 88280 81163
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@searchbag.in"
                  className="flex items-center text-sm transition-all duration-200 text-blue-600/80 hover:text-blue-700"
                >
                  <Mail size={14} className="flex-shrink-0 mr-2 text-blue-500" />
                  support@searchbag.in
                </a>
              </li>
              <li>
                <div className="flex items-center text-sm text-blue-600/80">
                  <Clock size={14} className="flex-shrink-0 mr-2 text-blue-500" />
                  <span>Mon-Sat: 10:00 AM - 7:00 PM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* WhatsApp Chat Button - Fixed Position */}
        <div className="hidden fixed right-6 bottom-6 z-40 md:block">
          <a
            href="https://wa.me/919326123535"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-3.5 text-white bg-green-500 rounded-full shadow-lg transition-all duration-300 hover:bg-green-600 hover:scale-110"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={24} />
          </a>
        </div>

        <div className="pt-8 mt-12 border-t border-blue-200 md:mt-16">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col gap-4 justify-between items-center md:flex-row">
              <p className="text-xs text-blue-600/70">
                © {new Date().getFullYear()} Search Bags. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
