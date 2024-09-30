"use client";

import { Button } from "@/components/ui/button";
import { App } from "@/app/app";
import {
  autoUpdate,
  offset,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function SimulateLoginButton({ app }: { app: App }) {
  const disabled = !app.spAcsUrl || !app.spEntityId;

  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    placement: "top",
    middleware: [offset(8)],
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
    useFocus(context),
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        <Button asChild>
          <Link
            href={`/apps/${app.id}/login`}
            aria-disabled={disabled}
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
          >
            Simulate SAML Login
          </Link>
        </Button>
      </div>

      <div
        ref={refs.setFloating}
        {...getFloatingProps()}
        style={floatingStyles}
      >
        {disabled && open && (
          <div className="pointer-events-none bg-black rounded-sm text-white text-xs max-w-[400px] p-2">
            You can only simulate a login once you've configured an SP ACS URL
            and SP Entity ID.
          </div>
        )}
      </div>
    </>
  );
}
