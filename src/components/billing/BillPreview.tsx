
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
        <div ref={billPreviewRef} className="pdf-invoice-container bg-white w-full" style={{ width: '210mm', minHeight: '297mm', padding: '15mm' }}>
          <div className="flex items-center justify-between mb-4">
            <img src={"/lovable-uploads/a881c037-efd2-4b54-bc5c-3000bab741b0.png"} alt="Anand Cycle Store Logo" className="h-16 w-16 object-contain" />
            <div className="text-right">
              <h2 className="text-2xl font-bold text-primary">INVOICE</h2>
              <div className="text-xs text-muted-foreground">Invoice ID: {Date.now().toString().slice(-6)}</div>
            </div>
          </div>
          <div className="mb-3 text-sm text-muted-foreground">M.G.Road, Near Habib Talkies, NANDED - 431604 (M.S)<br/>Mob: 9393559292, 9960708348</div>
          <div className="border-b-2 my-3"></div>
          <div className="mb-3">
            <span className="font-semibold text-primary text-base">INVOICE TO:</span><br/>
            <span className="font-bold text-lg">{customerInfo.name || 'Customer Name'}</span><br/>
            <span className="text-sm">{customerInfo.phone || 'Phone Number'}</span><br/>
            <span className="text-xs">{customerInfo.address || 'Customer Address'}</span>
          </div>
          <div className="mb-3 text-xs text-muted-foreground text-right">{new Date().toLocaleDateString()}</div>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-2">
              <thead>
                <tr className="bg-muted">
                  <th className="border-2 px-3 py-2 text-left font-bold">PRODUCT</th>
                  <th className="border-2 px-3 py-2 font-bold">PRICE</th>
                  <th className="border-2 px-3 py-2 font-bold">QTY</th>
                  <th className="border-2 px-3 py-2 font-bold">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {billItems.slice(0, 5).map((item, idx) => (
                  <tr key={item.id}>
                    <td className="border-2 px-3 py-2 text-sm">{item.name || `Item ${idx + 1}`}</td>
                    <td className="border-2 px-3 py-2 text-center text-sm">₹{item.rate}</td>
                    <td className="border-2 px-3 py-2 text-center text-sm">{item.quantity}</td>
                    <td className="border-2 px-3 py-2 text-right text-sm">₹{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col items-center">
              <div className="text-xs font-semibold mb-1">Pay Online</div>
              <img 
                src="/lovable-uploads/cfe94889-bc9a-4467-8080-b2859a186c80.png" 
                alt="Payment QR Code" 
                className="w-20 h-20 object-contain"
              />
              <div className="text-xs text-muted-foreground mt-1 text-center">Scan to Pay</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between w-40 text-base">
                <span className="font-semibold">SUB-TOTAL</span>
                <span className="font-semibold">₹{calculateTotal()}</span>
              </div>
              {includeGST && (
                <div className="flex justify-between w-40 text-base">
                  <span className="font-semibold">GST (18%)</span>
                  <span className="font-semibold">₹{calculateGST()}</span>
                </div>
              )}
              <div className="flex justify-between w-40 font-bold border-t-2 pt-1 text-lg">
                <span>TOTAL</span>
                <span>₹{calculateGrandTotal()}</span>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center font-bold text-primary text-xl">THANK YOU FOR YOUR BUSINESS</div>
          <div className="mt-3 text-right text-base font-bold">New Anand Cycle Store</div>
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
