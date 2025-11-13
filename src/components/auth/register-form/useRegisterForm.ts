import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";

interface UseRegisterFormOptions {
  t: (key: string) => string;
}

export function useRegisterForm({ t }: UseRegisterFormOptions) {
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const registerSchema = z
    .object({
      name: z.string().min(1, t("auth.validation.nameRequired")),
      surname: z.string().min(1, t("auth.validation.surnameRequired")),
      phone_number: z
        .string()
        .min(1, t("auth.validation.phoneRequired"))
        .regex(/^\+\d{10,15}$/, t("auth.validation.phoneFormat")),
      password: z.string().min(8, t("auth.validation.passwordMin")),
      confirm_password: z
        .string()
        .min(8, t("auth.validation.confirmPasswordMin")),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: t("auth.validation.passwordsMismatch"),
      path: ["confirm_password"],
    });

  type FormSchema = z.infer<typeof registerSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = useCallback(
    async (data: FormSchema) => {
      try {
        await registerUser(data);
        router.push("/");
      } catch {
        // Error is handled by the auth context
      }
    },
    [registerUser, router]
  );

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
