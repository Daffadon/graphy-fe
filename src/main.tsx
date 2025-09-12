import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./routes/routes.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import TanstackProvider from "./lib/provider/TanstackProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <TanstackProvider>
    <Router />
    <Toaster position="top-center" richColors />
  </TanstackProvider>
);
