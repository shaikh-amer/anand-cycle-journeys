
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';
import { BillItem } from '@/types/billing';

interface BillItemsProps {
  billItems: BillItem[];
  addItem: () => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, field: string, value: any) => void;
  calculateTotal: () => number;
}

const BillItems = ({ billItems, addItem, removeItem, updateItem, calculateTotal }: BillItemsProps) => {
  return (
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
        {billItems.map((item) => (
          <div key={item.id} className="space-y-3 p-4 bg-muted/30 rounded-lg">
            {/* Product Name - Full width */}
            <div className="w-full">
              <label className="text-sm font-medium text-muted-foreground">Product/Service</label>
              <Input
                placeholder="Item name"
                value={item.name}
                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                className="w-full"
              />
            </div>
            
            {/* Quantity, Rate, Amount, and Remove button */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Qty</label>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Rate (₹)</label>
                <Input
                  type="number"
                  min="0"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Amount (₹)</label>
                <div className="flex items-center h-10 px-3 py-2 bg-muted rounded-md">
                  <span className="font-semibold text-sm">{item.amount}</span>
                </div>
              </div>
              
              <div className="flex items-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  disabled={billItems.length === 1}
                  className="w-full"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
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
  );
};

export default BillItems;
