import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlusSquare, List, Package } from 'lucide-react';

const SideBar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Add Product', path: '/seller', icon: PlusSquare },
        { name: 'Product List', path: '/seller/product-list', icon: List },
    ];

    return (
        <div className='md:w-64 w-20 border-r min-h-screen border-slate-200 py-4 flex flex-col bg-white shadow-sm'>
            {menuItems.map((item) => {
                const isActive = pathname === item.path;
                const Icon = item.icon;

                return (
                    <Link href={item.path} key={item.name} passHref>
                        <div
                            className={`flex items-center py-3 px-4 md:px-5 gap-3 mx-2 rounded-xl transition-all duration-200 ${
                                isActive
                                    ? "bg-sky-600 text-white shadow-lg"
                                    : "text-slate-700 hover:bg-slate-100 hover:text-sky-600"
                            }`}
                        >
                            <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-slate-600"}`} />
                            <p className='md:block hidden text-sm font-bold'>{item.name}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SideBar;
