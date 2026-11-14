import type { Metadata } from "next";
import { metadata as biodataMetadata } from "@/app/marriage/page";
import { ShortLinkRedirect } from "@/components/ShortLinkRedirect";

// Short link to the biodata: easier to type or read out than /marriage. Shares its preview.
export const metadata: Metadata = biodataMetadata;

export default function ShortLink() {
  return <ShortLinkRedirect to="/marriage/" label="Open Ashish Kumar's biodata" />;
}
