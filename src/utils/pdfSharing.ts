
import html2pdf from 'html2pdf.js';
import { CustomerInfo } from '@/types/billing';

export const generatePDFFile = async (element: HTMLElement, fileName: string): Promise<File> => {
  const opt = {
    margin: [0.2, 0.2, 0.2, 0.2],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  const pdfBlob = await html2pdf().from(element).set(opt).outputPdf('blob');
  return new File([pdfBlob], fileName, { type: 'application/pdf' });
};

export const shareViaNativeShare = async (pdfFile: File, customerName: string, total: number): Promise<boolean> => {
  if (!navigator.share) {
    throw new Error('Web Share API not supported on this device');
  }

  const shareData = {
    title: `Invoice for ${customerName}`,
    text: `Invoice for ${customerName} - Amount: ₹${total}`,
    files: [pdfFile]
  };

  // Check if the browser can share files
  if (!navigator.canShare || !navigator.canShare(shareData)) {
    throw new Error('Cannot share files on this device');
  }

  try {
    await navigator.share(shareData);
    return true;
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      // User cancelled the share
      return false;
    }
    throw error;
  }
};

export const isWebShareSupported = (): boolean => {
  return 'share' in navigator && 'canShare' in navigator;
};

export const uploadToCloudinary = async (pdfFile: File): Promise<string> => {
  // This is a placeholder for Cloudinary integration
  // You would need to implement this with your Cloudinary credentials
  const formData = new FormData();
  formData.append('file', pdfFile);
  formData.append('upload_preset', 'your_upload_preset'); // Replace with actual preset
  
  const response = await fetch(
    'https://api.cloudinary.com/v1_1/your_cloud_name/upload', // Replace with actual cloud name
    {
      method: 'POST',
      body: formData,
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to upload to Cloudinary');
  }
  
  const data = await response.json();
  return data.secure_url;
};
