"use client";

import { Button } from "@/components/ui/button";
import { App } from "@/lib/app";
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

export function SimulateLoginButton({ app }: { app: App | undefined }) {
  const disabled = !app?.spAcsUrl || !app?.spEntityId;

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
            href={`/apps/${app?.id}/login`}
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
            Configure SAML SP Settings first.
          </div>
        )}
      </div>
    </>
  );
}
