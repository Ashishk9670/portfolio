"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Hides site chrome (header, footer, chat widget) on standalone pages such as the biodata.
export function HideOn({ prefixes, children }: { prefixes: string[]; children: ReactNode }) {
  const path = usePathname().replace(/\/$/, "");
  return prefixes.some((p) => path === p || path.startsWith(`${p}/`)) ? null : <>{children}</>;
}
