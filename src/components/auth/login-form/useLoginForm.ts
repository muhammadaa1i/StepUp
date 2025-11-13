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
      } catch {
        setLoginError("Неверный логин или пароль");
      }
    },
    [login, router, form]
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
