import { PlusGridItem, PlusGridRow } from "@/components/PlusGrid";
import Link from "next/link";

const links = [
  { href: "https://ssoready.com", label: "Docs" },
  { href: "https://ssoready.com", label: "SSOReady" },
];

function DesktopNav() {
  return (
    <nav className="relative hidden lg:flex">
      {links.map(({ href, label }) => (
        <PlusGridItem key={href} className="relative flex">
          <Link
            href={href}
            className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%]"
          >
            {label}
          </Link>
        </PlusGridItem>
      ))}
    </nav>
  );
}

export default function Navbar({ banner }: { banner?: string }) {
  return (
    <div className="px-8">
      <div className="mx-auto max-w-7xl mt-12">
        <div>
          <PlusGridRow className="relative flex justify-between">
            <div className="relative flex gap-6">
              <PlusGridItem className="py-3">
                <Link href="/" title="Home">
                  logo here
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