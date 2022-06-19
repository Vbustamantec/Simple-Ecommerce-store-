import { createRoot } from "react-dom/client";

import { GlobalContextProvider } from "./context/GlobalContextProvider";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
);
