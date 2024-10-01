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
                Free and open-source, SSOReady makes adding SAML support fast
                and easy for engineers.
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
                  href="https://ssoready.com/docs"
                >
                  Read the docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
