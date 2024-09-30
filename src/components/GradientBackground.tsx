export function GradientBackground() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={
          "absolute -right-60 -top-44 h-60 w-[36rem] transform-gpu md:right-0 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] rotate-[-10deg] rounded-full blur-3xl"
        }
      />
    </div>
  );
}