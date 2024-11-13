import React, { useState } from "react";
import { motion } from "framer-motion";

interface ExpandingButtonProps {
  buttonText: string; // Asegura que 'buttonText' sea una cadena
  expandedContent: React.ReactNode; // Permite que 'expandedContent' sea cualquier tipo de contenido React (texto, elementos, etc.)
}
const ExpandingButton: React.FC<ExpandingButtonProps> = ({
  buttonText,
  expandedContent,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        className={`py-4 px-10 rounded-b-lg bg-blue-zodiac-950 cursor-pointer transition-all duration-300 text-white ${
          expanded ? "w-full" : "w-full lg:w-80"
        }`}
        onClick={handleClick}
      >
        {expanded ? "Cerrar" : buttonText}
      </motion.button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div>{expandedContent}</div>
      </motion.div>
    </div>
  );
};

export default ExpandingButton;
