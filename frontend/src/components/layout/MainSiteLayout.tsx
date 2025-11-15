"use client";

import { SiteHeader, SiteFooter, PageLoader, Loader, PageGate } from "@/components/layout";
import { AnimationProvider } from "@/components/animations/AnimationProvider";
import { PageTransition } from "@/components/layout/PageTransition";
import { LoaderProvider } from "@/context/LoaderContext";
import { Analytics } from "@/components/Analytics";

export function MainSiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LoaderProvider>
      <Analytics />
      <Loader />
      <PageLoader />
      <PageGate>
        <SiteHeader />
        <AnimationProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </AnimationProvider>
        <SiteFooter />
      </PageGate>
    </LoaderProvider>
  );
}

