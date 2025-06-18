
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Receipt, Share, Printer, Upload, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import InstallAppButton from '@/components/InstallAppButton';
import { generatePDFFile, shareViaNativeShare, isWebShareSupported, uploadToCloudinary } from '@/utils/pdfSharing';
import { shareOnWhatsApp, formatPhoneNumber } from '@/utils/whatsappSharing';
import { generatePDFBlob, uploadPDFToSupabase } from '@/utils/pdfGenerator';
import { CustomerInfo } from '@/types/billing';

interface BillActionsProps {
  generateBill: () => void;
  shareOnWhatsApp: () => void;
  printBill: () => void;
  isUploading: boolean;
  billPreviewRef: React.RefObject<HTMLDivElement>;
  customerName: string;
  total: number;
  customerInfo: CustomerInfo;
}

const BillActions = ({ 
  generateBill, 
  shareOnWhatsApp: originalShareOnWhatsApp, 
  printBill, 
  isUploading,
  billPreviewRef,
  customerName,
  total,
  customerInfo
}: BillActionsProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const [isUploadingToCloud, setIsUploadingToCloud] = useState(false);
  const { toast } = useToast();

  const handleDirectPDFShare = async () => {
    if (!billPreviewRef.current || !customerInfo.name || !customerInfo.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in customer name and phone number before sharing",
        variant: "destructive"
      });
      return;
    }

    setIsSharing(true);
    try {
      const fileName = `Invoice_${customerInfo.name.replace(/\s+/g, '_')}_${Date.now().toString().slice(-6)}.pdf`;
      const pdfFile = await generatePDFFile(billPreviewRef.current, fileName);
      
      // First try native share with PDF file
      if (isWebShareSupported()) {
        const shareData = {
          title: `Invoice for ${customerInfo.name}`,
          text: `Hi ${customerInfo.name}! Your invoice of ₹${total} is ready.`,
          files: [pdfFile]
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData);
          toast({
            title: "PDF Shared Successfully!",
            description: "Invoice has been shared"
          });
          return;
        }
      }

      // Fallback: Open WhatsApp with customer number and message
      const phone = formatPhoneNumber(customerInfo.phone);
      const message = encodeURIComponent(`Hi ${customerInfo.name}! Your invoice of ₹${total} is ready. I'm sharing the PDF with you.`);
      const waUrl = `https://wa.me/${phone}?text=${message}`;
      
      // Create a download link for the PDF
      const url = URL.createObjectURL(pdfFile);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = fileName;
      downloadLink.click();
      URL.revokeObjectURL(url);
      
      // Open WhatsApp
      window.open(waUrl, '_blank');
      
      toast({
        title: "PDF Downloaded & WhatsApp Opened!",
        description: "PDF has been downloaded and WhatsApp opened with customer details"
      });
      
    } catch (error) {
      console.error('Direct share failed:', error);
      toast({
        title: "Share Failed",
        description: (error as Error).message,
        variant: "destructive"
      });
    } finally {
      setIsSharing(false);
    }
  };

  const handleWhatsAppShare = async () => {
    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in customer name and phone number",
        variant: "destructive"
      });
      return;
    }

    if (!billPreviewRef.current) {
      toast({
        title: "Error",
        description: "Bill preview not available",
        variant: "destructive"
      });
      return;
    }

    setIsSharing(true);
    try {
      // Generate PDF first
      const fileName = `Invoice_${customerInfo.name.replace(/\s+/g, '_')}_${Date.now().toString().slice(-6)}.pdf`;
      const pdfBlob = await generatePDFBlob(billPreviewRef.current, fileName);
      
      // Upload to Supabase to get a shareable link
      const pdfUrl = await uploadPDFToSupabase(pdfBlob, fileName);
      
      // Share via WhatsApp with the PDF link
      await shareOnWhatsApp(customerInfo, total, pdfUrl);
      
      toast({
        title: "WhatsApp Opened!",
        description: "PDF uploaded and WhatsApp opened with customer details"
      });
    } catch (error) {
      console.error('WhatsApp share failed:', error);
      toast({
        title: "Share Failed",
        description: (error as Error).message,
        variant: "destructive"
      });
    } finally {
      setIsSharing(false);
    }
  };

  const handleCloudinaryUpload = async () => {
    if (!billPreviewRef.current || !customerName) {
      toast({
        title: "Missing Information",
        description: "Please fill in customer details before uploading",
        variant: "destructive"
      });
      return;
    }

    setIsUploadingToCloud(true);
    try {
      const fileName = `Invoice_${customerName.replace(/\s+/g, '_')}_${Date.now().toString().slice(-6)}.pdf`;
      const pdfFile = await generatePDFFile(billPreviewRef.current, fileName);
      
      const cloudinaryUrl = await uploadToCloudinary(pdfFile);
      
      // Copy URL to clipboard
      await navigator.clipboard.writeText(cloudinaryUrl);
      
      toast({
        title: "Uploaded Successfully!",
        description: "PDF uploaded to cloud and link copied to clipboard"
      });
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      toast({
        title: "Upload Failed",
        description: "Could not upload to cloud storage. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploadingToCloud(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Button onClick={generateBill} className="btn-primary">
        <Receipt className="w-4 h-4 mr-2" />
        Generate Bill
      </Button>
      
      <Button 
        onClick={handleDirectPDFShare} 
        className="btn-secondary" 
        disabled={isSharing}
      >
        <Share className="w-4 h-4 mr-2" />
        {isSharing ? 'Sharing...' : 'Share PDF'}
      </Button>
      
      <Button variant="outline" onClick={printBill}>
        <Printer className="w-4 h-4 mr-2" />
        Print
      </Button>
      
      <Button 
        variant="outline" 
        onClick={handleCloudinaryUpload}
        disabled={isUploadingToCloud}
      >
        <Upload className="w-4 h-4 mr-2" />
        {isUploadingToCloud ? 'Uploading...' : 'Upload to Cloud'}
      </Button>
      
      <InstallAppButton />
    </div>
  );
};

export default BillActions;
