import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-white overflow-hidden">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0 -mt-1">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto rotate-180" preserveAspectRatio="none">
          <path d="M0,50 C240,80 480,20 720,50 C960,80 1200,20 1440,50 L1440,100 L0,100 Z" fill="white" />
        </svg>
      </div>

      {/* Background Graphics */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E")`
      }}></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative w-10 h-10 bg-white rounded-lg transition-transform duration-300 group-hover:scale-110">
                <Image src="/images/logobg.png" alt="Laina Bags" fill className="object-contain" />
              </div>
              <span className="text-lg font-black transition-colors duration-300 group-hover:text-blue-200">Laina Bags</span>
            </Link>
            <p className="text-blue-200 text-sm mb-4 leading-relaxed">
              Premium fashion bags since 2010
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://www.instagram.com/lainabagstyle" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold mb-3 text-white">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="/" className="block text-blue-200 hover:text-white hover:translate-x-1 transition-all">Home</Link>
              <Link href="/all-products" className="block text-blue-200 hover:text-white hover:translate-x-1 transition-all">Products</Link>
              <Link href="/about" className="block text-blue-200 hover:text-white hover:translate-x-1 transition-all">About</Link>
              <Link href="/contact" className="block text-blue-200 hover:text-white hover:translate-x-1 transition-all">Contact</Link>
            </div>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold mb-3 text-white">Categories</h4>
            <div className="space-y-2 text-sm">
              <Link href="/all-products?category=backpack" className="block text-blue-200 hover:text-white hover:translate-x-1 transition-all">Backpacks</Link>
              <Link href="/all-products?category=laptop bag" className="block text-blue-200 hover:text-white hover:translate-x-1 transition-all">Laptop Bags</Link>
              <Link href="/all-products?category=hiking bag" className="block text-blue-200 hover:text-white hover:translate-x-1 transition-all">Hiking Bags</Link>
              <Link href="/all-products?category=messenger bag" className="block text-blue-200 hover:text-white hover:translate-x-1 transition-all">Messenger Bags</Link>
              <Link href="/all-products?category=duffel bag" className="block text-blue-200 hover:text-white hover:translate-x-1 transition-all">Duffel Bags</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-sm font-bold mb-3 text-white">Contact</h4>
            <div className="space-y-2.5 text-sm">
              <a href="https://maps.app.goo.gl/bW6dYV15hzHGom939" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-blue-200 hover:text-white transition-colors">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-xs font-medium">Room No. 1, Chawl 12, Byculla Station Rd, Near Star of India Hotel, Byculla (W), Mumbai - 400 011</span>
              </a>
              <a href="tel:917045010589" className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium">+91 70450 10589</span>
              </a>
              <a href="mailto:info@lainabags.com" className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium">info@lainabags.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="text-center text-sm text-blue-200">
            <p>&copy; {new Date().getFullYear()} Laina Bags. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/917045010589"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-40 group/whatsapp"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-50 group-hover/whatsapp:opacity-75 transition-opacity"></div>
          <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition-all hover:scale-110">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
        </div>
      </a>
    </footer >
  );
};

export default Footer;
