import React, { useState } from "react";
// import { a } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <a href="/" className="flex-shrink-0 flex items-center">
              <span className="text-gray-800 font-semibold text-lg">Home</span>
            </a>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <a
                href="#gallery"
                className="ml-10 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
              >
                Gallery
              </a>
              <a
                rel="noreferrer noopener"
                target="_blank"
                href="https://github.com/1dominik7"
                className="ml-10 bg-[#7e89fd] hover:bg-[#6c78fe] text-white font-bold px-10 py-2 rounded-md inline-block cursor-pointer"
              >
                Take It Now
              </a>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                {isOpen ? (
                  <FaTimes className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <FaBars className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
          >
            About
          </a>
          <a
            href="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
