
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
  );
};

export default BillPreview;
