import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SSOPage } from "@/pages/SSOPage";
import { HomePage } from "@/pages/HomePage";
import { ViewAppPage } from "@/pages/ViewAppPage";
import { Page } from "@/components/Page";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/apps/:appId" element={<ViewAppPage />} />
          <Route path="/apps/:appId/sso" element={<SSOPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
