"use client";
import React from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaFacebook, FaInstagram, FaSnapchat } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <ToastContainer />
      <nav className="fixed bg-[#18191E] w-full h-16 shadow-xl border-b-1 z-40 border-b-white border-b-2 border-blue-600">
        <div className="text-white flex justify-between items-center z-50 h-full w-full px-4 sm:px-8 2xl:px-16">
          <Link href={"/"} className="text-2xl md:text-3xl font-semibold">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-indigo-600">
              PAWAN
            </span>
          </Link>
          <div>
            <ul className="hidden md:flex text-white">
              <Link href="/">
                <li className="ml-10 uppercase text-base lg:text-xl hover:text-violet-500">
                  Home
                </li>
              </Link>
              <Link href="#about">
                <li className="ml-10 uppercase text-base lg:text-xl hover:text-violet-500">
                  About
                </li>
              </Link>
              <Link href="#projects">
                <li className="ml-10 uppercase text-base lg:text-xl hover:text-violet-500">
                  Projects
                </li>
              </Link>
              <Link href="#contact">
                <li className="ml-10 uppercase text-base lg:text-xl hover:text-violet-500">
                  Contact
                </li>
              </Link>
            </ul>
          </div>
          <div className="hidden md:block">
            <Link href="/login">
              <button className="bg-blue-500 py-1 px-3 rounded">Login</button>
            </Link>
          </div>
          <div
            onClick={handleNav}
            className="md:hidden pl-24 mx-2 text-white cursor-pointer"
          >
            <AiOutlineMenu size={25} />
          </div>
        </div>
        <div
          className={
            menuOpen
              ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-[#18191E] text-white p-10 ease-in duration-500"
              : "fixed left-[-100%] h-screen top-0 p-10 ease-in duration-500"
          }
        >
          <div className="flex w-full items-center justify-end">
            <div onClick={handleNav} className="cursor-pointer">
              <AiOutlineClose size={25} />
            </div>
          </div>
          <div className="flex-col py-4">
            <ul>
              <Link href="/login">
                <li
                  onClick={handleNav}
                  className="py-4 px-3 uppercase text-blue-500 cursor-pointer"
                >
                  Login
                </li>
              </Link>
              <Link href="/">
                <li
                  onClick={handleNav}
                  className="py-4 px-3 uppercase cursor-pointer"
                >
                  Home
                </li>
              </Link>
              <Link href="#about">
                <li
                  onClick={handleNav}
                  className="py-4 px-3 uppercase cursor-pointer"
                >
                  About
                </li>
              </Link>
              <Link href="#projects">
                <li
                  onClick={handleNav}
                  className="py-4 px-3 uppercase cursor-pointer"
                >
                  Projects
                </li>
              </Link>
              <Link href="#contact">
                <li
                  onClick={handleNav}
                  className="py-4 px-3 uppercase cursor-pointer"
                >
                  Contact
                </li>
              </Link>
            </ul>
          </div>
          <div className="flex flex-row justify-around pt-10 items-center">
            <Link href="https://facebook.com" target="_blank">
              <FaFacebook size={30} className="cursor-pointer" />
            </Link>
            <Link href="https://www.instagram.coms" target="_blank">
              <FaInstagram size={30} className="cursor-pointer" />
            </Link>
            <Link href="https://www.snapchat.com" target="_blank">
              <FaSnapchat size={30} className="cursor-pointer" />
            </Link>
          </div>
          {/* <Link
          href={"/"}
          className="text-2xl md:text-5xl text-white font-semibold"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-600 to-primary-400">
            PAWAN
          </span>
        </Link> */}
        </div>
      </nav>
    </>
  );
};

export default Header;
