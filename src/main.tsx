import React from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.tsx";
import { holdEntryAnimations } from "./lib/entry-animations";
import "./index.css";
import "./i18n";

const container = document.getElementById("root")!;

// Les pages sont prerendues : le contenu est deja peint. Voir entry-animations.
holdEntryAnimations(container);

createRoot(container).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);
