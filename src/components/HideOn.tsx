"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Hides site chrome (header, footer, chat widget) on standalone pages such as the biodata.
export function HideOn({ prefix, children }: { prefix: string; children: ReactNode }) {
  const pathname = usePathname();
  return pathname.replace(/\/$/, "").startsWith(prefix) ? null : <>{children}</>;
}
