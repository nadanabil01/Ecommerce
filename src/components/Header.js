import React, { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { BsBag, BsPlus } from "react-icons/bs";
import Logo from "../img/logo.svg";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/">
          <img className="w-[40px]" src={Logo} alt="Logo" />
        </Link>

        {/* Right Section (Cart + Create Product) */}
        <div className="flex items-center gap-4">
          {/* Create Product Button */}
          <Link to="/create-product">
            <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 
                               text-white px-5 py-2 rounded-full shadow-lg 
                               hover:scale-105 transition-all duration-300">
              <BsPlus className="text-2xl" />
              <span className="hidden sm:inline font-semibold">Add Products</span>
            </button>
          </Link>

          {/* Cart Icon */}
          <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex relative">
            <BsBag className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] 
                           text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
