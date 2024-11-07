"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CiMenuFries, CiMenuBurger } from "react-icons/ci";
import { FaBookOpen, FaTools } from "react-icons/fa";
import { MdDashboard } from "react-icons/md"; // Importa el ícono de Dashboard
import { PiStudent } from "react-icons/pi";
import { FaWpforms } from "react-icons/fa6";
import { IoInformationCircleSharp } from "react-icons/io5";

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
              <li className="text-xl lg:text-lg py-2 px-4 text-gray-200">
                Menu
              </li>
            </ul>
            <ul className="flex flex-col space-y-2">
              {[
                {
                  href: "/dashboard",
                  label: "Panel de Control",
                  icon: <MdDashboard />,
                },
                {
                  href: "/profesionales",
                  label: "Profesionales",
                  icon: <PiStudent />,
                },
                {
                  href: "/tecnicos",
                  label: "Técnicos Laborales",
                  icon: <FaTools />,
                },
                {
                  href: "/extension",
                  label: "Extensión",
                  icon: <FaBookOpen />,
                },
                {
                  href: "/adminCampos",
                  label: "Administración",
                  icon: <FaWpforms />,
                },
                {
                  href: "/informes",
                  label: "Informes",
                  icon: <IoInformationCircleSharp />,
                },
              ].map(({ href, label, icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center text-lg lg:text-md xl:text-lg gap-3 py-2 px-4 rounded-lg text-yellowBase hover:text-blue-zodiac-950 hover:bg-yellowBase transition-colors"
                  >
                    {React.cloneElement(icon, {
                      className: "text-lg lg:text-xl xl:text-2xl",
                    })}
                    <span className="lg:text-sm xl:text-base">{label}</span>
                    {/* El texto solo es visible en pantallas grandes */}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="xl:hidden fixed bottom-4 right-4 bg-yellowBase text-white p-5 rounded-full z-50"
        >
          {showMenu ? <CiMenuFries size={25} /> : <CiMenuBurger size={25} />}
        </button>
      </>
    </div>
  );
}

export default SlideBar;
