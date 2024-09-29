import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SSOPage } from "@/pages/SSOPage";
import { HomePage } from "@/pages/HomePage";
import { ViewAppPage } from "@/pages/ViewAppPage";
import { Page } from "@/components/Page";
import { InstantSetupPage } from "@/pages/InstantSetupPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/instant-setup" element={<InstantSetupPage />} />
          <Route path="/apps/:appId/sso" element={<SSOPage />} />
          <Route path="/" element={<HomePage />} />

          <Route path="/" element={<Page />}>
            <Route path="/apps/:appId" element={<ViewAppPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
