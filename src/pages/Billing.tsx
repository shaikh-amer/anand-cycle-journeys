import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Receipt, Share, Printer, Search, LogOut } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import html2pdf from 'html2pdf.js';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/df07bq1h1/raw/upload';
const CLOUDINARY_PRESET = 'unsigned_bills';

// Update CSS for A4 aspect ratio and full-page fill
const pdfStyles = `
  .pdf-invoice-container { width: 794px !important; height: 1123px !important; margin: 0 auto; display: flex; flex-direction: column; justify-content: space-between; }
  .pdf-invoice-container * { font-size: 12px !important; }
`;

const Billing = () => {
  const { toast } = useToast();
  const { logout } = useAuth();
  const [billItems, setBillItems] = useState([
    { id: 1, name: '', quantity: 1, rate: 0, amount: 0 }
  ]);
  const [customerInfo, setCustomerInfo] = useState({
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

  const uploadPDFToCloudinary = async (pdfBlob: Blob, fileName: string) => {
    const formData = new FormData();
    formData.append('file', pdfBlob, fileName);
    formData.append('upload_preset', CLOUDINARY_PRESET);
    formData.append('folder', 'bills');
    const res = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
    if (!res.ok) throw new Error('Cloudinary upload failed');
    const data = await res.json();
    return data.secure_url;
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
      const pdfUrl = await uploadPDFToCloudinary(pdfBlob, fileName);
      console.log('Cloudinary PDF URL:', pdfUrl);
      let phone = customerInfo.phone.replace(/^0+/, '');
      if (!phone.startsWith('91')) phone = '91' + phone;
      const total = calculateGrandTotal();
      const message = `Hello ${customerInfo.name},\nYour bill of ₹${total} is ready.\nDownload: ${pdfUrl}`;
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
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
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                  <CardDescription>Enter customer details for the invoice</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Customer Name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    />
                    <Input
                      placeholder="Phone Number"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    />
                  </div>
                  <Textarea
                    placeholder="Customer Address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  />
                </CardContent>
              </Card>

              {/* Bill Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Bill Items
                    <Button onClick={addItem} size="sm" className="btn-primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {billItems.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 items-end p-4 bg-muted/30 rounded-lg">
                      <div className="col-span-12 md:col-span-4">
                        <label className="text-sm font-medium text-muted-foreground">Product/Service</label>
                        <Input
                          placeholder="Item name"
                          value={item.name}
                          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                        />
                      </div>
                      <div className="col-span-4 md:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">Qty</label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="col-span-4 md:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">Rate (₹)</label>
                        <Input
                          type="number"
                          min="0"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-3 md:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">Amount (₹)</label>
                        <div className="font-semibold text-lg">{item.amount}</div>
                      </div>
                      <div className="col-span-1 md:col-span-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          disabled={billItems.length === 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total Amount:</span>
                      <span className="text-primary">₹{calculateTotal()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <Button onClick={generateBill} className="btn-primary">
                  <Receipt className="w-4 h-4 mr-2" />
                  Generate Bill
                </Button>
                <Button onClick={shareOnWhatsApp} className="btn-secondary" disabled={isUploading}>
                  <Share className="w-4 h-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Share on WhatsApp'}
                </Button>
                <Button variant="outline" onClick={() => handleGeneratePDF(true)}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>

            {/* Recent Bills & Preview */}
            <div className="space-y-6">
              {/* Bill Preview */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Bill Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div ref={billPreviewRef} className="pdf-invoice-container bg-white rounded-lg shadow p-6 max-w-lg mx-auto border">
                    <div className="flex items-center justify-between mb-4">
                      <img src={"/lovable-uploads/a881c037-efd2-4b54-bc5c-3000bab741b0.png"} alt="Anand Cycle Store Logo" className="h-16 w-16 object-contain" />
                      <div className="text-right">
                        <h2 className="text-2xl font-bold text-primary">INVOICE</h2>
                        <div className="text-xs text-muted-foreground">Invoice ID: {Date.now().toString().slice(-6)}</div>
                      </div>
                    </div>
                    <div className="mb-2 text-sm text-muted-foreground">M.G.Road, Near Habib Talkies, NANDED - 431604 (M.S)<br/>Mob: 9393559292, 9960708348</div>
                    <div className="border-b my-2"></div>
                    <div className="mb-2">
                      <span className="font-semibold text-primary">INVOICE TO:</span><br/>
                      <span className="font-bold text-lg">{customerInfo.name || 'Customer Name'}</span><br/>
                      <span className="text-sm">{customerInfo.phone || 'Phone Number'}</span><br/>
                      <span className="text-xs">{customerInfo.address || 'Customer Address'}</span>
                    </div>
                    <div className="mb-2 text-xs text-muted-foreground text-right">{new Date().toLocaleDateString()}</div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border mb-4">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border px-2 py-1 text-left">PRODUCT</th>
                            <th className="border px-2 py-1">PRICE</th>
                            <th className="border px-2 py-1">QTY</th>
                            <th className="border px-2 py-1">TOTAL</th>
                          </tr>
                        </thead>
                        <tbody>
                          {billItems.map((item, idx) => (
                            <tr key={item.id}>
                              <td className="border px-2 py-1">{item.name || `Item ${idx + 1}`}</td>
                              <td className="border px-2 py-1 text-center">₹{item.rate}</td>
                              <td className="border px-2 py-1 text-center">{item.quantity}</td>
                              <td className="border px-2 py-1 text-right">₹{item.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex flex-col items-end gap-1 mb-2">
                      <div className="flex justify-between w-1/2">
                        <span>SUB-TOTAL</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                      {includeGST && (
                        <div className="flex justify-between w-1/2">
                          <span>GST (18%)</span>
                          <span>₹{calculateGST()}</span>
                        </div>
                      )}
                      <div className="flex justify-between w-1/2 font-bold border-t pt-1">
                        <span>TOTAL</span>
                        <span>₹{calculateGrandTotal()}</span>
                      </div>
                    </div>
                    <div className="my-2">
                      <span className="font-semibold">Payment Method</span>
                      <div className="text-xs text-muted-foreground">(Cash / UPI / Card / Bank)</div>
                    </div>
                    <div className="mt-6 text-center font-semibold text-primary text-lg">THANK YOU FOR YOUR BUSINESS</div>
                    <div className="mt-2 text-right text-sm font-bold">New Anand Cycle Store</div>
                  </div>
                  <div className="flex items-center mt-4">
                    <input type="checkbox" id="gst" checked={includeGST} onChange={e => setIncludeGST(e.target.checked)} className="mr-2" />
                    <label htmlFor="gst" className="text-sm">Include GST (18%)</label>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Bills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Bills
                    <Button size="sm" variant="outline">
                      <Search className="w-4 h-4 mr-2" />
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { id: '#001234', customer: 'Rahul Sharma', amount: 15600, date: 'Today' },
                    { id: '#001233', customer: 'Priya Patel', amount: 8400, date: 'Yesterday' },
                    { id: '#001232', customer: 'Amit Kumar', amount: 22500, date: '2 days ago' }
                  ].map((bill) => (
                    <div key={bill.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <div className="font-semibold text-sm">{bill.customer}</div>
                        <div className="text-xs text-muted-foreground">{bill.id} • {bill.date}</div>
                      </div>
                      <Badge variant="outline">₹{bill.amount}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Billing;
