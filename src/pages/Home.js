import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Hero from "../components/Hero";
import Product from "../components/Product";

const Home = () => {
  const { products, categories, setSelectedCategory, setSortOrder, loading, error, page, setPage, totalPages } = useContext(ProductContext);

  return (
    <div>
      <Hero />

      {/* Filter & Sorting Bar */}
      <div className="bg-white/20 backdrop-blur-md py-6 px-8 rounded-xl shadow-lg flex flex-wrap justify-center items-center gap-6 my-6 mx-auto max-w-4xl border border-white/30">
        {/* Category Filters */}
        <select
          className="px-4 py-2 border rounded-lg bg-gray-100 shadow-md text-gray-700 transition duration-300 hover:bg-gray-200 focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        {/* Sorting Buttons */}
        <div className="flex gap-4">
          <button
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-md transition duration-300 transform hover:scale-105 hover:from-purple-500 hover:to-purple-700"
            onClick={() => setSortOrder("asc")}
          >
            Price: Low to High
          </button>
          <button
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-md transition duration-300 transform hover:scale-105 hover:from-pink-500 hover:to-pink-700"
            onClick={() => setSortOrder("desc")}
          >
            Price: High to Low
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-center text-red-500 font-semibold text-lg my-6">
          {error}
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-12">
          <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* No Products Found Message */}
      {!loading && products.length === 0 && !error && (
        <div className="text-center text-gray-500 text-lg font-semibold my-12">
          No products found.
        </div>
      )}

      {/* Product Listings */}
      {!loading && !error && products.length > 0 && (
        <section id="products" className="py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
              {products.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 space-x-4">
              <button
                className={`px-6 py-3 rounded-lg shadow-md text-white font-semibold transition duration-300 ${
                  page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'
                }`}
                onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                disabled={page === 1}
              >
                ← Previous
              </button>
              <span className="px-5 py-3 bg-gray-100 rounded-lg shadow-md font-semibold text-lg text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                className={`px-6 py-3 rounded-lg shadow-md text-white font-semibold transition duration-300 ${
                  page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'
                }`}
                onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next →
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
