import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/types';
import { createProfileSchema, ProfileFormData } from './profile-form/schema';
import { useProfileSubmit } from './profile-form/useProfileSubmit';

export type { ProfileFormData } from './profile-form/schema';

interface UseProfileFormProps {
  user: User | null;
  updateUser: (user: User) => void;
  t: (key: string) => string;
  onEditingChange: (isEditing: boolean) => void;
}

export function useProfileForm({ user, updateUser, t, onEditingChange }: UseProfileFormProps) {
  const profileSchema = createProfileSchema(t);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      surname: user?.surname || '',
      phone_number: user?.phone_number || '',
    },
  });

  const { reset, handleSubmit } = form;

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        surname: user.surname,
        phone_number: user.phone_number,
      });
    }
  }, [user, reset]);

  const { onSubmit } = useProfileSubmit(user, updateUser, t, onEditingChange, reset);

  const handleCancel = () => {
    if (user) {
      reset({
        name: user.name,
        surname: user.surname,
        phone_number: user.phone_number,
        current_password: '',
        new_password: '',
        confirm_new_password: '',
      });
    }
    onEditingChange(false);
  };

  return {
    form,
    onSubmit: handleSubmit(onSubmit),
    handleCancel,
  };
}
