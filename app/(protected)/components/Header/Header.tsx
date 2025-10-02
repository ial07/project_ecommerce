"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const Header: React.FC = () => {
  return (
    <div>
      <nav className="flex justify-between items-center px-4 md:px-30 py-3 md:py-5 shadow-sm shadow-[#CBCACA40]">
        <div className="flex items-center gap-2 md:w-40">
          <img src="./icons/Logo.svg" alt="logo" className="w-8 md:w-11 mr-1" />
          <div className="hidden md:inline display-xs font-bold">Shirt</div>
        </div>
        <div className="flex gap-2 md:gap-3 md:w-162">
          <div className="border border-neutral-300 rounded-xl flex items-center gap-2 p-3">
            <img src="./icons/Category-box.svg" alt="logo" className="w-5" />
            <span className="hidden md:inline text-sm me-4">Category</span>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="border border-neutral-300 py-2 px-4 rounded-xl mr-2 w-full"
          />
        </div>
        <div className="relative py-3 pr-2">
          <img
            src="./icons/Shopping-cart.svg"
            alt="shoping-cart"
            className="w-5"
          />
          <div className="w-5 h-5 rounded-full bg-red-500 text-white flex justify-center absolute top-0 right-0">
            1
          </div>
        </div>
        {/* Icon Menu Mobile */}
        <img src="./icons/menu.svg" alt="menu" className="w-6 md:hidden" />
        {/* Button Menu Desktop */}
        <div className="flex items-center gap-2 hidden md:inline">
          <Button className="h-10 dark border w-35">Login</Button>
          <Button className="h-10 w-35">Register</Button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
