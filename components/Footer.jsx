import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Linkedin,
  Award,
  Truck,
  Shield,
  Sparkles,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V4h4V2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V4h4V2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Trust Badges */}
      <div className="relative border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-xl bg-sky-500/20 flex items-center justify-center mb-3 border border-sky-400/30">
                <Truck className="w-7 h-7 text-sky-400" />
              </div>
              <h4 className="text-sm font-bold mb-1">Free Shipping</h4>
              <p className="text-xs text-slate-400">Above ₹2000</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-xl bg-sky-500/20 flex items-center justify-center mb-3 border border-sky-400/30">
                <Shield className="w-7 h-7 text-sky-400" />
              </div>
              <h4 className="text-sm font-bold mb-1">Premium Quality</h4>
              <p className="text-xs text-slate-400">Since 2007</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-xl bg-sky-500/20 flex items-center justify-center mb-3 border border-sky-400/30">
                <Award className="w-7 h-7 text-sky-400" />
              </div>
              <h4 className="text-sm font-bold mb-1">Expert Craft</h4>
              <p className="text-xs text-slate-400">Handcrafted</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-xl bg-sky-500/20 flex items-center justify-center mb-3 border border-sky-400/30">
                <MessageCircle className="w-7 h-7 text-sky-400" />
              </div>
              <h4 className="text-sm font-bold mb-1">24/7 Support</h4>
              <p className="text-xs text-slate-400">Always Here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-sky-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 p-1.5">
                  <Image
                    src="/images/search.png"
                    alt="Laina Bags"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Laina Bags</h3>
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">Premium</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Crafting elegance in every stitch. Premium bags designed for the modern lifestyle.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/share/1HKbExT6wQ/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/30 flex items-center justify-center transition-all duration-200">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/searchbag.in?igsh=MWdwdjZudzRuODY0OQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/30 flex items-center justify-center transition-all duration-200">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/company/search-bag/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/30 flex items-center justify-center transition-all duration-200">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", path: "/about" },
                { label: "All Products", path: "/all-products" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-slate-400 hover:text-sky-400 transition-colors duration-200 text-sm font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Categories</h4>
            <ul className="space-y-3">
              {["Backpack", "Laptop Bag", "Sling Bag", "Duffel Bag", "Gym Bag"].map((category) => (
                <li key={category}>
                  <Link href={`/all-products?category=${category.toLowerCase()}`} className="text-slate-400 hover:text-sky-400 transition-colors duration-200 text-sm font-medium">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
            <div className="space-y-3">
              <a href="https://maps.app.goo.gl/TkMbQxgaCfq13wn58" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-slate-400 hover:text-sky-400 transition-colors text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Shop No. 28, Lohe Ki Chawl, Mumbai Bag Market, Maulana Azad Road, Madanpura, Mumbai - 400 008</span>
              </a>
              <a href="tel:+919326123535" className="flex items-center gap-3 text-slate-400 hover:text-sky-400 transition-colors text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 93261 23535</span>
              </a>
              <a href="tel:+918828081163" className="flex items-center gap-3 text-slate-400 hover:text-sky-400 transition-colors text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 88280 81163</span>
              </a>
              <a href="mailto:support@lainabags.com" className="flex items-center gap-3 text-slate-400 hover:text-sky-400 transition-colors text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>support@lainabags.com</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>Mon-Sat: 10:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} <span className="font-bold text-white">Laina Bags</span>. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <Link href="/about" className="hover:text-sky-400 transition-colors">Privacy</Link>
              <Link href="/contact" className="hover:text-sky-400 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/919326123535"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-40 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-2xl flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-110 group"
        aria-label="Order on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
      </a>
    </footer>
  );
};

export default Footer;
