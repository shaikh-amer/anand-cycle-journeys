
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import html2pdf from 'html2pdf.js';
import { supabase } from '@/integrations/supabase/client';
import CustomerInfoForm from '@/components/billing/CustomerInfoForm';
import BillItems from '@/components/billing/BillItems';
import BillActions from '@/components/billing/BillActions';
import BillPreview from '@/components/billing/BillPreview';
import RecentBills from '@/components/billing/RecentBills';
import { BillItem, CustomerInfo } from '@/types/billing';

// Update CSS for A4 aspect ratio and full-page fill
const pdfStyles = `
  .pdf-invoice-container { width: 794px !important; height: 1123px !important; margin: 0 auto; display: flex; flex-direction: column; justify-content: space-between; }
  .pdf-invoice-container * { font-size: 12px !important; }
`;

const Billing = () => {
  const { toast } = useToast();
  const { logout } = useAuth();
  const [billItems, setBillItems] = useState<BillItem[]>([
    { id: Date.now(), name: '', quantity: 1, rate: 0, amount: 0 }
  ]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: ''
  });
  const [includeGST, setIncludeGST] = useState(false);
  const billPreviewRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setBillItems([...billItems, newItem]);
  };

  const removeItem = (id: number) => {
    if (billItems.length > 1) {
      setBillItems(billItems.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: string, value: any) => {
    setBillItems(billItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return billItems.reduce((total, item) => total + item.amount, 0);
  };

  const calculateGST = () => includeGST ? Math.round(calculateTotal() * 0.18) : 0;
  const calculateGrandTotal = () => calculateTotal() + calculateGST();

  const generateBill = async () => {
    if (!customerInfo.name || billItems.some(item => !item.name)) {
      toast({
        title: "Missing Information",
        description: "Please fill in customer name and all item details",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Bill Generated Successfully!",
      description: "Bill #" + Date.now().toString().slice(-6) + " has been created"
    });
    try {
      await handleGeneratePDF(false);
    } catch (err) {
      console.error('PDF generation failed:', err);
      toast({
        title: "PDF Generation Failed",
        description: (err as Error).message || String(err),
        variant: "destructive"
      });
    }
  };

  const generatePDFBlob = () => {
    if (!billPreviewRef.current) return Promise.resolve(null);
    const element = billPreviewRef.current;
    const billNo = Date.now().toString().slice(-6);
    const fileName = `${customerInfo.name.replace(/\s+/g, '_')}_BillNo${billNo}.pdf`;
  
    const opt = {
      margin: [0.2, 0.2, 0.2, 0.2],
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
  
    return html2pdf().from(element).set(opt).outputPdf('blob');
  };

  const uploadPDFToSupabase = async (pdfBlob: Blob, fileName: string) => {
    const { data, error } = await supabase.storage
      .from('bills')
      .upload(fileName, pdfBlob, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new Error('Supabase upload failed: ' + error.message);
    }
    
    const { data: publicUrlData } = supabase.storage
      .from('bills')
      .getPublicUrl(data.path);

    if (!publicUrlData) {
        throw new Error('Could not get public URL for the uploaded file.');
    }

    return publicUrlData.publicUrl;
  };

  const shareOnWhatsApp = async () => {
    if (!customerInfo.name || !customerInfo.phone) {
      toast({ title: 'Missing Info', description: 'Enter customer name and phone', variant: 'destructive' });
      return;
    }
    setIsUploading(true);
    try {
      const billNo = Date.now().toString().slice(-6);
      const fileName = `${customerInfo.name.replace(/\s+/g, '_')}_BillNo${billNo}.pdf`;
      const pdfBlob = await generatePDFBlob();
      if (!pdfBlob) throw new Error('PDF generation failed');
      const pdfUrl = await uploadPDFToSupabase(pdfBlob, fileName);
      console.log('Supabase PDF URL:', pdfUrl);
      
      // Clean phone number: remove leading zeros and ensure it starts with 91
      let phone = customerInfo.phone.replace(/^0+/, '');
      if (!phone.startsWith('91')) phone = '91' + phone;
      
      const total = calculateGrandTotal();
      
      // Format message with proper line breaks and https:// prefix for clickable link
      const message = `Hello ${customerInfo.name},\nYour bill of ₹${total} is ready.\nDownload here:\nhttps://${pdfUrl.replace(/^https?:\/\//, '')}`;
      
      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    } catch (err) {
      toast({ title: 'WhatsApp Share Failed', description: (err as Error).message || String(err), variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleGeneratePDF = async (autoPrint = false) => {
    if (!billPreviewRef.current) return;
    const element = billPreviewRef.current;
    const billNo = Date.now().toString().slice(-6);
    const fileName = `Invoice_${customerInfo.name || 'Customer'}_${billNo}.pdf`;
  
    const opt = {
      margin: [0.2, 0.2, 0.2, 0.2],
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
  
    const worker = html2pdf().from(element).set(opt);
  
    if (autoPrint) {
      const pdfBlob = await worker.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      const pdfWindow = window.open(blobUrl, '_blank');
      if (pdfWindow) {
        pdfWindow.onload = () => {
          pdfWindow.print();
        };
      } else {
        toast({
          title: "Print Failed",
          description: "Please disable your pop-up blocker to print.",
          variant: "destructive"
        });
      }
    } else {
      await worker.save();
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">Bill Generation Portal</h1>
            <p className="text-muted-foreground">Create professional invoices for your customers</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bill Form */}
          <div className="lg:col-span-2 space-y-6">
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
              shareOnWhatsApp={shareOnWhatsApp}
              printBill={() => handleGeneratePDF(true)}
              isUploading={isUploading}
            />
          </div>

          {/* Recent Bills & Preview */}
          <div className="space-y-6">
            <BillPreview
              billPreviewRef={billPreviewRef}
              customerInfo={customerInfo}
              billItems={billItems}
              includeGST={includeGST}
              setIncludeGST={setIncludeGST}
              calculateTotal={calculateTotal}
              calculateGST={calculateGST}
              calculateGrandTotal={calculateGrandTotal}
            />
            <RecentBills />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
