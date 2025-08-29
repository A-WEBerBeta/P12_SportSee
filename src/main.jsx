import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import User from "./pages/User";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/user/:id" element={<User />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
