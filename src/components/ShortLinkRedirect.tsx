"use client";

import { useEffect } from "react";
import { withBasePath } from "@/lib/basePath";

// Static hosting has no server redirects, so the short link forwards in the browser. An
// external referrer (WhatsApp Web, a mail client) is passed on so the visit keeps its source.
export function ShortLinkRedirect({ to, label }: { to: string; label: string }) {
  const href = withBasePath(to);
  useEffect(() => {
    let target = href;
    // A tagged link (/m/?utm_source=whatsapp, or a group link /m/?for=mama) keeps its tag.
    const params = new URLSearchParams(window.location.search);
    const tagged = new URLSearchParams();
    for (const key of ["for", "utm_source"]) {
      const value = params.get(key);
      if (value) tagged.set(key, value);
    }
    if (tagged.size) {
      window.location.replace(`${target}?${tagged}`);
      return;
    }
    try {
      const ref = document.referrer && new URL(document.referrer).hostname;
      if (ref && ref !== window.location.hostname) target += `?utm_source=${encodeURIComponent(ref)}`;
    } catch {
      // Unreadable referrer: forward without it.
    }
    window.location.replace(target);
  }, [href]);
  return (
    <div className="flex min-h-screen items-center justify-center p-6 text-center" style={{ background: "#FBF7F0", color: "#2B2118" }}>
      <noscript>
        <meta httpEquiv="refresh" content={`0;url=${href}`} />
      </noscript>
      <a href={href} className="font-semibold underline underline-offset-2" style={{ color: "#7A1F2B" }}>
        {label}
      </a>
    </div>
  );
}
