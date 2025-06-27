
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
          className="pdf-invoice-container"
          style={{ 
            width: '210mm', 
            minHeight: '297mm', 
            padding: '20px',
            backgroundColor: '#ffffff',
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#000000',
            fontFamily: 'Arial, sans-serif',
            border: '1px solid #e5e5e5',
            margin: '0 auto',
            boxSizing: 'border-box'
          }}
        >
          {/* Header with Logo and Invoice Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <img 
              src="/lovable-uploads/a881c037-efd2-4b54-bc5c-3000bab741b0.png" 
              alt="Anand Cycle Store Logo" 
              style={{ height: '60px', width: '60px', objectFit: 'contain' }}
            />
            <div style={{ textAlign: 'right' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#8B5CF6', margin: '0 0 8px 0' }}>INVOICE</h1>
              <div style={{ fontSize: '12px', color: '#666666' }}>
                Invoice ID: {Date.now().toString().slice(-6)}
              </div>
            </div>
          </div>

          {/* Store Address */}
          <div style={{ marginBottom: '20px', fontSize: '12px', color: '#666666' }}>
            <strong>New Anand Cycle Store</strong><br/>
            M.G.Road, Near Habib Talkies, NANDED - 431604 (M.S)<br/>
            Mob: 9393559292, 9960708348
          </div>

          {/* Divider */}
          <div style={{ borderBottom: '2px solid #000', margin: '20px 0' }}></div>

          {/* Customer Information */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#8B5CF6', fontSize: '14px', marginBottom: '8px' }}>BILL TO:</div>
            <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
              {customerInfo.name || 'Customer Name'}
            </div>
            <div style={{ fontSize: '12px', marginBottom: '2px' }}>{customerInfo.phone || 'Phone Number'}</div>
            <div style={{ fontSize: '12px' }}>{customerInfo.address || 'Customer Address'}</div>
          </div>

          {/* Date */}
          <div style={{ marginBottom: '20px', fontSize: '12px', color: '#666666', textAlign: 'right' }}>
            Date: {new Date().toLocaleDateString()}
          </div>

          {/* Items Table */}
          <div style={{ marginBottom: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #000' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ border: '1px solid #000', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '12px' }}>
                    PRODUCT/SERVICE
                  </th>
                  <th style={{ border: '1px solid #000', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}>
                    RATE (₹)
                  </th>
                  <th style={{ border: '1px solid #000', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}>
                    QTY
                  </th>
                  <th style={{ border: '1px solid #000', padding: '12px', textAlign: 'right', fontWeight: 'bold', fontSize: '12px' }}>
                    AMOUNT (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {billItems.filter(item => item.name.trim()).map((item, idx) => (
                  <tr key={item.id}>
                    <td style={{ border: '1px solid #000', padding: '12px', fontSize: '12px' }}>
                      {item.name}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '12px', textAlign: 'center', fontSize: '12px' }}>
                      {item.rate}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '12px', textAlign: 'center', fontSize: '12px' }}>
                      {item.quantity}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '12px', textAlign: 'right', fontSize: '12px' }}>
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>Visit Our Website</div>
              <img 
                src="/lovable-uploads/cfe94889-bc9a-4467-8080-b2859a186c80.png" 
                alt="Website QR Code" 
                style={{ width: '80px', height: '80px', objectFit: 'contain' }}
              />
              <div style={{ fontSize: '10px', color: '#666666', marginTop: '8px', textAlign: 'center' }}>
                Scan to Visit Our Website
              </div>
            </div>
            
            <div style={{ textAlign: 'right', minWidth: '200px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ fontWeight: 'bold' }}>SUBTOTAL:</span>
                <span style={{ fontWeight: 'bold', marginLeft: '20px' }}>₹{calculateTotal()}</span>
              </div>
              {includeGST && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ fontWeight: 'bold' }}>GST (18%):</span>
                  <span style={{ fontWeight: 'bold', marginLeft: '20px' }}>₹{calculateGST()}</span>
                </div>
              )}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontWeight: 'bold', 
                borderTop: '2px solid #000', 
                paddingTop: '8px', 
                fontSize: '16px',
                marginTop: '8px'
              }}>
                <span>TOTAL:</span>
                <span style={{ marginLeft: '20px' }}>₹{calculateGrandTotal()}</span>
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div style={{ 
            marginTop: '40px', 
            textAlign: 'center', 
            fontWeight: 'bold', 
            color: '#8B5CF6', 
            fontSize: '18px',
            marginBottom: '20px'
          }}>
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
