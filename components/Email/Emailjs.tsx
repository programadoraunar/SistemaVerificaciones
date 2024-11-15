"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

interface EmailjsProps {
  solicitanteNombre: string;
  solicitanteCorreo: string;
  egresadoNombre: string;
  egresadoDocumento: string;
}

export const Emailjs: React.FC<EmailjsProps> = ({
  solicitanteNombre,
  solicitanteCorreo,
  egresadoNombre,
  egresadoDocumento,
}) => {
  const sendEmail = () => {
    const templateParams = {
      solicitante_nombre: solicitanteNombre,
      solicitante_correo: solicitanteCorreo,
      egresado_nombre: egresadoNombre,
      egresado_documento: egresadoDocumento,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE!,
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE!,
        templateParams,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAIL_JS_ANON_KEY!,
        }
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  // Llamar a sendEmail() al montar el componente o cuando sea necesario
  React.useEffect(() => {
    sendEmail();
  }, []); // Dependencias vacías para que se ejecute solo al montar

  return (
    <div>
      <p>Email enviado a: {solicitanteCorreo}</p>
      <p>Nombre del solicitante: {solicitanteNombre}</p>
      {/* Aquí puedes mostrar otra información o un mensaje de éxito */}
    </div>
  );
};
