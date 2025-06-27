
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
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#000000',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e5e5',
            margin: '0 auto',
            boxSizing: 'border-box',
            display: 'block',
            position: 'relative'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '2px solid #8B5CF6', paddingBottom: '10px' }}>
            <div style={{ height: '60px', width: '60px', backgroundColor: '#8B5CF6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
              LOGO
            </div>
            <div style={{ textAlign: 'right' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#8B5CF6', margin: '0 0 8px 0' }}>INVOICE</h1>
              <div style={{ fontSize: '14px', color: '#666666' }}>
                Invoice ID: {Date.now().toString().slice(-6)}
              </div>
            </div>
          </div>

          {/* Store Information */}
          <div style={{ marginBottom: '25px', textAlign: 'center', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#8B5CF6', marginBottom: '5px' }}>
              New Anand Cycle Store
            </div>
            <div style={{ fontSize: '14px', color: '#333333' }}>
              M.G.Road, Near Habib Talkies, NANDED - 431604 (M.S)<br/>
              Mob: 9393559292, 9960708348
            </div>
          </div>

          {/* Customer Information */}
          <div style={{ marginBottom: '25px', border: '1px solid #e5e5e5', padding: '15px', borderRadius: '8px' }}>
            <div style={{ fontWeight: 'bold', color: '#8B5CF6', fontSize: '16px', marginBottom: '10px' }}>BILL TO:</div>
            <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '5px' }}>
              {customerInfo.name || 'Customer Name'}
            </div>
            <div style={{ fontSize: '14px', marginBottom: '3px' }}>{customerInfo.phone || 'Phone Number'}</div>
            <div style={{ fontSize: '14px' }}>{customerInfo.address || 'Customer Address'}</div>
          </div>

          {/* Date */}
          <div style={{ marginBottom: '25px', fontSize: '14px', color: '#666666', textAlign: 'right' }}>
            <strong>Date: {new Date().toLocaleDateString()}</strong>
          </div>

          {/* Items Table */}
          <div style={{ marginBottom: '25px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #333' }}>
              <thead>
                <tr style={{ backgroundColor: '#8B5CF6', color: 'white' }}>
                  <th style={{ border: '1px solid #333', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px' }}>
                    PRODUCT/SERVICE
                  </th>
                  <th style={{ border: '1px solid #333', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
                    RATE (₹)
                  </th>
                  <th style={{ border: '1px solid #333', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
                    QTY
                  </th>
                  <th style={{ border: '1px solid #333', padding: '12px', textAlign: 'right', fontWeight: 'bold', fontSize: '14px' }}>
                    AMOUNT (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {billItems.filter(item => item.name.trim()).map((item, idx) => (
                  <tr key={item.id} style={{ backgroundColor: idx % 2 === 0 ? '#f8f9fa' : 'white' }}>
                    <td style={{ border: '1px solid #333', padding: '12px', fontSize: '14px' }}>
                      {item.name}
                    </td>
                    <td style={{ border: '1px solid #333', padding: '12px', textAlign: 'center', fontSize: '14px' }}>
                      ₹{item.rate}
                    </td>
                    <td style={{ border: '1px solid #333', padding: '12px', textAlign: 'center', fontSize: '14px' }}>
                      {item.quantity}
                    </td>
                    <td style={{ border: '1px solid #333', padding: '12px', textAlign: 'right', fontSize: '14px' }}>
                      ₹{item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>Visit Our Website</div>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                QR CODE
              </div>
              <div style={{ fontSize: '12px', color: '#666666', marginTop: '8px', textAlign: 'center' }}>
                Scan to Visit Our Website
              </div>
            </div>
            
            <div style={{ textAlign: 'right', minWidth: '250px', border: '2px solid #8B5CF6', padding: '15px', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '16px' }}>
                <span style={{ fontWeight: 'bold' }}>SUBTOTAL:</span>
                <span style={{ fontWeight: 'bold', marginLeft: '30px' }}>₹{calculateTotal()}</span>
              </div>
              {includeGST && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '16px' }}>
                  <span style={{ fontWeight: 'bold' }}>GST (18%):</span>
                  <span style={{ fontWeight: 'bold', marginLeft: '30px' }}>₹{calculateGST()}</span>
                </div>
              )}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontWeight: 'bold', 
                borderTop: '2px solid #8B5CF6', 
                paddingTop: '10px', 
                fontSize: '18px',
                marginTop: '10px',
                color: '#8B5CF6'
              }}>
                <span>TOTAL:</span>
                <span style={{ marginLeft: '30px' }}>₹{calculateGrandTotal()}</span>
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div style={{ 
            marginTop: '40px', 
            textAlign: 'center', 
            fontWeight: 'bold', 
            color: '#8B5CF6', 
            fontSize: '20px',
            marginBottom: '20px',
            border: '2px solid #8B5CF6',
            padding: '15px',
            borderRadius: '8px'
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
