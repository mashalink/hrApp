import { Suspense } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";
import RouteFallback from "./RouteFallback.jsx";

export default function Layout() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
