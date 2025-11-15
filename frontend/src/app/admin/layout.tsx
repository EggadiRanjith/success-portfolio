"use client";

import { AdminProvider } from "@/context/AdminContext";
import "@/styles/base.css";
import { ThemeToggle } from "@/components/admin/ThemeToggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin pages don't show header/footer - they're isolated
  return (
    <AdminProvider>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {children}
    </AdminProvider>
  );
}

