import { PlusGridItem, PlusGridRow } from "@/components/PlusGrid";
import Link from "next/link";
import Image from "next/image";
import wordmark from "@/wordmark.svg";
import React from "react";
import { InlineCreateAppLink } from "@/components/CreateAppButton";

const links = [
  { href: "https://ssoready.com/docs/dummyidp", label: "Docs" },
  { href: "https://github.com/ssoready/dummyidp", label: "GitHub" },
  { href: "https://ssoready.com", label: "SSOReady" },
];

function DesktopNav() {
  return (
    <nav className="relative hidden lg:flex">
      {links.map(({ href, label }) => (
        <PlusGridItem key={href} className="relative flex">
          <Link
            href={href}
            className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply hover:bg-black/[2.5%]"
          >
            {label}
          </Link>
        </PlusGridItem>
      ))}
      <PlusGridItem className="relative flex">
        <InlineCreateAppLink>
          <div className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply hover:bg-black/[2.5%]">
            Create a DummyIDP App
          </div>
        </InlineCreateAppLink>
      </PlusGridItem>
    </nav>
  );
}

export default function Navbar({ banner }: { banner?: React.ReactNode }) {
  return (
    <div className="px-8">
      <div className="mx-auto max-w-7xl mt-12">
        <div>
          <PlusGridRow className="relative flex justify-between">
            <div className="relative flex gap-6">
              <PlusGridItem className="items-center flex">
                <Link href="/" title="Home">
                  <Image
                    src={wordmark}
                    alt="wordmark"
                    className="h-12 w-auto"
                  />
                </Link>
              </PlusGridItem>
              {banner && (
                <div className="relative hidden items-center py-3 lg:flex">
                  {banner}
                </div>
              )}
            </div>
            <DesktopNav />
          </PlusGridRow>
        </div>
      </div>
    </div>
  );
}
