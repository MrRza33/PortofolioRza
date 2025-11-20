
import React from "react";
import { createRoot } from "react-dom/client";
import AdminLayout from "./app/admin/layout";
import AdminDashboard from "./app/admin/page";
import ProjectsPage from "./app/admin/projects/page";
import BrandsPage from "./app/admin/brands/page";
import LoginPage from "./app/admin/login/page";
import "./app/globals.css";

const App = () => {
  // Basic client-side routing for preview purposes
  const [path, setPath] = React.useState(window.location.pathname);

  // Listen for popstate (browser back/forward)
  React.useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Monkey-patch pushState to detect programmatic navigation (like from Login page)
  React.useEffect(() => {
    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      const result = originalPushState.apply(this, args);
      setPath(window.location.pathname);
      return result;
    };
    return () => {
      window.history.pushState = originalPushState;
    };
  }, []);

  // Hijack links for client-side navigation in preview
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      // Only intercept relative links
      if (link && link.getAttribute("href")?.startsWith("/")) {
        e.preventDefault();
        const href = link.getAttribute("href")!;
        window.history.pushState({}, "", href);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Route Config
  if (path === "/admin/login") {
    return <LoginPage />;
  }

  // Map paths to components
  const renderContent = () => {
    switch (path) {
      case "/admin/projects":
        return <ProjectsPage />;
      case "/admin/brands":
        return <BrandsPage />;
      case "/admin/blog":
        return <div className="p-8 text-center text-gray-500">Blog Module Placeholder</div>;
      case "/admin/experience":
        return <div className="p-8 text-center text-gray-500">Experience Module Placeholder</div>;
      case "/admin/media":
        return <div className="p-8 text-center text-gray-500">Media Library Placeholder</div>;
      case "/admin/pages":
        return <div className="p-8 text-center text-gray-500">Pages Manager Placeholder</div>;
      case "/admin/users":
        return <div className="p-8 text-center text-gray-500">Users Module Placeholder</div>;
      case "/admin/settings":
        return <div className="p-8 text-center text-gray-500">Settings Module Placeholder</div>;
      default:
        // Default to dashboard if path starts with /admin but not matched, or root
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout>
      {renderContent()}
    </AdminLayout>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  // Create root if it doesn't exist (fallback)
  const newRoot = document.createElement("div");
  newRoot.id = "root";
  document.body.appendChild(newRoot);
  createRoot(newRoot).render(<App />);
}
