"use client";
import React from "react";

interface TestButtonProps {
  onClick: () => void;
  disabled: boolean;
  label: string;
  colorClass: string;
}

export default function TestButton({
  onClick,
  disabled,
  label,
  colorClass,
}: TestButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${colorClass} text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50 transition-opacity`}
    >
      {label}
    </button>
  );
}
