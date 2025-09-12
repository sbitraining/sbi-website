"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Twitter,
  Menu,
  X,
  ChevronUp,
  Mail,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname || "/";

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/navigation/about" },
    { label: "Services", href: "/navigation/services", hasDropdown: true },
    { label: "FAQ's", href: "/navigation/faqs" },
    { label: "Gallery", href: "/navigation/gallery" },
    { label: "Contact Us", href: "/navigation/contact" },
  ];

  const serviceItems = [
    {
      label: "Language Training Programs",
      href: "/navigation/services/homecare",
    },
    {
      label: "Caregiver Training Programs",
      href: "/navigation/services/healthcare",
    },
    {
      label: "Career Counseling and Guidance",
      href: "/navigation/services/residentalcare",
    },
    {
      label: "Job Placement Assistance",
      href: "/navigation/services/specialcare",
    },
  ];

  // Function to check if a nav item is active
  const isNavItemActive = (href: string, hasDropdown?: boolean) => {
    if (hasDropdown) {
      // For services dropdown, check if current path starts with the services path
      return currentPath.startsWith("/navigation/services");
    }
    return currentPath === href;
  };

  return (
    <>
      <header className="relative w-full z-50">
        {/* Desktop Design - Hidden on mobile */}
        <div className="hidden md:block">
          {/* ==== Brown background area (taller) ==== */}
          <div className="bg-[#3d3028] w-full h-[180px] relative">
            {/* Top info row inside brown */}
            <div className="max-w-7xl mx-auto px-4 pt-6 flex justify-between items-center text-sm text-gray-300">
              <div className="flex items-center space-x-3">
                <span>Have any questions? Email us</span>
                <div className="flex items-center space-x-1 font-semibold text-white">
                  <Mail className="w-4 h-4 text-[#e7a98b]" />
                  <a href="#" className="hover:underline">
                    sbi.training.cntr@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-gray-300">
                <Link
                  href="/navigation/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/navigation/gallery"
                  className="hover:text-white transition-colors"
                >
                  Success
                </Link>
                <Link
                  href="/navigation/contact"
                  className="hover:text-white transition-colors"
                >
                  Emergency Call
                </Link>
              </div>
            </div>

            {/* ==== White nav card, half inside brown, half outside ==== */}
            <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 px-8 py-8">
                {/* Top Row */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  {/* Logo */}
                  <Link href="/" className="flex items-center mb-6 md:mb-0">
                    <img
                      src="/assets/images/sbilogo.png"
                      alt="Logo"
                      className="w-45 h-30 mr-3"
                    />
                  </Link>

                  {/* Phone & Address */}
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-12 text-center md:text-left">
                    <div className="flex items-center justify-center space-x-3 mb-4 md:mb-0">
                      <div className="w-14 h-14 rounded-full border border-orange-300 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-[#e7a98b]" />
                      </div>
                      <div>
                        <p className="text-sm italic text-gray-500">
                          Phone number:
                        </p>
                        <p className="text-lg font-bold text-gray-800">
                          9761058287, 9709196335
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-14 h-14 rounded-full border border-orange-300 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#e7a98b]" />
                      </div>
                      <div>
                        <p className="text-sm italic text-gray-500">Address:</p>
                        <p className="text-lg font-bold text-gray-800">
                          Basundhara, Kathmandu, Nepal
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 my-6"></div>

                {/* Nav Row */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-8">
                    {navItems.map((item) => (
                      <div key={item.label} className="relative group">
                        <Link
                          href={item.href}
                          className={`font-medium flex items-center space-x-1 transition-colors ${
                            isNavItemActive(item.href, item.hasDropdown)
                              ? "text-[#e7a98b]"
                              : "text-gray-800 hover:text-[#e7a98b]"
                          }`}
                        >
                          <span>{item.label}</span>
                          {item.hasDropdown && (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Link>
                        {item.hasDropdown && (
                          <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-80 z-50">
                            <div className="p-4">
                              <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                                Our Services
                              </h3>
                              <div className="space-y-1">
                                {serviceItems.map((service) => (
                                  <Link
                                    key={service.label}
                                    href={service.href}
                                    className="block p-3 rounded-lg hover:bg-orange-50 transition-colors group/item"
                                  >
                                    <div className="flex items-start space-x-3">
                                      <div className="w-2 h-2 bg-[#e7a98b] rounded-full mt-2 flex-shrink-0"></div>
                                      <div>
                                        <h4 className="font-medium text-gray-800 group-hover/item:text-[#e7a98b] transition-colors">
                                          {service.label}
                                        </h4>
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/profile.php?id=61578858687337"
                      className="text-gray-600 hover:text-[#e7a98b]"
                    >
                      <FaFacebook className="w-5 h-5" />
                    </a>
                    <a
                      href="https://wa.me/9779761058287"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#e7a98b]"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                    </a>

                    <a
                      href="https://www.instagram.com/namastenepalconsultancy/"
                      className="text-gray-600 hover:text-orange-400"
                    >
                      <FaInstagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Design - Fixed logo positioning */}
        <div className="md:hidden bg-white shadow-sm">
          <div className="flex justify-between items-center px-4 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center mb-6 md:mb-0">
              <img
                src="/assets/images/sbilogo.png"
                alt="Logo"
                className="w-45 h-30 mr-3"
              />
            </Link>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded bg-[#e7a98b] text-white hover:bg-[#d4956f] transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay and Sidebar - Fixed positioning and scrolling */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Sidebar - Fixed z-index and positioning */}
          <div className="md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl overflow-y-auto transform translate-x-0 transition-transform duration-300 ease-in-out">
            {/* Header with close button */}
            <div className="sticky top-0 bg-[#e7a98b] h-20 flex items-center justify-center shadow-sm z-10">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 left-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-white text-lg font-semibold">Menu</h2>
            </div>

            {/* Logo Section */}
            <div className="flex justify-center py-6 border-b border-gray-100">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center"
              >
                <img
                  src="/assets/images/sbilogo.png"
                  alt="Logo"
                  className="w-45 h-30 mr-3"
                />
              </Link>
            </div>

            {/* Navigation Menu - Fixed padding and spacing */}
            <div className="px-4 py-4 space-y-1 pb-24">
              {/* Home */}
              <div
                className={`rounded-lg ${
                  isNavItemActive("/") ? "bg-orange-50" : ""
                }`}
              >
                <Link
                  href="/"
                  className={`block py-3 px-4 font-medium text-base transition-colors ${
                    isNavItemActive("/")
                      ? "text-[#e7a98b]"
                      : "text-gray-700 hover:text-[#e7a98b]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </div>

              {/* About Us */}
              <div
                className={`rounded-lg ${
                  isNavItemActive("/navigation/about") ? "bg-orange-50" : ""
                }`}
              >
                <Link
                  href="/navigation/about"
                  className={`block py-3 px-4 font-medium text-base transition-colors ${
                    isNavItemActive("/navigation/about")
                      ? "text-[#e7a98b]"
                      : "text-gray-700 hover:text-[#e7a98b]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </div>

              {/* Services with dropdown */}
              <div
                className={`rounded-lg ${
                  isNavItemActive("/navigation/services", true)
                    ? "bg-orange-50"
                    : ""
                }`}
              >
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className={`w-full flex items-center justify-between py-3 px-4 font-medium text-base transition-colors ${
                    isNavItemActive("/navigation/services", true)
                      ? "text-[#e7a98b]"
                      : "text-gray-700 hover:text-[#e7a98b]"
                  }`}
                >
                  <span>Services</span>
                  {mobileDropdownOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Mobile Services Dropdown - Fixed animation */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileDropdownOpen
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-2 px-4">
                    <div className="bg-gray-50 rounded-lg p-2 space-y-1">
                      {serviceItems.map((service) => (
                        <Link
                          key={service.label}
                          href={service.href}
                          className="block py-2 px-3 text-sm text-gray-600 hover:text-[#e7a98b] hover:bg-white rounded transition-colors"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setMobileDropdownOpen(false);
                          }}
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ's */}
              <div
                className={`rounded-lg ${
                  isNavItemActive("/navigation/faqs") ? "bg-orange-50" : ""
                }`}
              >
                <Link
                  href="/navigation/faqs"
                  className={`block py-3 px-4 font-medium text-base transition-colors ${
                    isNavItemActive("/navigation/faqs")
                      ? "text-[#e7a98b]"
                      : "text-gray-700 hover:text-[#e7a98b]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ&apos;s
                </Link>
              </div>

              {/* Gallery */}
              <div
                className={`rounded-lg ${
                  isNavItemActive("/navigation/gallery") ? "bg-orange-50" : ""
                }`}
              >
                <Link
                  href="/navigation/gallery"
                  className={`block py-3 px-4 font-medium text-base transition-colors ${
                    isNavItemActive("/navigation/gallery")
                      ? "text-[#e7a98b]"
                      : "text-gray-700 hover:text-[#e7a98b]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
              </div>

              {/* Contact Us */}
              <div
                className={`rounded-lg ${
                  isNavItemActive("/navigation/contact") ? "bg-orange-50" : ""
                }`}
              >
                <Link
                  href="/navigation/contact"
                  className={`block py-3 px-4 font-medium text-base transition-colors ${
                    isNavItemActive("/navigation/contact")
                      ? "text-[#e7a98b]"
                      : "text-gray-700 hover:text-[#e7a98b]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Social Media Icons at bottom - Fixed positioning */}
            <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 z-20">
              <div className="flex items-center justify-center space-x-6">
                <a
                  href="#"
                  className="text-[#e7a98b] hover:text-gray-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-[#e7a98b] hover:text-gray-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-[#e7a98b] hover:text-gray-600 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
