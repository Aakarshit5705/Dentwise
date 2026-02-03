// components/ClientProviders.tsx
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import TanstackProvider from "@/components/providers/Tanstack";
import UserSync from "@/components/UserSync";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackProvider>
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: "#e78a53",
            colorBackground: "#f3f4f6",
            colorText: "#111827",
            colorTextSecondary: "#6b7280",
            colorInputBackground: "#f3f4f6",
          },
        }}
      >
        <UserSync />
        {children}
      </ClerkProvider>
    </TanstackProvider>
  );
}
