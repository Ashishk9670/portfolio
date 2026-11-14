"use client";

import { biodataBirthDate } from "@/lib/biodata";

export function ageOn(today: Date, birthDate = biodataBirthDate) {
  const [y, m, d] = birthDate.split("-").map(Number);
  const hadBirthday = today.getMonth() + 1 > m || (today.getMonth() + 1 === m && today.getDate() >= d);
  return today.getFullYear() - y - (hadBirthday ? 0 : 1);
}

// The static HTML carries the age at build time; the browser recomputes it so it stays
// right between deploys.
export function BiodataAge({ template }: { template: string }) {
  return <span suppressHydrationWarning>{template.replace("{n}", String(ageOn(new Date())))}</span>;
}
