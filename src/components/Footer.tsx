export function Footer() {
  return (
    <footer className="mt-16">
      <div className="relative bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]">
        <div className="absolute inset-2 rounded-[2rem] bg-white/80"></div>
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative pb-16 pt-20 text-center sm:py-24">
              <h2 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">
                Implement SAML + SCIM today
              </h2>
              <p className="mt-6 text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl">
                Ready to dive in?
                <br />
                Start your free trial today.
              </p>

              <p className="mx-auto mt-6 max-w-xs text-sm/6 text-gray-500">
                Get the cheat codes for selling and unlock your team's revenue
                potential.
              </p>
              <div className="mt-6">
                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)] rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-medium text-white data-[disabled]:bg-gray-950 data-[hover]:bg-gray-800 data-[disabled]:opacity-40"
                  data-headlessui-state=""
                  href="#"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
