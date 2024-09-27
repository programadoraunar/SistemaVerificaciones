import React from "react";

interface CardsProps {
  title: string;
  value: number;
  text: string;
  icon: React.ReactNode; // Puedes pasar un ícono como componente o JSX
}

const Cards: React.FC<CardsProps> = ({ title, value, text, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg px-6 py-5 flex flex-col space-x-4">
      <div className="flex justify-between w-full">
        <div className="flex-shrink-0 text-blue-zodiac-950">{icon}</div>
        <div className="flex flex-col text-end">
          <p className="text-md">{title}</p>
          <span className="font-bold text-2xl">{value}</span>
        </div>
      </div>
      <div className="border-t-2 pt-2 my-5">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Cards;
