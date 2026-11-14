"use client";

import { useSyncExternalStore } from "react";
import { AArrowUp } from "lucide-react";

export const TEXT_SIZE_KEY = "ak_bio_text";

// Applied before the page paints, so a saved choice doesn't flash the normal size first.
export const TEXT_SIZE_SCRIPT = `try{if(localStorage.getItem("${TEXT_SIZE_KEY}")==="large")document.documentElement.dataset.bioText="large"}catch(e){}`;

// Enlarges the whole biodata (see .bio-zoom in globals.css) and remembers the choice.
// The <html> attribute is the source of truth (the pre-paint script may have set it).
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-bio-text"] });
  return () => observer.disconnect();
}
const isLarge = () => document.documentElement.dataset.bioText === "large";

export function TextSizeToggle({ label, color, borderColor }: { label: string; color: string; borderColor: string }) {
  const large = useSyncExternalStore(subscribe, isLarge, () => false);

  function toggle() {
    const next = !large;
    if (next) document.documentElement.dataset.bioText = "large";
    else delete document.documentElement.dataset.bioText;
    try {
      if (next) localStorage.setItem(TEXT_SIZE_KEY, "large");
      else localStorage.removeItem(TEXT_SIZE_KEY);
    } catch {
      // Storage unavailable: the choice lasts for this page only.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={large}
      className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-sm font-medium"
      style={{ borderColor, color: large ? "#fff" : color, background: large ? color : "#fff" }}
    >
      <AArrowUp className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}
