"use client";

import React from 'react';
import { X } from 'lucide-react';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  closeLabel: string;
}

/**
 * Modal header component with title and close button
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose, closeLabel }) => {
  return (
    <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-3 flex justify-between items-center">
      <h2 className="text-lg sm:text-2xl font-bold line-clamp-1">{title}</h2>
      <button 
        onClick={onClose} 
        aria-label={closeLabel} 
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};
