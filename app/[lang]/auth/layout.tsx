"use client";
import { ReactNode } from "react";
import { GuestGuard } from "@/src/auth/guard";

type AuthLayoutProps = {
  children: ReactNode;
  params: { lang: string };
};

export default function AuthLayout({ children, params: { lang } }: AuthLayoutProps) {
  return (
    <GuestGuard lang={lang}>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">{children}</div>
    </GuestGuard>
  );
}
