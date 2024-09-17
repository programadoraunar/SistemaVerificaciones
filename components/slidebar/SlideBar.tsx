"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CiMenuFries, CiMenuBurger } from "react-icons/ci";
import { MdHome, MdDashboard } from "react-icons/md"; // Importa el ícono de Dashboard

function SlideBar() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div>
      <>
        <div
          className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[35%] lg:w-[30%] xl:w-auto h-full top-0 bg-blue-zodiac-950 p-4 flex flex-col justify-between z-50 slider-bar-container ${
            showMenu ? "left-0" : "-left-full"
          } transition-all`}
        >
          <div className="p-3">
            <ul>
              <li className="text-lg py-2 px-4 text-gray-200">Menu</li>
            </ul>
            <ul>
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-4 py-2 px-4 rounded-lg text-yellowBase hover:text-blue-zodiac-950 hover:bg-yellowBase transition-colors lg:text-sm xl:text-lg"
                >
                  <MdDashboard className="text-xl" /> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/inicio"
                  className="flex items-center gap-4 py-2 px-4 rounded-lg text-yellowBase hover:text-blue-zodiac-950 hover:bg-yellowBase transition-colors lg:text-sm xl:text-lg"
                >
                  <MdHome className="text-xl" /> Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/profecionales"
                  className="flex items-center gap-4 py-2 px-4 rounded-lg text-yellowBase hover:text-blue-zodiac-950 hover:bg-yellowBase transition-colors lg:text-sm xl:text-lg"
                >
                  <MdHome className="text-xl" /> Profecionales
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="xl:hidden fixed bottom-4 right-4 bg-yellowBase text-black p-3 rounded-full z-50"
        >
          {showMenu ? <CiMenuFries /> : <CiMenuBurger />}
        </button>
      </>
    </div>
  );
}

export default SlideBar;
