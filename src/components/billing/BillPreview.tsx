
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BillItem, CustomerInfo } from '@/types/billing';

interface BillPreviewProps {
  billPreviewRef: React.RefObject<HTMLDivElement>;
  customerInfo: CustomerInfo;
  billItems: BillItem[];
  includeGST: boolean;
  setIncludeGST: (include: boolean) => void;
  calculateTotal: () => number;
  calculateGST: () => number;
  calculateGrandTotal: () => number;
}

const BillPreview = ({
  billPreviewRef,
  customerInfo,
  billItems,
  includeGST,
  setIncludeGST,
  calculateTotal,
  calculateGST,
  calculateGrandTotal
}: BillPreviewProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Bill Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={billPreviewRef} className="pdf-invoice-container bg-white w-full min-h-[297mm] p-8" style={{ width: '210mm', minHeight: '297mm' }}>
          <div className="flex items-center justify-between mb-6">
            <img src={"/lovable-uploads/a881c037-efd2-4b54-bc5c-3000bab741b0.png"} alt="Anand Cycle Store Logo" className="h-20 w-20 object-contain" />
            <div className="text-right">
              <h2 className="text-3xl font-bold text-primary">INVOICE</h2>
              <div className="text-sm text-muted-foreground">Invoice ID: {Date.now().toString().slice(-6)}</div>
            </div>
          </div>
          <div className="mb-4 text-base text-muted-foreground">M.G.Road, Near Habib Talkies, NANDED - 431604 (M.S)<br/>Mob: 9393559292, 9960708348</div>
          <div className="border-b-2 my-4"></div>
          <div className="mb-4">
            <span className="font-semibold text-primary text-lg">INVOICE TO:</span><br/>
            <span className="font-bold text-xl">{customerInfo.name || 'Customer Name'}</span><br/>
            <span className="text-base">{customerInfo.phone || 'Phone Number'}</span><br/>
            <span className="text-sm">{customerInfo.address || 'Customer Address'}</span>
          </div>
          <div className="mb-4 text-sm text-muted-foreground text-right">{new Date().toLocaleDateString()}</div>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-base border-2">
              <thead>
                <tr className="bg-muted">
                  <th className="border-2 px-4 py-3 text-left font-bold">PRODUCT</th>
                  <th className="border-2 px-4 py-3 font-bold">PRICE</th>
                  <th className="border-2 px-4 py-3 font-bold">QTY</th>
                  <th className="border-2 px-4 py-3 font-bold">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {billItems.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="border-2 px-4 py-3">{item.name || `Item ${idx + 1}`}</td>
                    <td className="border-2 px-4 py-3 text-center">₹{item.rate}</td>
                    <td className="border-2 px-4 py-3 text-center">{item.quantity}</td>
                    <td className="border-2 px-4 py-3 text-right">₹{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col items-center">
              <div className="text-sm font-semibold mb-2">Pay Online</div>
              <img 
                src="/lovable-uploads/cfe94889-bc9a-4467-8080-b2859a186c80.png" 
                alt="Payment QR Code" 
                className="w-24 h-24 object-contain"
              />
              <div className="text-xs text-muted-foreground mt-1 text-center">Scan to Pay</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between w-48 text-lg">
                <span className="font-semibold">SUB-TOTAL</span>
                <span className="font-semibold">₹{calculateTotal()}</span>
              </div>
              {includeGST && (
                <div className="flex justify-between w-48 text-lg">
                  <span className="font-semibold">GST (18%)</span>
                  <span className="font-semibold">₹{calculateGST()}</span>
                </div>
              )}
              <div className="flex justify-between w-48 font-bold border-t-2 pt-2 text-xl">
                <span>TOTAL</span>
                <span>₹{calculateGrandTotal()}</span>
              </div>
            </div>
          </div>
          <div className="my-6">
            <span className="font-semibold text-lg">Payment Method</span>
            <div className="text-base text-muted-foreground">(Cash / UPI / Card / Bank)</div>
          </div>
          <div className="mt-12 text-center font-bold text-primary text-2xl">THANK YOU FOR YOUR BUSINESS</div>
          <div className="mt-4 text-right text-lg font-bold">New Anand Cycle Store</div>
        </div>
        <div className="flex items-center mt-4">
          <input type="checkbox" id="gst" checked={includeGST} onChange={e => setIncludeGST(e.target.checked)} className="mr-2" />
          <label htmlFor="gst" className="text-sm">Include GST (18%)</label>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillPreview;
