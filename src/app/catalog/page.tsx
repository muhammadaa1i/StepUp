"use client";

// Client-side only catalog page to avoid SSR issues on Vercel
import CatalogClient from "./CatalogClient";

export default function CatalogPage() {
  // Pass null to force client-side data fetching
  // This avoids server-side fetch issues on Vercel
  return <CatalogClient initial={null} />;
}
