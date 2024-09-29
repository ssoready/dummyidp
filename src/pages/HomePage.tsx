import React from "react";
import { Button } from "@/components/ui/button";
import { useStore, useUpdateApp } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

export function HomePage() {
  const [storeData, setStoreData] = useStore();
  const updateApp = useUpdateApp();
  const navigate = useNavigate();
  const handleCreateApp = async () => {
    const id = uuidv4();

    await updateApp.mutateAsync({
      id,
      spAcsUrl: "",
      spEntityId: "",
      requiredDomain: "",
    });

    navigate(`/apps/${id}`);
  };

  return (
    <div className="relative">
      <div className="absolute inset-2 bottom-0 rounded-[2rem] ring-1 ring-inset ring-black/5 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#6ee7b7] from-[28%] via-[#6ee7b7] via-[40%] to-[#93c5fd] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]"></div>
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
            <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
              SAML made easy
            </h1>
            <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
              DummyIDP lets you test SAML without setting up a real identity
              provider
            </p>
            <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
              <a
                className="inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)] rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-medium text-white data-[disabled]:bg-gray-950 data-[hover]:bg-gray-800 data-[disabled]:opacity-40"
                data-headlessui-state=""
                href="#"
              >
                Get started
              </a>
              <a
                className="relative inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)] rounded-full border border-transparent bg-white/15 shadow-md ring-1 ring-[#D15052]/15 after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d] whitespace-nowrap text-base font-medium text-gray-950 data-[disabled]:bg-white/15 data-[hover]:bg-white/20 data-[disabled]:opacity-40"
                data-headlessui-state=""
                href="/pricing"
              >
                Read the docs
              </a>
            </div>

            <div className="mt-16 max-w-lg">
              <div className="w-full border-t-2 border-black/5"></div>
            </div>

            <div className="mt-8 max-w-lg text-sm flex items-center">
              <span className="text-gray-gray-950/75">Brought to you by </span>
              <a
                href="https://ssoready.com"
                className="ml-2 text-sm inline-flex items-center gap-x-2 grayscale hover:grayscale-0 text-gray-950 hover:text-black"
              >
                <img src="/ssoready.png" alt="" className="h-4" />
                <span className="font-medium">SSOReady</span>
              </a>
              <span className="ml-1">
                &mdash; ship SAML support this afternoon.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
