import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { CursorFollower } from "@/components/ui/cursor-follower";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
const Posts = lazy(() => import("./pages/Posts"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const Resume = lazy(() => import("./pages/Resume"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteFallback = () => <div className="min-h-[40vh] bg-slate-950" />;

const AppContent = () => {
  useAnalytics();

  const location = useLocation();
  const isPostDetail =
    location.pathname.startsWith("/posts/") && location.pathname !== "/posts";

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <CursorFollower />
      {!isPostDetail && <Header />}
      <main className="flex-grow">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
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
