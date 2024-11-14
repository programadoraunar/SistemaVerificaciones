"use client";
import React, { useState } from "react";
import CaptchaComponent from "../ui/CaptchaComponent";

function Tets() {
  const [captchaValue, setCaptchaValue] = useState<string>("");

  // Función que se ejecuta cuando el CAPTCHA cambia
  const handleCaptchaChange = (value: string) => {
    setCaptchaValue(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes validar el CAPTCHA junto con otros campos del formulario
    console.log("Captcha ingresado:", captchaValue);
  };
  return (
    <div>
      <h1>Formulario de Registro</h1>
      <form onSubmit={handleSubmit}>
        {/* Otros campos de tu formulario */}

        <CaptchaComponent onChange={handleCaptchaChange} />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Tets;
