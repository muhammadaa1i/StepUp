/**
 * Simplified payment service
 */

"use client";

import modernApiClient from "@/lib/modernApiClient";
import { PaymentEndpoints } from "@/lib/api/endpoints";
import { parsePaymentResponse, PaymentResponse } from "./utils/paymentParser";
import { calculatePaymentTimeout, isMobileDevice } from "./utils/deviceDetector";

export interface PaymentRequest {
  amount: number;
  description: string;
  order_id: number;
}

export interface PaymentRefundRequest {
  octo_payment_UUID: string;
  amount?: number;
  reason?: string;
}

export interface PaymentStatus {
  status: 'CREATED' | 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
  octo_payment_UUID?: string;
  order_id: number;
  amount: number;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export class PaymentService {
  private readonly ENDPOINTS = {
    create: PaymentEndpoints.CREATE,
    refund: PaymentEndpoints.REFUND,
    notify: PaymentEndpoints.NOTIFY,
  } as const;

  constructor(private apiClient = modernApiClient) {}

  async createPayment(paymentData: PaymentRequest, timeout = 4000): Promise<PaymentResponse> {
    try {
      const finalTimeout = calculatePaymentTimeout(timeout);
      const isMobile = isMobileDevice();
      
      console.log(`💳 Creating payment - Mobile: ${isMobile}, Timeout: ${finalTimeout}ms`);
      
      const rawData = await this.apiClient.post(
        this.ENDPOINTS.create,
        paymentData,
        { timeout: finalTimeout }
      ) as Record<string, unknown>;
      
      const data = parsePaymentResponse(rawData);

      if (data.success && (data.octo_pay_url || data.payment_url)) {
        return data;
      }
      
      const errorMsg = data.errMessage || 
        `Payment failed: Success=${data.success}, URL=${!!(data.octo_pay_url || data.payment_url)}`;
      throw new Error(errorMsg);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to create payment');
    }
  }

  async refundPayment(refundData: PaymentRefundRequest): Promise<PaymentStatus> {
    try {
      const data = await this.apiClient.post(this.ENDPOINTS.refund, refundData) as PaymentStatus;
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to refund payment');
    }
  }

  static generateOrderId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `ORDER_${timestamp}_${random}`;
  }

  static formatAmount(amount: number): number {
    return Math.round(amount * 100) / 100;
  }

  static getReturnUrls() {
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    return {
      success_url: `${baseUrl}/payment/success`,
      fail_url: `${baseUrl}/payment/failure`
    };
  }

  private static instance?: PaymentService;
  
  static getInstance(): PaymentService {
    if (!this.instance) {
      this.instance = new PaymentService();
    }
    return this.instance;
  }

  static async createPayment(paymentData: PaymentRequest, timeout = 4000): Promise<PaymentResponse> {
    return this.getInstance().createPayment(paymentData, timeout);
  }

  static async refundPayment(refundData: PaymentRefundRequest): Promise<PaymentStatus> {
    return this.getInstance().refundPayment(refundData);
  }
}

export const paymentService = new PaymentService();
