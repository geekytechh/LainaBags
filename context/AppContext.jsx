"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Check URL for category parameter
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get("category");

        if (categoryParam) {
          setCategory(categoryParam.toLowerCase());
        }

        // Use environment variable for API base URL if available, otherwise use window.location.origin
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || window.location.origin;
        const apiUrl = `${baseUrl}/api/product/list`;
        // Add cache-busting parameter to ensure fresh data
        const cacheBuster = new Date().getTime();
        const response = await fetch(`${apiUrl}?_=${cacheBuster}`, { cache: 'no-store' });
        const data = await response.json();
        
        console.log("API Response:", data); // Add logging to see API response
        
        if (data.success) {
          let filteredProducts = data.products;
          console.log("All products:", filteredProducts.length); // Log total products count
          
          // Log all products and their categories for debugging
          console.log("All products with categories:", data.products.map(p => ({
            name: p.name,
            category: p.category,
            id: p._id
          })));

          // Filter by category if specified
          if (category) {
            console.log("Filtering by category:", category);
            console.log("Product categories:", data.products.map(p => p.category.toLowerCase()));
            
            filteredProducts = data.products.filter(
              (product) => {
                // Normalize category names for comparison
                const productCategory = product.category.toLowerCase().trim();
                const searchCategory = category.toLowerCase().trim();
                
                // Check for partial matches or specific mappings
                const match = 
                  productCategory === searchCategory ||
                  productCategory.includes(searchCategory) ||
                  searchCategory.includes(productCategory);
                  
                console.log(`Product ${product.name} category: ${productCategory}, match with ${searchCategory}: ${match}`);
                return match;
              }
            );
            console.log("Filtered products by category:", category, filteredProducts.length); // Log filtered count
          }

          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const formatWhatsAppMessage = (product) => {
    return `Hi, I'm interested in the ${product.name}. Could you provide more information about it?`;
  };

  const openWhatsAppChat = (product) => {
    const message = formatWhatsAppMessage(product);
    const phoneNumber = "+919326123535"; // Use product's WhatsApp number or default
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const getToken = async () => {
    try {
      const token = await fetch("/api/get-token").then((res) => res.json());
      return token;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

  // Check if user is a seller
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      // Check if user has seller role in metadata
      setIsSeller(user.publicMetadata?.role === "seller");
    } else {
      setIsSeller(false);
    }
  }, [isLoaded, user]);

  const value = {
    products,
    setProducts,
    loading,
    category,
    setCategory,
    formatWhatsAppMessage,
    openWhatsAppChat,
    getToken,
    cart,
    setCart,
    router,
    user,
    isSeller,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContextProvider, useAppContext };
