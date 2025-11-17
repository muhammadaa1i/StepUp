import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";

interface UseLoginFormOptions {
  t: (key: string) => string;
}

export function useLoginForm({ t }: UseLoginFormOptions) {
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const loginSchema = z.object({
    name: z.string().min(1, t("auth.validation.nameRequired")),
    password: z.string().min(8, t("auth.validation.passwordMin")),
  });

  type FormSchema = z.infer<typeof loginSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data: FormSchema) => {
      try {
        setLoginError(null);
        form.clearErrors();
        await login(data);
        router.push("/");
      } catch (error: unknown) {
        // Extract error message from various formats
        let errorMessage = t("auth.toasts.loginInvalid");
        
        if (error instanceof Error) {
          // Check if the error message indicates incorrect credentials
          const msg = error.message.toLowerCase();
          if (msg.includes("incorrect") || msg.includes("неверн") || msg.includes("noto'g'ri")) {
            errorMessage = t("auth.serverMessages.incorrectCredentials");
          } else if (msg.includes("unauthorized") || msg.includes("401")) {
            errorMessage = t("auth.serverMessages.incorrectCredentials");
          } else {
            // Use the error message directly if it's meaningful
            errorMessage = error.message;
          }
        }
        
        setLoginError(errorMessage);
      }
    },
    [login, router, form, t]
  );

  const handleInputChange = useCallback(() => {
    if (loginError) setLoginError(null);
  }, [loginError]);

  return {
    form,
    loginError,
    onSubmit: form.handleSubmit(onSubmit),
    handleInputChange,
  };
}
