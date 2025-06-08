
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Receipt, Share, Printer, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Billing = () => {
  const { toast } = useToast();
  const [billItems, setBillItems] = useState([
    { id: 1, name: '', quantity: 1, rate: 0, amount: 0 }
  ]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

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

  const generateBill = () => {
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
  };

  const shareOnWhatsApp = () => {
    const billText = `*ANAND CYCLE STORES*\nWHOLE SALE & RETAIL\n\nCustomer: ${customerInfo.name}\nPhone: ${customerInfo.phone}\n\n` +
      billItems.map(item => `${item.name} - Qty: ${item.quantity} x ₹${item.rate} = ₹${item.amount}`).join('\n') +
      `\n\n*Total: ₹${calculateTotal()}*`;
    
    const encodedText = encodeURIComponent(billText);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Bill Generation Portal</h1>
            <p className="text-muted-foreground">Create professional invoices for your customers</p>
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
                <Button onClick={shareOnWhatsApp} className="btn-secondary">
                  <Share className="w-4 h-4 mr-2" />
                  Share on WhatsApp
                </Button>
                <Button variant="outline">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>

            {/* Recent Bills & Preview */}
            <div className="space-y-6">
              {/* Bill Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Bill Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center border-b pb-4">
                    <h3 className="font-bold text-lg text-primary">ANAND CYCLE STORES</h3>
                    <p className="text-sm text-muted-foreground">WHOLE SALE & RETAIL</p>
                    <p className="text-xs text-muted-foreground">M.G.Road, Near Habib Talkies, NANDED - 431604 (M.S)</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div><strong>Customer:</strong> {customerInfo.name || 'Customer Name'}</div>
                    <div><strong>Phone:</strong> {customerInfo.phone || 'Phone Number'}</div>
                    <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    {billItems.map((item, index) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name || `Item ${index + 1}`}</span>
                        <span>₹{item.amount}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>TOTAL</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
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
