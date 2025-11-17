/**
 * Payment response parser
 */

export interface PaymentResponse {
  success: boolean;
  octo_payment_UUID?: string;
  octo_pay_url?: string;
  errMessage?: string;
  payment_url?: string;
  pay_url?: string;
}

export function parsePaymentResponse(rawData: Record<string, unknown>): PaymentResponse {
  const getString = (key: string): string | undefined => {
    const value = rawData[key];
    return typeof value === 'string' ? value : undefined;
  };

  const getBool = (key: string): boolean => {
    const value = rawData[key];
    return typeof value === 'boolean' ? value : true;
  };

  const isSuccess = getBool('success') ||
    rawData['status'] === 'success' ||
    rawData['success'] === true ||
    !!getString('octo_pay_url') ||
    !!getString('payment_url') ||
    !!getString('pay_url') ||
    !!getString('url');

  return {
    success: isSuccess,
    octo_payment_UUID:
      getString('octo_payment_UUID') ||
      getString('payment_id') ||
      getString('id'),
    octo_pay_url:
      getString('octo_pay_url') ||
      getString('payment_url') ||
      getString('pay_url') ||
      getString('url') ||
      getString('redirect_url'),
    errMessage:
      getString('errMessage') ||
      getString('error') ||
      getString('message'),
    payment_url:
      getString('octo_pay_url') ||
      getString('payment_url') ||
      getString('pay_url') ||
      getString('url'),
    pay_url:
      getString('octo_pay_url') ||
      getString('pay_url') ||
      getString('url'),
  };
}
