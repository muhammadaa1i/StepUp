import React from 'react';
import { X, Save } from 'lucide-react';

interface ProfileActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  t: (key: string) => string;
}

export default function ProfileActions({ isSubmitting, onCancel, t }: ProfileActionsProps) {
  return (
    <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
      <button
        type="button"
        onClick={onCancel}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        <X className="h-4 w-4" />
        <span>{t('common.cancel')}</span>
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Save className="h-4 w-4" />
        <span>{isSubmitting ? t('profilePage.updating') : t('common.save')}</span>
      </button>
    </div>
  );
}
