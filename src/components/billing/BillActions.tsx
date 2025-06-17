
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Receipt, Share, Printer, Upload, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import InstallAppButton from '@/components/InstallAppButton';
import { generatePDFFile, shareViaNativeShare, isWebShareSupported, uploadToCloudinary } from '@/utils/pdfSharing';

interface BillActionsProps {
  generateBill: () => void;
  shareOnWhatsApp: () => void;
  printBill: () => void;
  isUploading: boolean;
  billPreviewRef: React.RefObject<HTMLDivElement>;
  customerName: string;
  total: number;
}

const BillActions = ({ 
  generateBill, 
  shareOnWhatsApp, 
  printBill, 
  isUploading,
  billPreviewRef,
  customerName,
  total
}: BillActionsProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const [isUploadingToCloud, setIsUploadingToCloud] = useState(false);
  const { toast } = useToast();

  const handleDirectPDFShare = async () => {
    if (!billPreviewRef.current || !customerName) {
      toast({
        title: "Missing Information",
        description: "Please fill in customer details before sharing",
        variant: "destructive"
      });
      return;
    }

    setIsSharing(true);
    try {
      const fileName = `Invoice_${customerName.replace(/\s+/g, '_')}_${Date.now().toString().slice(-6)}.pdf`;
      const pdfFile = await generatePDFFile(billPreviewRef.current, fileName);
      
      const success = await shareViaNativeShare(pdfFile, customerName, total);
      if (success) {
        toast({
          title: "PDF Shared Successfully!",
          description: "Invoice has been shared via your chosen app"
        });
      }
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
      
      {isWebShareSupported() ? (
        <Button 
          onClick={handleDirectPDFShare} 
          className="btn-secondary" 
          disabled={isSharing}
        >
          <Share className="w-4 h-4 mr-2" />
          {isSharing ? 'Sharing...' : 'Share PDF'}
        </Button>
      ) : (
        <Button 
          onClick={shareOnWhatsApp} 
          className="btn-secondary" 
          disabled={isUploading}
        >
          <Share className="w-4 h-4 mr-2" />
          {isUploading ? 'Uploading...' : 'Share on WhatsApp'}
        </Button>
      )}
      
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
