import { PlusGridItem, PlusGridRow } from "@/components/PlusGrid";
import Link from "next/link";

function SocialIconX(props: any) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M12.6 0h2.454l-5.36 6.778L16 16h-4.937l-3.867-5.594L2.771 16H.316l5.733-7.25L0 0h5.063l3.495 5.114L12.6 0zm-.86 14.376h1.36L4.323 1.539H2.865l8.875 12.837z" />
    </svg>
  );
}

function SocialIconLinkedIn(props: any) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M14.82 0H1.18A1.169 1.169 0 000 1.154v13.694A1.168 1.168 0 001.18 16h13.64A1.17 1.17 0 0016 14.845V1.15A1.171 1.171 0 0014.82 0zM4.744 13.64H2.369V5.996h2.375v7.644zm-1.18-8.684a1.377 1.377 0 11.52-.106 1.377 1.377 0 01-.527.103l.007.003zm10.075 8.683h-2.375V9.921c0-.885-.015-2.025-1.234-2.025-1.218 0-1.425.966-1.425 1.968v3.775H6.233V5.997H8.51v1.05h.032c.317-.601 1.09-1.235 2.246-1.235 2.405-.005 2.851 1.578 2.851 3.63v4.197z" />
    </svg>
  );
}

function SocialIconGitHub(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-16">
      <div className="relative bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-splash-1 from-[28%] via-splash-2 via-[70%] to-splash-3 sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]">
        <div className="absolute inset-2 rounded-[2rem] bg-white/80"></div>
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative pb-16 pt-20 text-center sm:py-24">
              <h2 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">
                Implement SAML + SCIM today
              </h2>
              <p className="mt-6 text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl">
                Implementing SAML SSO?
              </p>

              <p className="mx-auto mt-6 max-w-md text-sm/6 text-gray-500">
                Free and open-source, SSOReady makes adding SAML and SCIM
                support fast and easy for engineers.
              </p>
              <div className="mt-6 flex gap-x-6 justify-center">
                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)] rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-medium text-white disabled:bg-gray-950 hover:bg-gray-800 disabled:opacity-40"
                  href="https://ssoready.com"
                >
                  Try SSOReady
                </a>
                <a
                  className="relative inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)] rounded-full border border-transparent bg-white/15 shadow-md ring-1 ring-[#D15052]/15 after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d] whitespace-nowrap text-base font-medium text-gray-950 data-[disabled]:bg-white/15 hover:bg-white/20 disabled:opacity-40"
                  href="https://ssoready.com/docs/dummyidp"
                >
                  Read the docs
                </a>
              </div>
            </div>

            <div className="pb-16">
              <PlusGridRow className="flex justify-between">
                <div>
                  <PlusGridItem className="py-3">
                    <div className="text-sm/6 text-gray-950">
                      &copy; 2024 Codomain Data Corporation (d.b.a. SSOReady)
                    </div>
                  </PlusGridItem>
                </div>
                <div className="flex">
                  <PlusGridItem className="flex items-center gap-8 py-3">
                    <Link
                      href="https://x.com/ssoready"
                      target="_blank"
                      aria-label="Visit us on X"
                      className="text-gray-950 data-[hover]:text-gray-950/75"
                    >
                      <SocialIconX className="size-4" />
                    </Link>
                    <Link
                      href="https://linkedin.com/company/ssoready"
                      target="_blank"
                      aria-label="Visit us on LinkedIn"
                      className="text-gray-950 data-[hover]:text-gray-950/75"
                    >
                      <SocialIconLinkedIn className="size-4" />
                    </Link>
                    <Link
                      href="https://github.com/ssoready/ssoready"
                      target="_blank"
                      aria-label="Visit us on GitHub"
                      className="text-gray-950 data-[hover]:text-gray-950/75"
                    >
                      <SocialIconGitHub className="size-4" />
                    </Link>
                  </PlusGridItem>
                </div>
              </PlusGridRow>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
