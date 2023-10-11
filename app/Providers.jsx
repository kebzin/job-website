"use client";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }) {
  return (
    <SessionProvider value={{}}>
      <ThemeProvider> {children}</ThemeProvider>
    </SessionProvider>
  );
}
