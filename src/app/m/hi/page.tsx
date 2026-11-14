import type { Metadata } from "next";
import { metadata as biodataMetadata } from "@/app/marriage/hi/page";
import { ShortLinkRedirect } from "@/components/ShortLinkRedirect";

export const metadata: Metadata = biodataMetadata;

export default function ShortLinkHindi() {
  return <ShortLinkRedirect to="/marriage/hi/" label="आशीष कुमार का बायोडाटा खोलें" />;
}
