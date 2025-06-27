import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import CustomerInfoForm from '@/components/billing/CustomerInfoForm';
import BillItems from '@/components/billing/BillItems';
import BillActions from '@/components/billing/BillActions';
import BillPreview from '@/components/billing/BillPreview';
import RecentBills from '@/components/billing/RecentBills';
import { CustomerInfo } from '@/types/billing';
import { useBillItems } from '@/hooks/useBillItems';
import { useBills } from '@/hooks/useBills';
import { 
  calculateSubtotal, 
  calculateGST, 
  calculateGrandTotal, 
  generateBillNumber 
} from '@/utils/billCalculations';
import { 
  generatePDFBlob, 
  uploadPDFToSupabase, 
  downloadPDF, 
  printPDF 
} from '@/utils/pdfGenerator';
import { shareOnWhatsApp } from '@/utils/whatsappSharing';

const Billing = () => {
  const { toast } = useToast();
  const { logout } = useAuth();
  const { billItems, addItem, removeItem, updateItem } = useBillItems();
  const { saveBill } = useBills();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: ''
  });
  const [includeGST, setIncludeGST] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const billPreviewRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
  };

  const calculateTotal = () => calculateSubtotal(billItems);
  const calculateGSTAmount = () => calculateGST(calculateTotal(), includeGST);
  const calculateGrandTotalAmount = () => calculateGrandTotal(calculateTotal(), calculateGSTAmount());

  const generateBill = async () => {
    if (!customerInfo.name || billItems.some(item => !item.name)) {
      toast({
        title: "Missing Information",
        description: "Please fill in customer name and all item details",
        variant: "destructive"
      });
      return;
    }

    const billNo = generateBillNumber();
    
    try {
      // Save bill to database
      const billData = {
        bill_number: billNo,
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        customer_address: customerInfo.address,
        subtotal: calculateTotal(),
        gst_amount: calculateGSTAmount(),
        total_amount: calculateGrandTotalAmount(),
        include_gst: includeGST
      };

      const billItemsData = billItems
        .filter(item => item.name.trim()) // Only include items with names
        .map(item => ({
          item_name: item.name,
          quantity: item.quantity,
          rate: item.rate,
          amount: item.amount
        }));

      await saveBill(billData, billItemsData);

      toast({
        title: "Bill Generated Successfully!",
        description: "Bill #" + billNo + " has been created and saved"
      });

      // Generate PDF
      await handleGeneratePDF(false);
    } catch (err) {
      console.error('Bill generation failed:', err);
      toast({
        title: "Bill Generation Failed",
        description: (err as Error).message || String(err),
        variant: "destructive"
      });
    }
  };

  const handleShareOnWhatsApp = async () => {
    if (!customerInfo.name || !customerInfo.phone) {
      toast({ 
        title: 'Missing Info', 
        description: 'Enter customer name and phone', 
        variant: 'destructive' 
      });
      return;
    }

    setIsUploading(true);
    try {
      const billNo = generateBillNumber();
      const fileName = `${customerInfo.name.replace(/\s+/g, '_')}_BillNo${billNo}.pdf`;
      
      if (!billPreviewRef.current) {
        throw new Error('Bill preview not available');
      }

      const pdfBlob = await generatePDFBlob(billPreviewRef.current, fileName);
      const pdfUrl = await uploadPDFToSupabase(pdfBlob, fileName);
      console.log('Supabase PDF URL:', pdfUrl);
      
      const total = calculateGrandTotalAmount();
      await shareOnWhatsApp(customerInfo, total, pdfUrl);
    } catch (err) {
      toast({ 
        title: 'WhatsApp Share Failed', 
        description: (err as Error).message || String(err), 
        variant: 'destructive' 
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleGeneratePDF = async (autoPrint = false) => {
    if (!billPreviewRef.current) return;

    const billNo = generateBillNumber();
    const fileName = `Invoice_${customerInfo.name || 'Customer'}_${billNo}.pdf`;

    try {
      if (autoPrint) {
        await printPDF(billPreviewRef.current, fileName);
      } else {
        await downloadPDF(billPreviewRef.current, fileName);
      }
    } catch (err) {
      toast({
        title: "PDF Operation Failed",
        description: (err as Error).message || String(err),
        variant: "destructive"
      });
    }
  };

  return (
    <div className="py-4 px-2 sm:py-8 sm:px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Bill Generation Portal</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Create professional invoices for your customers</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-xs sm:text-sm">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>

        {/* Mobile Preview Toggle */}
        <div className="lg:hidden mb-4">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(!showPreview)}
            className="w-full flex items-center justify-center gap-2"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Bill Form - Always visible, but conditional on mobile based on preview state */}
          <div className={`space-y-4 sm:space-y-6 ${showPreview ? 'hidden lg:block' : 'block'}`}>
            <CustomerInfoForm customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} />
            <BillItems
              billItems={billItems}
              addItem={addItem}
              removeItem={removeItem}
              updateItem={updateItem}
              calculateTotal={calculateTotal}
            />
            <BillActions
              generateBill={generateBill}
              shareOnWhatsApp={handleShareOnWhatsApp}
              printBill={() => handleGeneratePDF(true)}
              isUploading={isUploading}
              billPreviewRef={billPreviewRef}
              customerName={customerInfo.name}
              total={calculateGrandTotalAmount()}
              customerInfo={customerInfo}
            />
          </div>

          {/* Preview - Hidden on mobile unless toggled, always visible on desktop */}
          <div className={`space-y-6 ${!showPreview ? 'hidden lg:block' : 'block'}`}>
            <BillPreview
              billPreviewRef={billPreviewRef}
              customerInfo={customerInfo}
              billItems={billItems}
              includeGST={includeGST}
              setIncludeGST={setIncludeGST}
              calculateTotal={calculateTotal}
              calculateGST={calculateGSTAmount}
              calculateGrandTotal={calculateGrandTotalAmount}
            />
            <div className="hidden lg:block">
              <RecentBills />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
