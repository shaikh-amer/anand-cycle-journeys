
import { BillItem } from '@/types/billing';

export const calculateItemAmount = (quantity: number, rate: number): number => {
  return quantity * rate;
};

export const calculateSubtotal = (billItems: BillItem[]): number => {
  return billItems.reduce((total, item) => total + item.amount, 0);
};

export const calculateGST = (subtotal: number, includeGST: boolean): number => {
  return includeGST ? Math.round(subtotal * 0.18) : 0;
};

export const calculateGrandTotal = (subtotal: number, gst: number): number => {
  return subtotal + gst;
};

export const generateBillNumber = (): string => {
  return Date.now().toString().slice(-6);
};
