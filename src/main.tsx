import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Cria favicon com fundo branco dinamicamente
const setupWhiteFavicon = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 128, 128);
  
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 128, 128);
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = canvas.toDataURL('image/png');
    }
  };
  img.src = '/icone.png';
};

// Altera título da aba quando o usuário sai (Loss Aversion / Catchy)
const setupTabSlogan = () => {
  let originalTitle = document.title;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      originalTitle = document.title;
      document.title = 'VOLTE E FAÇA SEU ORÇAMENTO!';
    } else {
      document.title = originalTitle;
    }
  });
};

setupWhiteFavicon();
setupTabSlogan();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
