import React from "react";

interface MobileMenuOverlayProps {
  onClick: () => void;
}

export const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({ onClick }) => {
  return <div className="absolute inset-0 bg-opacity-10" onClick={onClick} />;
};
