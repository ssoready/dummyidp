import React from "react";
import { Outlet } from "react-router";

export function Page() {
  return (
    <div>
      <div>
        <div className="mx-auto max-w-6xl flex items-center gap-x-8">
          <img alt="logo" src="/logo.png" className="h-20" />
          <h1 className="text-sm text-muted-foreground">
            DummyIDP is a dumbed-down Identity Provider you can use to test
            Enterprise Single-Sign On for free.
          </h1>
        </div>
      </div>
      <div className="p-8">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
