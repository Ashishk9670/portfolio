"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

// Copies the biodata's short link. The confirmation is announced to screen readers.
export function CopyLinkButton({
  url,
  label,
  copiedLabel,
  className,
  style,
}: {
  url: string;
  label: string;
  copiedLabel: string;
  className: string;
  style: React.CSSProperties;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Older browsers: fall back to a hidden text field.
      const field = document.createElement("textarea");
      field.value = url;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  const Icon = copied ? Check : Link2;
  return (
    <button type="button" onClick={copy} className={className} style={style} data-bio-track="bio-copy-link">
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
