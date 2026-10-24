import { withBasePath } from "@/lib/basePath";

export const PORTRAIT = {
  full: "/images/ashish-kumar.webp",
  jpg: "/images/ashish-kumar.jpg",
  avatar: "/images/ashish-kumar-avatar.webp",
};

export function Portrait({
  size,
  variant = "full",
  alt = "Ashish Kumar",
  className = "",
  priority = false,
}: {
  size: number;
  variant?: "full" | "avatar";
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export; files are pre-sized and compressed
    <img
      src={withBasePath(PORTRAIT[variant])}
      alt={alt}
      width={size}
      height={size}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`object-cover ${className}`}
    />
  );
}
