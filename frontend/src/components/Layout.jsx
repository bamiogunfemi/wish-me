import { useState, useEffect } from "react";
import { Navbar, Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FiSun, FiMoon, FiPlus, FiMenu } from "react-icons/fi";

const Layout = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("darkMode") === "true" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-[#000000] dark:text-gray-100 transition-colors">
            {/* Navbar */}
            <Navbar
                fluid
                className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#000000] px-4 py-2.5 shadow-sm"
            >
                <div className="flex items-center justify-between w-full">
                    {/* Left section: Logo & Desktop Nav */}
                    <div className="flex items-center gap-8">
                        <Navbar.Brand as={Link} to="/" className="flex-shrink-0">
                            <span className="whitespace-nowrap text-xl font-bold">
                                Birthday Wishes
                            </span>
                        </Navbar.Brand>

                        <div className="hidden md:flex items-center gap-6">
                            <Link
                                to="/"
                                className={`transition-colors ${isActive("/")
                                    ? "font-medium text-pink-600 dark:text-pink-500"
                                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
                                    }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/birthdays"
                                className={`transition-colors ${isActive("/birthdays")
                                    ? "font-medium text-pink-600 dark:text-pink-500"
                                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
                                    }`}
                            >
                                Birthdays
                            </Link>
                        </div>
                    </div>

                    {/* Right section: Dark Mode Toggle, Create Button, Mobile Menu */}
                    <div className="flex items-center gap-2">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                            aria-label={
                                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                            }
                        >
                            {isDarkMode ? (
                                <FiSun className="h-5 w-5" />
                            ) : (
                                <FiMoon className="h-5 w-5" />
                            )}
                        </button>

                        {/* Create Button (Desktop) */}
                        <Link to="/create" className="hidden sm:inline-flex">
                            <Button color={isDarkMode ? "white" : "black"} className="gap-1 border flex items-center border-gray-400
                text-gray-700 dark:text-gray-200
                dark:border-gray-500
                hover:bg-gray-100 dark:hover:bg-gray-700">
                                <FiPlus className="h-4 w-4 mr-1 mt-0.5" />
                                Create
                            </Button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
                            aria-label="Toggle navigation menu"
                        >
                            <FiMenu className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-2 py-2 space-y-1">
                        <Link
                            to="/"
                            className={`block px-3 py-2 rounded-md text-base font-medium
                ${isActive("/")
                                    ? "bg-pink-600 text-white"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/birthdays"
                            className={`block px-3 py-2 rounded-md text-base font-medium
                ${isActive("/birthdays")
                                    ? "bg-pink-600 text-white"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Birthdays
                        </Link>
                        <Link
                            to="/create"
                            className={`block px-3 py-2 rounded-md text-base font-medium 
                ${isActive("/create")
                                    ? "bg-pink-600 text-white"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Create
                        </Link>
                    </div>
                )}
            </Navbar>

            {/* Main Content */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <footer className="py-4 px-6 text-center text-sm border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#000000]">
                <p className="text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} Arafah Ogunfemi
                </p>
            </footer>
        </div>
    );
};

export default Layout;
