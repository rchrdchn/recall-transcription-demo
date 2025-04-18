import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/">
              {darkMode ? (
                <img
                  width="108"
                  loading="lazy"
                  alt=""
                  src="https://cdn.prod.website-files.com/620d732b1f1f7b244ac89f0e/66c1f6a9a8b687fd5181e167_logo.svg"
                  className="logo-light"
                />
              ) : (
                <img
                  width="108"
                  loading="lazy"
                  alt="Recall.ai logo"
                  src="https://cdn.prod.website-files.com/620d732b1f1f7b244ac89f0e/66b294e51ee15f18dd2b171e_recall-logo.svg"
                  className="logo-dark"
                />
              )}
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://docs.recall.ai"
              target="_blank"
              className="flex mr-4"
              rel="noreferrer"
            >
              <div className="text-gray-900 dark:text-white">
                <p>API Docs</p>
              </div>
              {darkMode ? (
                <img
                  src="https://cdn.prod.website-files.com/620d732b1f1f7b244ac89f0e/66c2007505674a449fc3f6ec_arrow-up-right-inverted.svg"
                  loading="lazy"
                  alt="API Docs"
                />
              ) : (
                <img
                  src="https://cdn.prod.website-files.com/620d732b1f1f7b244ac89f0e/66b295b81c2b6822fd45ae62_icon-arrow-up-right.svg"
                  loading="lazy"
                  alt="API Docs"
                />
              )}
            </a>
            <button
              onClick={toggleDarkMode}
              className={`${
                darkMode
                  ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                  : "bg-blue-800 dark:hover:bg-blue-900 text-white"
              } p-2 rounded-full focus:outline-none transition-colors duration-300`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
