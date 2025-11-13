import React from "react";

interface SellerInfoProps {
  name: string;
  inn: string;
  legalAddress: string;
  actualAddress: string;
  phone: string;
  email: string;
}

export const SellerInfo: React.FC<SellerInfoProps> = ({
  name,
  inn,
  legalAddress,
  actualAddress,
  phone,
  email,
}) => {
  return (
    <div className="text-sm sm:text-base text-gray-700 leading-6 sm:leading-7 space-y-1 sm:space-y-2">
      <p>{name}</p>
      <p>{inn}</p>
      <p className="wrap-break-word">{legalAddress}</p>
      <p className="wrap-break-word">{actualAddress}</p>
      <p>{phone}</p>
      <p className="break-all">{email}</p>
    </div>
  );
};
