"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Mail, MessageCircle, Phone } from "lucide-react";

type Props = {
  email: string;
  phone: { display: string; tel: string };
  labels: { getInTouch: string; contactVia: string; email: string; call: string; whatsapp: string };
  colors: { maroon: string; line: string };
};

export function ContactMenu({ email, phone, labels, colors }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const options = [
    { href: `mailto:${email}`, icon: Mail, label: labels.email, detail: email },
    { href: `tel:${phone.tel}`, icon: Phone, label: labels.call, detail: phone.display },
    { href: `https://wa.me/${phone.tel.replace(/\D/g, "")}`, icon: MessageCircle, label: labels.whatsapp, detail: phone.display, external: true },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="contact-options"
        className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-4 text-sm font-semibold text-white"
        style={{ background: colors.maroon }}
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        {labels.getInTouch}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <ul
          id="contact-options"
          aria-label={labels.contactVia}
          className="absolute left-0 z-20 mt-2 w-64 overflow-hidden rounded-xl border bg-white py-1 shadow-xl"
          style={{ borderColor: colors.line }}
        >
          {options.map(({ href, icon: Icon, label, detail, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                className="flex min-h-11 items-center gap-3 px-4 py-2 text-sm hover:bg-black/5"
              >
                <Icon className="h-4 w-4 shrink-0" style={{ color: colors.maroon }} aria-hidden="true" />
                <span>
                  <span className="block font-semibold">{label}</span>
                  <span className="block text-xs text-[#5F5044]">{detail}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
