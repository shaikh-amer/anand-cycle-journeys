
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
          className="pdf-invoice-container bg-white w-full border border-gray-200" 
          style={{ 
            width: '210mm', 
            minHeight: '297mm', 
            padding: '10mm',
            fontSize: '12px',
            lineHeight: '1.4',
            color: '#000000',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          {/* Header with Logo and Invoice Title */}
          <div className="flex items-center justify-between mb-4" style={{ marginBottom: '16px' }}>
            <img 
              src="/lovable-uploads/a881c037-efd2-4b54-bc5c-3000bab741b0.png" 
              alt="Anand Cycle Store Logo" 
              style={{ height: '48px', width: '48px', objectFit: 'contain' }}
            />
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#8B5CF6', margin: '0' }}>INVOICE</h2>
              <div style={{ fontSize: '10px', color: '#666666', marginTop: '4px' }}>
                Invoice ID: {Date.now().toString().slice(-6)}
              </div>
            </div>
          </div>

          {/* Store Address */}
          <div style={{ marginBottom: '12px', fontSize: '10px', color: '#666666' }}>
            M.G.Road, Near Habib Talkies, NANDED - 431604 (M.S)<br/>
            Mob: 9393559292, 9960708348
          </div>

          {/* Divider */}
          <div style={{ borderBottom: '2px solid #000', margin: '8px 0' }}></div>

          {/* Customer Information */}
          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontWeight: 'bold', color: '#8B5CF6', fontSize: '12px' }}>INVOICE TO:</span><br/>
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
              {customerInfo.name || 'Customer Name'}
            </span><br/>
            <span style={{ fontSize: '10px' }}>{customerInfo.phone || 'Phone Number'}</span><br/>
            <span style={{ fontSize: '10px' }}>{customerInfo.address || 'Customer Address'}</span>
          </div>

          {/* Date */}
          <div style={{ marginBottom: '12px', fontSize: '10px', color: '#666666', textAlign: 'right' }}>
            {new Date().toLocaleDateString()}
          </div>

          {/* Items Table */}
          <div style={{ marginBottom: '16px' }}>
            <table style={{ width: '100%', fontSize: '10px', borderCollapse: 'collapse', border: '2px solid #000' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ border: '2px solid #000', padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>
                    PRODUCT
                  </th>
                  <th style={{ border: '2px solid #000', padding: '8px', fontWeight: 'bold' }}>
                    PRICE
                  </th>
                  <th style={{ border: '2px solid #000', padding: '8px', fontWeight: 'bold' }}>
                    QTY
                  </th>
                  <th style={{ border: '2px solid #000', padding: '8px', fontWeight: 'bold' }}>
                    TOTAL
                  </th>
                </tr>
              </thead>
              <tbody>
                {billItems.slice(0, 10).map((item, idx) => (
                  <tr key={item.id}>
                    <td style={{ border: '2px solid #000', padding: '8px', fontSize: '10px' }}>
                      {item.name || `Item ${idx + 1}`}
                    </td>
                    <td style={{ border: '2px solid #000', padding: '8px', textAlign: 'center', fontSize: '10px' }}>
                      ₹{item.rate}
                    </td>
                    <td style={{ border: '2px solid #000', padding: '8px', textAlign: 'center', fontSize: '10px' }}>
                      {item.quantity}
                    </td>
                    <td style={{ border: '2px solid #000', padding: '8px', textAlign: 'right', fontSize: '10px' }}>
                      ₹{item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer with QR Code and Totals */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '4px' }}>Visit Our Website</div>
              <img 
                src="/lovable-uploads/cfe94889-bc9a-4467-8080-b2859a186c80.png" 
                alt="Website QR Code" 
                style={{ width: '64px', height: '64px', objectFit: 'contain' }}
              />
              <div style={{ fontSize: '8px', color: '#666666', marginTop: '4px', textAlign: 'center' }}>
                Scan to Visit
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '128px', fontSize: '12px' }}>
                <span style={{ fontWeight: 'bold' }}>SUB-TOTAL</span>
                <span style={{ fontWeight: 'bold' }}>₹{calculateTotal()}</span>
              </div>
              {includeGST && (
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '128px', fontSize: '12px' }}>
                  <span style={{ fontWeight: 'bold' }}>GST (18%)</span>
                  <span style={{ fontWeight: 'bold' }}>₹{calculateGST()}</span>
                </div>
              )}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                width: '128px', 
                fontWeight: 'bold', 
                borderTop: '2px solid #000', 
                paddingTop: '4px', 
                fontSize: '14px' 
              }}>
                <span>TOTAL</span>
                <span>₹{calculateGrandTotal()}</span>
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div style={{ 
            marginTop: '24px', 
            textAlign: 'center', 
            fontWeight: 'bold', 
            color: '#8B5CF6', 
            fontSize: '16px' 
          }}>
            THANK YOU FOR YOUR BUSINESS
          </div>
          
          {/* Store Name */}
          <div style={{ 
            marginTop: '8px', 
            textAlign: 'right', 
            fontSize: '12px', 
            fontWeight: 'bold' 
          }}>
            New Anand Cycle Store
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
