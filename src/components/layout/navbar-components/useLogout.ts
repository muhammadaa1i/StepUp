import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface UseLogoutOptions {
  confirm: (options: {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    variant: "default" | "danger";
  }) => Promise<boolean>;
  logout: () => void;
  setIsMenuOpen: (value: boolean) => void;
  t: (key: string) => string;
}

export function useLogout({ confirm, logout, setIsMenuOpen, t }: UseLogoutOptions) {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    const ok = await confirm({
      title: t('auth.logoutConfirmTitle'),
      message: t('auth.logoutConfirmMessage'),
      confirmText: t('auth.logoutConfirmButton'),
      cancelText: t('common.cancel'),
      variant: "danger",
    });
    if (ok) {
      logout();
      router.push("/");
      setIsMenuOpen(false);
    }
  }, [confirm, logout, router, t, setIsMenuOpen]);

  return { handleLogout };
}
