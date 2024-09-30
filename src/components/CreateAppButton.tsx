"use client";

import { createApp } from "@/app/actions";

export default function CreateAppButton() {
  return (
    <a
      className="inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)] rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-medium text-white data-[disabled]:bg-gray-950 data-[hover]:bg-gray-800 data-[disabled]:opacity-40"
      onClick={() => createApp()}
      href="#"
    >
      Get started
    </a>
  );
}
