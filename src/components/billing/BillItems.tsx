
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
              <label className="text-sm font-medium text-muted-foreground block mb-1">Product/Service</label>
              <Input
                placeholder="Item name"
                value={item.name}
                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                className="w-full max-w-full"
              />
            </div>
            
            {/* Quantity and Rate - Stacked on mobile */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground block mb-1">Quantity</label>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                  className="w-full max-w-full"
                />
              </div>
              
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground block mb-1">Rate (₹)</label>
                <Input
                  type="number"
                  min="0"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                  className="w-full max-w-full"
                />
              </div>
            </div>

            {/* Amount and Remove button - Stacked on mobile */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:items-end">
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground block mb-1">Amount (₹)</label>
                <div className="flex items-center justify-center h-10 px-3 py-2 bg-muted rounded-md w-full">
                  <span className="font-semibold text-sm">₹{item.amount}</span>
                </div>
              </div>
              
              <div className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  disabled={billItems.length === 1}
                  className="w-full sm:w-auto"
                >
                  <Minus className="w-4 h-4 sm:mr-0 mr-2" />
                  <span className="sm:hidden">Remove Item</span>
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
