import { MainSiteLayout } from "@/components/layout/MainSiteLayout";

export default function RootLayoutGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainSiteLayout>{children}</MainSiteLayout>;
}

