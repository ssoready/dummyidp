import CreateAppButton from "@/components/CreateAppButton";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export default function Page() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-2 bottom-0 rounded-[2rem] ring-1 ring-inset ring-black/5 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-splash-1 from-[28%] via-splash-2 via-[70%] to-splash-3 sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]"></div>

      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <div className="-ml-6 pt-12">
            <Navbar
              banner={
                <Link
                  href="https://ssoready.com"
                  className="flex items-center gap-1 rounded-full bg-purple-950/35 px-3 py-0.5 text-sm/6 font-medium text-white hover:bg-purple-950/30"
                >
                  Implementing SAML? Check out SSOReady
                  <ChevronRightIcon className="size-4" />
                </Link>
              }
            />
          </div>

          <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
            <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
              SAML made easy
            </h1>
            <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
              DummyIDP lets you test SAML and SCIM without setting up a
              full-blown identity provider
            </p>
            <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
              <CreateAppButton />
              <a
                className="relative inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)] rounded-full border border-transparent bg-white/15 shadow-md ring-1 ring-[#D15052]/15 after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d] whitespace-nowrap text-base font-medium text-gray-950 disabled:bg-white/15 hover:bg-white/20 disabled:opacity-40"
                data-headlessui-state=""
                href="https://ssoready.com/docs"
              >
                See docs
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
