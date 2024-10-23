"use client";
import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 bg-white z-50 flex justify-center items-center"
      initial={{ x: 0 }} // La cortina inicia cubriendo la pantalla
      animate={{ x: "-100vw" }} // Se desplaza hacia la derecha
      transition={{ ease: "easeInOut", duration: 1.5, delay: 0.7 }} // Transición suave
    >
      <div className="flex flex-col justify-center items-center">
        <span className="text-2xl font-bold">Aunar</span>
        <video
          src="/imagen.mp4" // Cambia esta ruta por la de tu video
          autoPlay
          loop
          muted
          className="w-[800px] object-cover" // Ajusta el tamaño según sea necesario
        >
          Tu navegador no soporta videos.
        </video>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
