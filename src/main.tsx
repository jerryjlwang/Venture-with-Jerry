import { createRoot } from 'react-dom/client';
import TerminalThemeProvider from '@/components/TerminalThemeProvider';
import {
  applyTerminalTheme,
  getInitialTerminalTheme,
} from '@/lib/terminalTheme';
import App from './App.tsx';
import './index.css';
import './home.css';

const initialTheme = getInitialTerminalTheme();
applyTerminalTheme(initialTheme);

createRoot(document.getElementById('root')!).render(
  <TerminalThemeProvider initialTheme={initialTheme}>
    <App />
  </TerminalThemeProvider>
);
