"use client";

import { Download } from "lucide-react";

export function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <Download className="h-4 w-4" aria-hidden="true" />
      Save as PDF
    </button>
  );
}
