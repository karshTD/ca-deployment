"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { getAuthToken, clearAuthToken } from "@/lib/api";

/**
 * Minimal top bar for the signed-in area (dashboard / analysis).
 * The public landing + how-it-works pages don't render this at all.
 * No Home/Dashboard links — just the mark and a way out.
 */
export function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
  }, []);

  const handleSignOut = () => {
    clearAuthToken();
    setIsLoggedIn(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#08070a]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-desi text-gold text-2xl leading-none">
          namaste
        </Link>

        {isLoggedIn && (
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-[#8f8b81] transition-colors hover:bg-white/5 hover:text-[#e2b84f]"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}
