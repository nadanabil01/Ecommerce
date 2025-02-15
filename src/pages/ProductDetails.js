import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';
import { scrollToProducts } from "../utils/scrollToProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to navigate between pages
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <section className='h-screen flex justify-center items-center'>
        <div className="text-gray-500 text-lg">Loading...</div>
      </section>
    );
  }

  // Destructure product properties
  const { title, price, description, image } = product;

  return (
    <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
      <div className='container mx-auto'>
        {/* Image and Text Wrapper */}
        <div className='flex flex-col lg:flex-row items-center'>
          {/* Image */}
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img className='max-w-[200px] lg:max-w-sm shadow-lg rounded-xl' src={image} alt={title} />
          </div>

          {/* Text */}
          <div className='flex-1 text-center lg:text-left p-6'>
            <h1 className='text-[26px] font-semibold text-gray-800 mb-2 max-w-[450px] mx-auto'>
              {title}
            </h1>
            <div className='text-xl text-purple-600 font-semibold mb-6'>EGP {price}</div>
            <p className='mb-8 text-gray-600'>{description}</p>

            <div className="flex flex-col gap-4">
              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product, product.id)}
                className='bg-gradient-to-r from-purple-500 to-purple-700 py-3 px-6 text-white rounded-lg shadow-md transition-transform transform hover:scale-105'
              >
                Add to Cart
              </button>

              {/* Back to Products Button */}
              <button
                onClick={() => {
                  navigate('/');
                  setTimeout(scrollToProducts, 100); 
                }}
                className='bg-gray-200 py-3 px-6 text-gray-700 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-gray-300' >
                ← Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
