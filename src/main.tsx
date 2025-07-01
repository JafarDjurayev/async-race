import { StrictMode } from 'react';
import { RouterWrapper } from './routes/router.tsx';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterWrapper>
      <App />
    </RouterWrapper>
  </StrictMode>
);
