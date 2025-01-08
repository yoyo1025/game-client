import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "./components/Home";
import { user } from "./components/Home";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <StrictMode>
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <App />
      </UserContext.Provider>
    </BrowserRouter>
  // </StrictMode>
);