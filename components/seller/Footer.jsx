import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-white text-blue-700 py-6 border-t border-blue-100 shadow-md">
      <div className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-6 md:px-10">
        <div className="flex items-center gap-4">
          <Image className="hidden md:block" src={assets.logo} alt="Search Bags Logo" />
          <div className="hidden md:block h-7 w-px bg-blue-200"></div>
          <p className="py-4 text-center text-xs md:text-sm text-blue-600/80 font-body">
            Copyright {new Date().getFullYear()} © SearchBag.com All Rights Reserved.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#" className="text-blue-600 hover:text-blue-800 transition duration-300">
            <Image src={assets.facebook_icon} alt="facebook_icon" className="opacity-80 hover:opacity-100 transition duration-300" />
          </Link>
          <Link href="#" className="text-blue-600 hover:text-blue-800 transition duration-300">
            <Image src={assets.twitter_icon} alt="twitter_icon" className="opacity-80 hover:opacity-100 transition duration-300" />
          </Link>
          <Link href="#" className="text-blue-600 hover:text-blue-800 transition duration-300">
            <Image src={assets.instagram_icon} alt="instagram_icon" className="opacity-80 hover:opacity-100 transition duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;