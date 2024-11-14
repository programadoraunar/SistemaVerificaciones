"use client";
import React, { useEffect, useState } from "react";
const generateCaptcha = (length: number) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < length; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};
const CaptchaComponent: React.FC<{ onChange: (value: string) => void }> = ({
  onChange,
}) => {
  const [captcha, setCaptcha] = useState<string>(""); // CAPTCHA generado
  const [userInput, setUserInput] = useState<string>(""); // Entrada del usuario
  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean | null>(null); // Estado de validez del CAPTCHA

  // Función para generar un nuevo CAPTCHA
  const refreshCaptcha = () => {
    const newCaptcha = generateCaptcha(6);
    setCaptcha(newCaptcha);
    onChange(newCaptcha); // Propagar el nuevo CAPTCHA al componente padre
    setIsCaptchaValid(null); // Restablecer la validez del CAPTCHA
    setUserInput(""); // Restablecer la entrada del usuario
  };

  useEffect(() => {
    refreshCaptcha(); // Generar el CAPTCHA al montar el componente
  }, []);

  // Función para validar el CAPTCHA ingresado
  const validateCaptcha = () => {
    if (userInput === captcha) {
      setIsCaptchaValid(true); // CAPTCHA válido
    } else {
      setIsCaptchaValid(false); // CAPTCHA incorrecto
      refreshCaptcha(); // Regenerar CAPTCHA si es incorrecto
    }
  };

  useEffect(() => {
    // Cuando el CAPTCHA cambie, el componente padre lo recibirá
    onChange(captcha);
  }, [captcha, onChange]);

  return (
    <div className="mb-4 w-[300px]">
      <div className="text-2xl font-bold border border-gray-300 rounded p-2 text-center bg-gray-100">
        {captcha}
      </div>
      <div className="mt-2">
        <input
          type="text"
          placeholder="Ingrese el código"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)} // Actualizar entrada del usuario
          onBlur={validateCaptcha} // Validar CAPTCHA al salir del campo
          className="p-2 border border-gray-300 rounded"
        />
        {isCaptchaValid === false && (
          <p className="text-red-500 text-sm mt-2">
            El código es incorrecto, por favor intente de nuevo.
          </p>
        )}
        {isCaptchaValid === true && (
          <p className="text-green-500 text-sm mt-2">El código es correcto.</p>
        )}
      </div>
      <div className="mt-2">
        <button
          onClick={refreshCaptcha} // Regenerar CAPTCHA si es necesario
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          Regenerar código
        </button>
      </div>
    </div>
  );
};

export default CaptchaComponent;
