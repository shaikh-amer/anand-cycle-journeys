import { CustomerInfo } from '@/types/billing';

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters and leading zeros
  let cleanPhone = phone.replace(/\D/g, '').replace(/^0+/, '');
  
  // Ensure it starts with 91 (India country code)
  if (!cleanPhone.startsWith('91')) {
    cleanPhone = '91' + cleanPhone;
  }
  
  return cleanPhone;
};

export const createWhatsAppMessage = (customerName: string, total: number, pdfUrl: string): string => {
  // Ensure URL has proper https:// prefix
  let formattedUrl = pdfUrl;
  if (!formattedUrl.startsWith('http')) {
    formattedUrl = `https://${formattedUrl}`;
  }
  
  // WhatsApp link detection works better with this format:
  // - Keep URL on its own line
  // - Add space before and after URL
  // - Use simple, clean message structure
  return `Hello ${customerName},

Your bill of ₹${total} is ready.

Download: ${formattedUrl}

Thank you!`;
};

export const openWhatsAppShare = (phone: string, message: string): void => {
  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
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
