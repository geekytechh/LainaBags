"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlusSquare, List, Home } from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Add Product', path: '/seller', icon: PlusSquare },
        { name: 'Product List', path: '/seller/product-list', icon: List },
    ];

    return (
        <div className='md:w-64 w-20 border-r min-h-screen border-blue-100 py-6 flex flex-col bg-white shadow-lg relative overflow-hidden'>
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50/50 to-transparent"></div>

            {/* Back to Home */}
            <div className="relative px-4 mb-6">
                <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-all group">
                    <Home className="w-5 h-5" />
                    <span className="md:block hidden text-sm font-bold">Back to Store</span>
                </Link>
            </div>

            {/* Divider */}
            <div className="relative px-4 mb-4">
                <div className="border-t border-blue-100"></div>
            </div>

            {/* Menu Items */}
            <div className="relative flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link href={item.path} key={item.name}>
                            <div
                                className={`flex items-center py-3 px-4 gap-3 rounded-xl transition-all duration-200 ${isActive
                                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                                        : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-blue-600"}`} />
                                <p className='md:block hidden text-sm font-bold'>{item.name}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Help Section */}
            <div className="relative px-4 mt-6 md:block hidden">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-xs font-bold text-blue-900 mb-2">Need Help?</p>
                    <a
                        href="https://wa.me/917045010589"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        <span>WhatsApp: +91 70450 10589</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
