import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlusSquare, List } from 'lucide-react'; // Import Lucide icons

const SideBar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Add Product', path: '/seller', icon: <PlusSquare className="w-6 h-6 text-blue-700" /> },
        { name: 'Product List', path: '/seller/product-list', icon: <List className="w-6 h-6 text-blue-700" /> },
    ];

    return (
        <div className='md:w-64 w-16 border-r min-h-screen text-base border-blue-100 py-2 flex flex-col bg-white shadow-soft'>
            {menuItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                    <Link href={item.path} key={item.name} passHref>
                        <div
                            className={`flex items-center py-3 px-4 gap-3 ${isActive
                                ? "border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-500/90"
                                : "hover:bg-blue-50/90 border-white"
                                }`}
                        >
                            {item.icon}
                            <p className='md:block hidden text-center font-body text-blue-700'>{item.name}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SideBar;
