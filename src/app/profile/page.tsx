"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n";
import { ProfileSkeleton } from "@/components/ui/skeleton";
import { useProfileForm } from "@/hooks/useProfileForm";
import ProfileHeader from "@/components/profile/ProfileHeader";
import BasicInfoFields from "@/components/profile/BasicInfoFields";
import PasswordFields from "@/components/profile/PasswordFields";
import ProfileActions from "@/components/profile/ProfileActions";

export default function ProfilePage() {
  const { user, updateUser, isLoading } = useAuth();
  const router = useRouter();
  const { t } = useI18n();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const { form, onSubmit, handleCancel } = useProfileForm({
    user,
    updateUser,
    t,
    onEditingChange: setIsEditing,
  });

  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileSkeleton />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg">
        <ProfileHeader
          userName={user.name}
          isAdmin={user.is_admin}
          isEditing={isEditing}
          onEditClick={() => setIsEditing(true)}
          t={t}
        />

        <form onSubmit={onSubmit} className="px-6 py-6">
          <div className="space-y-6">
            <BasicInfoFields register={register} errors={errors} isEditing={isEditing} t={t} />

            <PasswordFields
              register={register}
              errors={errors}
              isEditing={isEditing}
              showPasswords={showPasswords}
              onTogglePassword={(field) =>
                setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
              }
              t={t}
            />
          </div>

          {isEditing && (
            <ProfileActions isSubmitting={isSubmitting} onCancel={handleCancel} t={t} />
          )}
        </form>
      </div>
    </div>
  );
}
