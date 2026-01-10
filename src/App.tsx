
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import About from "./pages/About";
import Golf from "./pages/Golf";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  useAnalytics();

  const location = useLocation();
  const isPostDetail =
    location.pathname.startsWith("/posts/") && location.pathname !== "/posts";
  const isGolfPage = location.pathname === "/golf";

  return (
    <div
      className={`min-h-screen flex flex-col ${isGolfPage ? "bg-green-950" : "bg-slate-900"}`}
    >
      {!isPostDetail && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/golf" element={<Golf />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
