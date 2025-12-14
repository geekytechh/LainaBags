"use client";
import Navbar from "@/components/seller/Navbar";
import Sidebar from "@/components/seller/Sidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-blue-50/30">
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
