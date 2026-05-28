import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Cria favicon com fundo branco dinamicamente
const setupWhiteFavicon = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 128, 128);

  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 128, 128);
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = canvas.toDataURL("image/png");
    }
  };
  img.src = "/icone.webp";
};

// Altera título da aba de forma intermitente quando o usuário sai (Blinking Effect)
const setupTabSlogan = () => {
  let originalTitle = document.title;
  let intervalId: number | undefined;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      originalTitle = document.title;
      let isAlt = false;
      intervalId = window.setInterval(() => {
        document.title = isAlt ? originalTitle : "SOLICITE SUA COTAÇÃO!!!";
        isAlt = !isAlt;
      }, 800); // Pisca a cada 800ms
    } else {
      if (intervalId) clearInterval(intervalId);
      document.title = originalTitle;
    }
  });
};

setupWhiteFavicon();
setupTabSlogan();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
