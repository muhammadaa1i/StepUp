"use client";

import LoginForm from "@/components/auth/LoginForm";
import "@/lib/authDebug"; // Load auth debugging utilities
import "@/lib/consoleFilter"; // Filter expected console errors

export default function LoginPage() {
  return <LoginForm />;
}
