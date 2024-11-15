"use client";
import React, { useState, useRef, useEffect } from "react";

interface CaptchaProps {
  validate: (isValid: boolean) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ validate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enteredVal, setEnteredVal] = useState("");
  const [captcha, setCaptcha] = useState("");

  // Dibuja el fondo del CAPTCHA
  const drawCaptchaBackground = (ctx: CanvasRenderingContext2D) => {
    for (let x = 0; x < 20; x++) {
      const p1 = Math.random() * 200;
      const p2 = Math.random() * 50;

      ctx.beginPath();
      const hue = Math.random() * 360;
      ctx.strokeStyle = `hsl(${hue},100%,50%)`;

      ctx.moveTo(p1, p2);
      const s = 8 - Math.random() * 8;
      ctx.lineTo(p1 + s, p2 + s);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(p1, p2, 3, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    }
  };

  // Dibuja los caracteres del CAPTCHA
  const drawCaptchaFace = (ctx: CanvasRenderingContext2D) => {
    let str = "";
    for (let i = 0; i < 6; i++) {
      ctx.save();
      const x = 15 + i * 30;
      const hue = Math.random() * 360;
      ctx.fillStyle = `hsl(${hue},50%,50%)`;

      const fontSize = Math.random() * 28 + 20; // Tamaño de fuente más grande
      ctx.font = `bolder ${fontSize}px Arial`;

      const charCode = (() => {
        let code;
        do {
          code = Math.random() * 122;
        } while (
          !(code >= 65 && code <= 90) && // Uppercase
          !(code >= 97 && code <= 122) && // Lowercase
          !(code >= 48 && code <= 57) // Numeric
        );
        return code;
      })();

      const char = String.fromCharCode(charCode);
      str += char;

      ctx.translate(x, 35);
      ctx.rotate(((60 - Math.random() * 120) * Math.PI) / 180);
      ctx.translate(-x, -35);
      ctx.fillText(char, x, 35);
      ctx.restore();
    }
    setCaptcha(str);
  };

  // Redibuja el CAPTCHA
  const redraw = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, 200, 50);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 200, 50);
        drawCaptchaBackground(ctx);
        drawCaptchaFace(ctx);
      }
    }
  };

  useEffect(() => {
    redraw();
  }, []);

  // Verificar CAPTCHA automáticamente
  useEffect(() => {
    const isValid = enteredVal.toUpperCase() === captcha.toUpperCase();
    validate(isValid); // Llama la función de validación del padre
  }, [enteredVal, captcha, validate]);

  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        borderRadius: "5px",
        padding: "10px",
        width: "220px",
        boxSizing: "border-box",
        border: "1px solid #ccc",
      }}
    >
      <canvas
        width="200"
        height="50"
        style={{ borderRadius: "5px" }}
        ref={canvasRef}
      />
      <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
        <input
          style={{
            flex: 1,
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          type="text"
          value={enteredVal}
          placeholder="Enter CAPTCHA"
          onChange={(e) => setEnteredVal(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Captcha;
