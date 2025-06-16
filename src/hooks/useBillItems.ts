
import { useState } from 'react';
import { BillItem } from '@/types/billing';
import { calculateItemAmount } from '@/utils/billCalculations';

export const useBillItems = () => {
  const [billItems, setBillItems] = useState<BillItem[]>([
    { id: Date.now(), name: '', quantity: 1, rate: 0, amount: 0 }
  ]);

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
          updatedItem.amount = calculateItemAmount(updatedItem.quantity, updatedItem.rate);
        }
        return updatedItem;
      }
      return item;
    }));
  };

  return {
    billItems,
    addItem,
    removeItem,
    updateItem
  };
};
