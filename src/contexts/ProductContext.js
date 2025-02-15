import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Default: all
  const [sortOrder, setSortOrder] = useState("asc"); // Default: ascending
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 10;

  // Fetch categories once when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Error loading categories. Please try again.");
      }
    };

    fetchCategories();
  }, []);

  // Fetch products when category or sorting changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        let url = "https://fakestoreapi.com/products";

        if (selectedCategory) {
          url += `/category/${selectedCategory}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");

        let data = await response.json();

        // 🔥 **Manually sort products**
        data.sort((a, b) => {
          return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        });

        // 🔥 **Pagination logic**
        setTotalPages(Math.ceil(data.length / productsPerPage));
        const paginatedProducts = data.slice((page - 1) * productsPerPage, page * productsPerPage);
        
        setProducts(paginatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error loading products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, sortOrder, page]); // Re-fetch when category, sorting, or page changes

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        setSelectedCategory,
        setSortOrder,
        loading,
        error,
        page,
        setPage,
        totalPages,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
