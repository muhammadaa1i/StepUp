import React from "react";
import Image from "next/image";
import i1 from "../../../../public/payments/i1.png";
import i2 from "../../../../public/payments/i2.png";
import i3 from "../../../../public/payments/i3.png";

interface PaymentSectionProps {
  title: string;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">{title}</h4>
      <div className="grid grid-cols-2 gap-2 w-full max-w-44">
        {/* Visa */}
        <div className="flex items-center justify-center hover:shadow-md transition-shadow">
          <Image
            src="/payments/visa.svg"
            alt="Visa"
            width={90}
            height={50}
            className="object-contain"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
        {/* Mastercard */}
        <div className="flex items-center justify-center hover:shadow-md transition-shadow">
          <Image
            src="/payments/mastercard.svg"
            alt="Mastercard"
            width={90}
            height={45}
            className="object-contain"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
        {/* UnionPay */}
        <div className="flex items-center justify-center bg-white rounded border border-gray-200 hover:shadow-md transition-shadow">
          <Image 
            src={i3} 
            alt="UnionPay" 
            width={56} 
            height={30} 
            className="object-contain"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
        {/* HUMO */}
        <div className="flex items-center justify-center bg-white rounded border border-gray-200 hover:shadow-md transition-shadow">
          <Image 
            src={i1} 
            alt="Humo" 
            width={56} 
            height={30} 
            className="object-contain"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
        {/* UZCARD - Centered */}
        <div className="col-span-2 flex items-center justify-center">
          <div className="flex items-center justify-center px-3 bg-white rounded border border-gray-200 hover:shadow-md transition-shadow w-fit">
            <Image 
              src={i2} 
              alt="Uzcard" 
              width={56} 
              height={30} 
              className="object-contain"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
