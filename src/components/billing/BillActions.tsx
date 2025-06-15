
import { Button } from '@/components/ui/button';
import { Receipt, Share, Printer } from 'lucide-react';

interface BillActionsProps {
  generateBill: () => void;
  shareOnWhatsApp: () => void;
  printBill: () => void;
  isUploading: boolean;
}

const BillActions = ({ generateBill, shareOnWhatsApp, printBill, isUploading }: BillActionsProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Button onClick={generateBill} className="btn-primary">
        <Receipt className="w-4 h-4 mr-2" />
        Generate Bill
      </Button>
      <Button onClick={shareOnWhatsApp} className="btn-secondary" disabled={isUploading}>
        <Share className="w-4 h-4 mr-2" />
        {isUploading ? 'Uploading...' : 'Share on WhatsApp'}
      </Button>
      <Button variant="outline" onClick={printBill}>
        <Printer className="w-4 h-4 mr-2" />
        Print
      </Button>
    </div>
  );
};

export default BillActions;
