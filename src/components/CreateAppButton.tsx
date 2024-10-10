"use client";

import { createApp } from "@/app/actions";
import { useState } from "react";
import { SymbolIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

export default function CreateAppButton() {
  const [loading, setLoading] = useState(false);
  return (
    <div
      className={clsx(
        "cursor-pointer inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)] rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-medium text-white disabled:bg-gray-950 hover:bg-gray-800 disabled:opacity-40",
        loading && "opacity-40",
      )}
      onClick={() => {
        setLoading(true);
        createApp();
      }}
    >
      Get started
      {loading && <SymbolIcon className="ml-2 h-4 w-4 animate-spin" />}
    </div>
  );
}

export function InlineCreateAppLink({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <span className="cursor-pointer" onClick={() => createApp()}>
      {children}
    </span>
  );
}
