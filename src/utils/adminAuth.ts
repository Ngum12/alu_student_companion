import React from "react";
import { Link } from "react-router-dom";

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS ?? "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

const SESSION_KEY = "ADMIN_SESSION_EXPIRES";
const EMAIL_KEY = "ADMIN_EMAIL";
const ROLE_KEY = "USER_ROLE";
const SESSION_HOURS = 8;

export const isAdminEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

export const isAdmin = (): boolean => {
  const expires = localStorage.getItem(SESSION_KEY);
  if (expires && new Date(expires) < new Date()) {
    clearAdminSession();
    return false;
  }
  const email = localStorage.getItem(EMAIL_KEY);
  const role = localStorage.getItem(ROLE_KEY);
  return role === "admin" && isAdminEmail(email);
};

export const grantAdminSession = (email: string): void => {
  if (!isAdminEmail(email)) {
    throw new Error("Email is not authorized as admin");
  }
  const expires = new Date();
  expires.setHours(expires.getHours() + SESSION_HOURS);
  localStorage.setItem(EMAIL_KEY, email.toLowerCase());
  localStorage.setItem(ROLE_KEY, "admin");
  localStorage.setItem(SESSION_KEY, expires.toISOString());
};

export const clearAdminSession = (): void => {
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(SESSION_KEY);
};

export const getAdminEmail = (): string | null => localStorage.getItem(EMAIL_KEY);

export const requireAdmin = <P extends object>(Component: React.ComponentType<P>) => {
  return function AdminProtectedComponent(props: P) {
    if (!isAdmin()) {
      return React.createElement(
        "div",
        { className: "flex flex-col items-center justify-center h-screen" },
        React.createElement("h1", { className: "text-2xl font-bold mb-4" }, "Admin Access Required"),
        React.createElement("p", { className: "text-[#1A1A1A]/50 mb-6" }, "You need admin privileges to view this page."),
        React.createElement(Link, { to: "/", className: "text-[#D4AF37] hover:underline" }, "Return to home")
      );
    }
    return React.createElement(Component, props);
  };
};
