import React from 'react';
import { User, Edit2 } from 'lucide-react';

interface ProfileHeaderProps {
  userName: string;
  isAdmin: boolean;
  isEditing: boolean;
  onEditClick: () => void;
  t: (key: string) => string;
}

export default function ProfileHeader({
  userName: _userName,
  isAdmin,
  isEditing,
  onEditClick,
  t,
}: ProfileHeaderProps) {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between flex-wrap gap-2 max-[460px]:justify-center max-[460px]:gap-3">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-100 rounded-full p-3">
            <User className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{t('profilePage.title')}</h1>
            <p className="text-sm text-gray-600">
              {isAdmin ? t('profilePage.roleAdmin') : t('profilePage.roleUser')}
            </p>
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={onEditClick}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
            <span>{t('common.edit')}</span>
          </button>
        )}
      </div>
    </div>
  );
}
