"use client";

import { usePathname } from "next/navigation";
import { MainSiteLayout } from "./MainSiteLayout";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // Admin routes don't get header/footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Main site routes get header/footer
  return <MainSiteLayout>{children}</MainSiteLayout>;
}

