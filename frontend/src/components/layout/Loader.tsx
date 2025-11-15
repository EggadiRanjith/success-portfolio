"use client";

import { useLoader } from "@/context/LoaderContext";
import { CodeSyntaxLoader } from "@/components/ui/loaders/CodeSyntaxLoader";

export function Loader() {
  const { isLoading } = useLoader();
  return <CodeSyntaxLoader visible={isLoading} />;
}
