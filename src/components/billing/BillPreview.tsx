
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
        <div 
          ref={billPreviewRef} 
          className="pdf-invoice-container bg-white p-5 border border-gray-200 mx-auto max-w-4xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b-2 border-violet-500 pb-4">
            <div className="w-16 h-16 bg-violet-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              LOGO
            </div>
            <div className="text-right">
              <h1 className="text-3xl font-bold text-violet-500 mb-2">INVOICE</h1>
              <div className="text-gray-600 text-sm">
                Invoice ID: {Date.now().toString().slice(-6)}
              </div>
            </div>
          </div>

          {/* Store Information */}
          <div className="mb-6 text-center bg-gray-50 p-4 rounded-lg">
            <div className="text-xl font-bold text-violet-500 mb-2">
              New Anand Cycle Store
            </div>
            <div className="text-gray-700">
              M.G.Road, Near Habib Talkies, NANDED - 431604 (M.S)<br/>
              Mob: 9393559292, 9960708348
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-6 border border-gray-200 p-4 rounded-lg">
            <div className="font-bold text-violet-500 text-lg mb-3">BILL TO:</div>
            <div className="font-bold text-xl mb-2">
              {customerInfo.name || 'Customer Name'}
            </div>
            <div className="text-gray-700 mb-1">{customerInfo.phone || 'Phone Number'}</div>
            <div className="text-gray-700">{customerInfo.address || 'Customer Address'}</div>
          </div>

          {/* Date */}
          <div className="mb-6 text-right text-gray-600">
            <strong>Date: {new Date().toLocaleDateString()}</strong>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <table className="w-full border-collapse border-2 border-gray-800">
              <thead>
                <tr className="bg-violet-500 text-white">
                  <th className="border border-gray-800 p-3 text-left font-bold">
                    PRODUCT/SERVICE
                  </th>
                  <th className="border border-gray-800 p-3 text-center font-bold">
                    RATE (₹)
                  </th>
                  <th className="border border-gray-800 p-3 text-center font-bold">
                    QTY
                  </th>
                  <th className="border border-gray-800 p-3 text-right font-bold">
                    AMOUNT (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {billItems.filter(item => item.name.trim()).map((item, idx) => (
                  <tr key={item.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border border-gray-800 p-3">
                      {item.name}
                    </td>
                    <td className="border border-gray-800 p-3 text-center">
                      ₹{item.rate}
                    </td>
                    <td className="border border-gray-800 p-3 text-center">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-800 p-3 text-right">
                      ₹{item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex flex-col items-center">
              <div className="text-sm font-bold mb-2">Visit Our Website</div>
              <div className="w-20 h-20 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs">
                QR CODE
              </div>
              <div className="text-xs text-gray-600 mt-2 text-center">
                Scan to Visit Our Website
              </div>
            </div>
            
            <div className="text-right min-w-64 border-2 border-violet-500 p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between mb-3 text-lg">
                <span className="font-bold">SUBTOTAL:</span>
                <span className="font-bold ml-8">₹{calculateTotal()}</span>
              </div>
              {includeGST && (
                <div className="flex justify-between mb-3 text-lg">
                  <span className="font-bold">GST (18%):</span>
                  <span className="font-bold ml-8">₹{calculateGST()}</span>
                </div>
              )}
              <div className="flex justify-between font-bold border-t-2 border-violet-500 pt-3 text-xl text-violet-500">
                <span>TOTAL:</span>
                <span className="ml-8">₹{calculateGrandTotal()}</span>
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="text-center font-bold text-violet-500 text-2xl border-2 border-violet-500 p-4 rounded-lg">
            THANK YOU FOR YOUR BUSINESS!
          </div>
        </div>

        {/* GST Checkbox */}
        <div className="flex items-center mt-4">
          <input 
            type="checkbox" 
            id="gst" 
            checked={includeGST} 
            onChange={e => setIncludeGST(e.target.checked)} 
            className="mr-2" 
          />
          <label htmlFor="gst" className="text-sm">Include GST (18%)</label>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillPreview;
