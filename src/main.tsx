import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preloadCriticalImages, warmImageCache } from './lib/imagePreloader'

// Start preloading critical images immediately
preloadCriticalImages();
warmImageCache();

createRoot(document.getElementById("root")!).render(<App />);
