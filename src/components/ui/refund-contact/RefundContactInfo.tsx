import React from 'react';
import { Phone, Send } from 'lucide-react';

interface ContactInfoItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}

export const ContactInfoItem: React.FC<ContactInfoItemProps> = ({
  icon: Icon,
  label,
  value,
  href,
}) => {
  return (
    <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full">
        <Icon className="h-5 w-5 text-emerald-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <a 
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="text-emerald-600 hover:text-emerald-800 font-mono text-sm transition-colors"
        >
          {value}
        </a>
      </div>
    </div>
  );
};

interface RefundContactInfoProps {
  t: (key: string) => string;
}

export const RefundContactInfo: React.FC<RefundContactInfoProps> = ({ t }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
        {t('orders.refund.contactModal.contactInfo')}
      </h3>
      
      <div className="space-y-3">
        <ContactInfoItem
          icon={Phone}
          label={t('orders.refund.contactModal.phone')}
          value="+998 95 021 02 07"
          href="tel:+998950210207"
        />

        <ContactInfoItem
          icon={Send}
          label={t('orders.refund.contactModal.telegram')}
          value="@elbek_s101"
          href="https://t.me/elbek_s101"
        />
      </div>
    </div>
  );
};
