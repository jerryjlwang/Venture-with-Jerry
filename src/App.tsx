import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import TerminalThemeToggle from "@/components/TerminalThemeToggle";
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
const Posts = lazy(() => import("./pages/Posts"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const Resume = lazy(() => import("./pages/Resume"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteFallback = () => <div className="min-h-[40vh] bg-slate-950" />;

const AppContent = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isResume = location.pathname === "/resume";
  const isTerminalPage = isHome || isResume;
  const isPostDetail =
    location.pathname.startsWith("/posts/") && location.pathname !== "/posts";

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isTerminalPage ? "bg-terminal-bg" : "bg-slate-900"
      }`}
    >
      {!isHome && !isPostDetail && <Header terminal={isResume} />}
      <main className="flex-grow">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isHome && <Footer transparent={isResume} terminal={isResume} />}
      {isTerminalPage && <TerminalThemeToggle />}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
    <Analytics />
  </BrowserRouter>
);

export default App;
