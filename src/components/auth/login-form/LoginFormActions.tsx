import React from "react";
import { Loader2 } from "lucide-react";

interface LoginFormActionsProps {
  isSubmitting: boolean;
  t: (key: string) => string;
}

export const LoginFormActions: React.FC<LoginFormActionsProps> = ({
  isSubmitting,
  t,
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          {t("auth.loginProgress")}
        </>
      ) : (
        t("auth.login")
      )}
    </button>
  );
};
