import { z } from 'zod';

export const createProfileSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z.string().min(1, t('auth.validation.nameRequired')),
      surname: z.string().min(1, t('auth.validation.surnameRequired')),
      phone_number: z
        .string()
        .min(1, t('auth.validation.phoneRequired'))
        .regex(/^\+\d{10,15}$/, t('auth.validation.phoneFormat')),
      current_password: z.string().optional(),
      new_password: z.string().optional(),
      confirm_new_password: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.new_password || data.confirm_new_password) {
          return !!data.current_password && data.current_password.length >= 8;
        }
        return true;
      },
      {
        message: t('profilePage.validation.currentPasswordRequired'),
        path: ['current_password'],
      }
    )
    .refine(
      (data) => {
        if (data.new_password) {
          return data.new_password.length >= 8;
        }
        return true;
      },
      {
        message: t('profilePage.validation.newPasswordMin'),
        path: ['new_password'],
      }
    )
    .refine(
      (data) => {
        if (data.new_password || data.confirm_new_password) {
          return data.new_password === data.confirm_new_password;
        }
        return true;
      },
      {
        message: t('auth.validation.passwordsMismatch'),
        path: ['confirm_new_password'],
      }
    );

export type ProfileFormData = z.infer<ReturnType<typeof createProfileSchema>>;
