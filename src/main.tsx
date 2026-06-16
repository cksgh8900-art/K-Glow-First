import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress specific unwanted browser alert popups from external scripts/integrations
if (typeof window !== 'undefined') {
  const originalAlert = window.alert;
  window.alert = function (message) {
    const msgStr = String(message || '');
    if (msgStr.includes('구글 시트') || msgStr.includes('접수되었습니다')) {
      console.log('Suppressed unwanted alert popup:', message);
      return;
    }
    return originalAlert.apply(this, arguments as any);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
