export function GradientBackground() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={
          "absolute -right-60 -top-44 h-60 w-[36rem] transform-gpu md:right-0 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-splash-1 from-[28%] via-splash-2 via-[70%] to-splash-3 rotate-[-10deg] rounded-full blur-3xl"
        }
      />
    </div>
  );
}
