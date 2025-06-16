
import { CustomerInfo } from '@/types/billing';

export const formatPhoneNumber = (phone: string): string => {
  // Clean phone number: remove leading zeros and ensure it starts with 91
  let cleanPhone = phone.replace(/^0+/, '');
  if (!cleanPhone.startsWith('91')) {
    cleanPhone = '91' + cleanPhone;
  }
  return cleanPhone;
};

export const createWhatsAppMessage = (customerName: string, total: number, pdfUrl: string): string => {
  // Format message with proper line breaks and https:// prefix for clickable link
  return `Hello ${customerName},\nYour bill of ₹${total} is ready.\nDownload here:\nhttps://${pdfUrl.replace(/^https?:\/\//, '')}`;
};

export const openWhatsAppShare = (phone: string, message: string): void => {
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
};

export const shareOnWhatsApp = async (
  customerInfo: CustomerInfo, 
  total: number, 
  pdfUrl: string
): Promise<void> => {
  const phone = formatPhoneNumber(customerInfo.phone);
  const message = createWhatsAppMessage(customerInfo.name, total, pdfUrl);
  openWhatsAppShare(phone, message);
};
