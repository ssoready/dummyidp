import CreateAppButton from "@/components/CreateAppButton";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { clsx } from "clsx";

export default function Page() {
  return (
    <>
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

      <div className="px-6 lg:px-8 py-32">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <h2 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">
            Test SAML & SCIM with ease
          </h2>
          <h3 className="mt-2 max-w-3xl text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-6xl">
            Everything you need to test an Enterprise SSO implementation,
            without talking to sales
          </h3>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6">
            <BentoCard
              tall
              eyebrow="Working SAML IDP"
              title="Real SAML Assertions"
              description="DummyIDP behaves just like the SAML IDPs your customers use. Your app receives the same SAML protocol messages."
              graphic={
                <div className="h-80 bg-[url(/screenshots/profile.png)] bg-[size:1000px_560px] bg-[left_-109px_top_-112px] bg-no-repeat" />
              }
              fade={["bottom"]}
              className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
            />
            <BentoCard
              tall
              eyebrow="Working SCIM Directory"
              title="Real SCIM HTTP Requests"
              description="DummyIDP sends you the same SCIM HTTP requests you'd get from your customer's IDP. Quickly verify your app's automatic user (de)provisioning logic."
              graphic={
                <div className="h-80 bg-[url(/screenshots/profile.png)] bg-[size:1000px_560px] bg-[left_-109px_top_-112px] bg-no-repeat" />
              }
              fade={["bottom"]}
              className="lg:col-span-3 lg:rounded-tr-4xl"
            />
            <BentoCard
              eyebrow="Simple"
              title="No needless complexity"
              description="No need to talk to sales or give us your email. Just create an app and get going."
              className="lg:col-span-2 lg:rounded-bl-4xl"
            />
            <BentoCard
              eyebrow="Persistence"
              title="Keeps track of state"
              description="DummyIDP apps are long-lived. You can come back to your app any time."
              className="lg:col-span-2"
            />
            <BentoCard
              eyebrow="FOSS"
              title="Free and open-source"
              description="The DummyIDP.com service is free for anyone to use. You can self-host or fork us on GitHub."
              className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function BentoCard({
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
  tall,
}: {
  dark?: boolean;
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic?: React.ReactNode;
  fade?: ("top" | "bottom")[];
  tall?: boolean;
}) {
  return (
    <div
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg",
        "bg-white shadow-sm ring-1 ring-black/5",
        "data-[dark]:bg-gray-800 data-[dark]:ring-white/15",
      )}
    >
      <div className={clsx("relative shrink-0", tall ? "h-80" : "h-18")}>
        {graphic}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]" />
        )}
      </div>
      <div className="relative p-10">
        <h3 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">
          {eyebrow}
        </h3>
        <p className="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 group-data-[dark]:text-white">
          {title}
        </p>
        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-[dark]:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}
