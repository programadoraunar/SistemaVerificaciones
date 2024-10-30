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
      .send("service_bk1vz0a", "template_bajilhw", templateParams, {
        publicKey: "dvTPfnCvNqCnywfFE",
      })
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
