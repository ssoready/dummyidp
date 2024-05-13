import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SSOPage } from "@/pages/SSOPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/apps/:appId/sso" element={<SSOPage />} />
      </Routes>
    </BrowserRouter>
  );
}
