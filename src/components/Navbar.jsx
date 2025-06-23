import React from "react";
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaChevronDown, FaChevronUp, FaTimes,FaBars } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isCollegeOpen, setIsCollegeOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsCollegeOpen(false);
        setIsMoreOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close all dropdowns when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Desktop
        setIsCollegeOpen(false);
        setIsMoreOpen(false);
      } else {
        // Mobile
        setMobileMenuOpen(false);
      }
      setSearchOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.nav
      ref={navRef}
      className="bg-white shadow-lg w-full fixed top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-10"
                src="https://edukyu.com/assets/cxp-assets/logo/logo.png"
                alt="Edukyu Logo"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {/* Colleges Dropdown - Hover activated */}
            <div
              className="relative"
              onMouseEnter={() => setIsCollegeOpen(true)}
              onMouseLeave={() => setIsCollegeOpen(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Colleges
                <FaChevronDown className="ml-1 h-3 w-3" />
              </button>

              <AnimatePresence>
                {isCollegeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 z-10 mt-2 w-56 bg-white rounded-md shadow-lg  ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Amity University
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                       NMIMS university
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                       D.y. Patil University
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Regular Nav Links */}
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Online Courses
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Compare
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Blogs
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </a>

            {/* More Dropdown - Hover activated */}
            <div
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                More
                <FaChevronDown className="ml-1 h-3 w-3" />
              </button>

              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 z-10 mt-2 w-56 bg-white rounded-md shadow-lg ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        About Us
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        SGPA to CGPA Percentage
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Refer & Earn */}
            <a
              href="#"
              className="flex items-center text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              <RiCoupon2Line className="mr-2" />
              Refer & Earn
            </a>

            {/* Search */}
            <div className="relative ml-2">
              {searchOpen ? (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 180 }}
                  exit={{ width: 0 }}
                  className="relative"
                >
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search..."
                    className="pl-8 pr-8 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                  <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  onClick={() => setSearchOpen(true)}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-600 hover:text-blue-600 p-2"
                >
                  <FaSearch className="h-5 w-5" />
                </motion.button>
              )}
            </div>
          </div>

          {/* Mobile menu button - Click activated */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-600 hover:text-blue-600 p-2"
            >
              <FaSearch className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 p-2"
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white px-4 py-2 border-t"
          >
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu - Click activated */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Colleges Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCollegeOpen(!isCollegeOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  Colleges
                  {isCollegeOpen ? (
                    <FaChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <FaChevronDown className="ml-1 h-4 w-4" />
                  )}
                </button>
                {isCollegeOpen && (
                  <div className="pl-4 py-2 space-y-1">
                    <a
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    >
                      Engineering Colleges
                    </a>
                    <a
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    >
                      Medical Colleges
                    </a>
                    <a
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    >
                      Management Colleges
                    </a>
                  </div>
                )}
              </div>

              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Online Courses
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Compare
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Blogs
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Contact
              </a>

              {/* Mobile More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  More
                  {isMoreOpen ? (
                    <FaChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <FaChevronDown className="ml-1 h-4 w-4" />
                  )}
                </button>
                {isMoreOpen && (
                  <div className="pl-4 py-2 space-y-1">
                    <a
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    >
                      About Us
                    </a>
                    <a
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    >
                      SGPA to CGPA Percentage
                    </a>
                  </div>
                )}
              </div>

              <a
                href="#"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-gray-50"
              >
                <RiCoupon2Line className="mr-2" />
                Refer & Earn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
