"use client";
import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 bg-white z-50 flex justify-center items-center"
      initial={{ x: 0 }} // La cortina inicia cubriendo la pantalla
      animate={{ x: "-100vw" }} // Se desplaza hacia la derecha
      transition={{ ease: "easeInOut", duration: 1.5 }} // Transición suave
    >
      <img src="/gif.gif" alt="Cargando..." className="w-[800px]" />
    </motion.div>
  );
};

export default LoadingScreen;
