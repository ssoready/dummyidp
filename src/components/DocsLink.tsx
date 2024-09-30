import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export function DocsLink({ to }: { to: string }) {
  return (
    <Link
      className="ml-4 hover:underline active:text-blue-800 text-xs font-semibold text-blue-600 inline-flex items-center"
      href={to}
    >
      Docs
      <ArrowUpRightIcon className="ml-0.5 h-3 w-3" />
    </Link>
  );
}
