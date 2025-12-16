import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-white border-t border-slate-200 py-6">
      <div className="flex md:flex-row flex-col-reverse items-center justify-between w-full px-6 md:px-10">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 p-1">
              <Image 
                src="/images/search.png" 
                alt="Laina Bags Logo" 
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-black text-slate-900">Laina Bags</span>
          </div>
          <div className="hidden md:block h-6 w-px bg-slate-200"></div>
          <p className="text-center text-xs md:text-sm text-slate-600">
            Copyright {new Date().getFullYear()} © Laina Bags. All Rights Reserved.
          </p>
        </div>
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <a href="https://www.facebook.com/share/1HKbExT6wQ/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-600 flex items-center justify-center transition-all duration-200">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="https://www.instagram.com/searchbag.in?igsh=MWdwdjZudzRuODY0OQ==" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-600 flex items-center justify-center transition-all duration-200">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/company/search-bag/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-600 flex items-center justify-center transition-all duration-200">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
