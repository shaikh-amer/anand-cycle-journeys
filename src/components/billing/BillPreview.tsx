
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
        <div ref={billPreviewRef} className="pdf-invoice-container bg-white w-full" style={{ width: '210mm', minHeight: '297mm', padding: '10mm' }}>
          <div className="flex items-center justify-between mb-3">
            <img src={"/lovable-uploads/a881c037-efd2-4b54-bc5c-3000bab741b0.png"} alt="Anand Cycle Store Logo" className="h-12 w-12 object-contain" />
            <div className="text-right">
              <h2 className="text-xl font-bold text-primary">INVOICE</h2>
              <div className="text-xs text-muted-foreground">Invoice ID: {Date.now().toString().slice(-6)}</div>
            </div>
          </div>
          <div className="mb-2 text-xs text-muted-foreground">M.G.Road, Near Habib Talkies, NANDED - 431604 (M.S)<br/>Mob: 9393559292, 9960708348</div>
          <div className="border-b-2 my-2"></div>
          <div className="mb-2">
            <span className="font-semibold text-primary text-sm">INVOICE TO:</span><br/>
            <span className="font-bold text-base">{customerInfo.name || 'Customer Name'}</span><br/>
            <span className="text-xs">{customerInfo.phone || 'Phone Number'}</span><br/>
            <span className="text-xs">{customerInfo.address || 'Customer Address'}</span>
          </div>
          <div className="mb-2 text-xs text-muted-foreground text-right">{new Date().toLocaleDateString()}</div>
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-xs border-2">
              <thead>
                <tr className="bg-muted">
                  <th className="border-2 px-2 py-1 text-left font-bold">PRODUCT</th>
                  <th className="border-2 px-2 py-1 font-bold">PRICE</th>
                  <th className="border-2 px-2 py-1 font-bold">QTY</th>
                  <th className="border-2 px-2 py-1 font-bold">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {billItems.slice(0, 5).map((item, idx) => (
                  <tr key={item.id}>
                    <td className="border-2 px-2 py-1 text-xs">{item.name || `Item ${idx + 1}`}</td>
                    <td className="border-2 px-2 py-1 text-center text-xs">₹{item.rate}</td>
                    <td className="border-2 px-2 py-1 text-center text-xs">{item.quantity}</td>
                    <td className="border-2 px-2 py-1 text-right text-xs">₹{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-start mb-3">
            <div className="flex flex-col items-center">
              <div className="text-xs font-semibold mb-1">Visit Our Website</div>
              <img 
                src="/lovable-uploads/cfe94889-bc9a-4467-8080-b2859a186c80.png" 
                alt="Website QR Code" 
                className="w-16 h-16 object-contain"
              />
              <div className="text-xs text-muted-foreground mt-1 text-center">Scan to Visit</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between w-32 text-sm">
                <span className="font-semibold">SUB-TOTAL</span>
                <span className="font-semibold">₹{calculateTotal()}</span>
              </div>
              {includeGST && (
                <div className="flex justify-between w-32 text-sm">
                  <span className="font-semibold">GST (18%)</span>
                  <span className="font-semibold">₹{calculateGST()}</span>
                </div>
              )}
              <div className="flex justify-between w-32 font-bold border-t-2 pt-1 text-base">
                <span>TOTAL</span>
                <span>₹{calculateGrandTotal()}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center font-bold text-primary text-lg">THANK YOU FOR YOUR BUSINESS</div>
          <div className="mt-2 text-right text-sm font-bold">New Anand Cycle Store</div>
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
