import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaChevronDown, FaChevronUp, FaTimes, FaBars } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  // State management
  const [isCollegeOpen, setIsCollegeOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [activeCollege, setActiveCollege] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navRef = useRef(null);

  // Data - Updated to match edusparkglobal.com structure
  const colleges = [
    "Amity University",
    "NMIMS University", 
    "D.Y. Patil University"
  ];

  const courseData = [
    {
      college: "UPES Online",
      courses: [
        {
          name: "Engineering",
          programs: ["B.Tech", "M.Tech", "Ph.D"]
        },
        {
          name: "Business",
          programs: ["BBA", "MBA", "Executive MBA"]
        }
      ]
    },
    {
      college: "Amity University",
      courses: [
        {
          name: "Computer Science",
          programs: ["B.Sc", "M.Sc", "PhD"]
        },
        {
          name: "Medicine",
          programs: ["MBBS", "MD", "MS"]
        }
      ]
    },
    {
      college: "NPTC Group of Colleges",
      courses: [
        {
          name: "Vocational",
          programs: ["Diploma", "Certificate"]
        }
      ]
    }
  ];

  const moreItems = [
    "About Us",
    "SGPA to CGPA Percentage"
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsCollegeOpen(false);
        setIsCoursesOpen(false);
        setActiveCollege(null);
        setActiveCourse(null);
        setIsMoreOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      ref={navRef}
      className="bg-white shadow-lg w-full fixed top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              className="h-10"
              src="https://edukyu.com/assets/cxp-assets/logo/logo.png" 
              alt="Edukyu Logo"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {/* Colleges Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCollegeOpen(true)}
              onMouseLeave={() => setIsCollegeOpen(false)}
            >
              <button className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium">
                Colleges
                <motion.span
                  animate={{ rotate: isCollegeOpen ? 180 : 0 }}
                  className="ml-1"
                >
                  <FaChevronDown className="h-3 w-3" />
                </motion.span>
              </button>

              <AnimatePresence>
                {isCollegeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50"
                  >
                    {colleges.map((college) => (
                      <a
                        key={college}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {college}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Full-screen Courses Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium"
                onMouseEnter={() => setIsCoursesOpen(true)}
              >
                Courses
                <motion.span
                  animate={{ rotate: isCoursesOpen ? 180 : 0 }}
                  className="ml-1"
                >
                  <FaChevronDown className="h-3 w-3" />
                </motion.span>
              </button>

              <AnimatePresence>
                {isCoursesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="fixed left-0 right-0 top-16 bg-white shadow-xl z-40 h-[calc(100vh-4rem)] overflow-y-auto"
                    onMouseLeave={() => {
                      setIsCoursesOpen(false);
                      setActiveCollege(null);
                      setActiveCourse(null);
                    }}
                  >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                      <div className="grid grid-cols-12 gap-8">
                        {/* Column 1: Categories */}
                        <div className="col-span-3">
                          <h3 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">Colleges</h3>
                          <ul className="space-y-2">
                            {courseData.map((college) => (
                              <li key={college.college}>
                                <button
                                  onClick={() => {
                                    setActiveCollege(college);
                                    setActiveCourse(null);
                                  }}
                                  className={`w-full text-left p-3 rounded-lg text-gray-800 hover:bg-blue-50 transition-colors ${
                                    activeCollege?.college === college.college ? 'bg-blue-50 font-medium' : ''
                                  }`}
                                >
                                  {college.college}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Column 2: Courses */}
                        <div className="col-span-3">
                          <h3 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">Courses</h3>
                          {activeCollege ? (
                            <ul className="space-y-2">
                              {activeCollege.courses.map((course) => (
                                <li key={course.name}>
                                  <button
                                    onClick={() => setActiveCourse(course)}
                                    className={`w-full text-left p-3 rounded-lg text-gray-800 hover:bg-blue-50 transition-colors ${
                                      activeCourse?.name === course.name ? 'bg-blue-50 font-medium' : ''
                                    }`}
                                  >
                                    {course.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 p-3">Select a college</p>
                          )}
                        </div>

                        {/* Column 3: Programs */}
                        <div className="col-span-6">
                          <h3 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">Programs</h3>
                          {activeCourse ? (
                            <div className="grid grid-cols-2 gap-4">
                              {activeCourse.programs.map((program) => (
                                <a
                                  key={program}
                                  href="#"
                                  className="block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                >
                                  <h4 className="font-medium text-gray-900">{program}</h4>
                                  <p className="text-sm text-gray-500 mt-1">View details</p>
                                </a>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 p-3">Select a course</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Links */}
            <a href="#" className="px-3 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium">
              Compare
            </a>
            <a href="#" className="px-3 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium">
              Blogs
            </a>
            <a href="#" className="px-3 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium">
              Contact
            </a>

            {/* More Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <button className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium">
                More
                <motion.span
                  animate={{ rotate: isMoreOpen ? 180 : 0 }}
                  className="ml-1"
                >
                  <FaChevronDown className="h-3 w-3" />
                </motion.span>
              </button>

              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50"
                  >
                    {moreItems.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Refer & Earn */}
            <a
              href="#"
              className="flex items-center px-3 py-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <RiCoupon2Line className="mr-2" />
              Refer & Earn
            </a>

            {/* Search */}
            <div className="relative">
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

          {/* Mobile menu button */}
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

      {/* Mobile menu */}
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
                    {colleges.map((college) => (
                      <a
                        key={college}
                        href="#"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                      >
                        {college}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Courses Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  Courses
                  {isCoursesOpen ? (
                    <FaChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <FaChevronDown className="ml-1 h-4 w-4" />
                  )}
                </button>
                {isCoursesOpen && (
                  <div className="pl-4 py-2 space-y-1">
                    {courseCategories.map((category) => (
                      <div key={category.name} className="mb-4">
                        <h3 className="font-bold">{category.name}</h3>
                        {category.courses.map((course) => (
                          <div key={course.name} className="ml-4">
                            <h4 className="font-medium">{course.name}</h4>
                            <ul className="ml-4">
                              {course.programs.map((program) => (
                                <li key={program}>
                                  <a href="#">{program}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Mobile Links */}
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
                    {moreItems.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Refer & Earn */}
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