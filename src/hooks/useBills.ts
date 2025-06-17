
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BillItem, CustomerInfo } from '@/types/billing';

export interface Bill {
  id: string;
  bill_number: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  subtotal: number;
  gst_amount: number;
  total_amount: number;
  include_gst: boolean;
  created_at: string;
  updated_at: string;
  bill_items?: BillItem[];
}

export const useBills = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bills')
        .select(`
          *,
          bill_items (
            id,
            item_name,
            quantity,
            rate,
            amount
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bills:', error);
        return;
      }

      setBills(data || []);
    } catch (error) {
      console.error('Error fetching bills:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveBill = async (
    customerInfo: CustomerInfo,
    billItems: BillItem[],
    subtotal: number,
    gstAmount: number,
    totalAmount: number,
    includeGst: boolean,
    billNumber: string
  ) => {
    try {
      // Insert the bill
      const { data: billData, error: billError } = await supabase
        .from('bills')
        .insert({
          bill_number: billNumber,
          customer_name: customerInfo.name,
          customer_phone: customerInfo.phone,
          customer_address: customerInfo.address,
          subtotal: subtotal,
          gst_amount: gstAmount,
          total_amount: totalAmount,
          include_gst: includeGst
        })
        .select()
        .single();

      if (billError) {
        throw billError;
      }

      // Insert bill items
      const itemsToInsert = billItems.map(item => ({
        bill_id: billData.id,
        item_name: item.name,
        quantity: item.quantity,
        rate: item.rate,
        amount: item.amount
      }));

      const { error: itemsError } = await supabase
        .from('bill_items')
        .insert(itemsToInsert);

      if (itemsError) {
        throw itemsError;
      }

      // Refresh bills list
      await fetchBills();
      
      return billData;
    } catch (error) {
      console.error('Error saving bill:', error);
      throw error;
    }
  };

  const getRecentBills = (limit: number = 5) => {
    return bills.slice(0, limit).map(bill => ({
      id: bill.bill_number,
      customer: bill.customer_name,
      amount: bill.total_amount,
      date: formatDate(bill.created_at)
    }));
  };

  const getTodayStats = () => {
    const today = new Date().toDateString();
    const todayBills = bills.filter(bill => 
      new Date(bill.created_at).toDateString() === today
    );

    const sales = todayBills.reduce((sum, bill) => sum + Number(bill.total_amount), 0);
    const orders = todayBills.length;
    const customers = new Set(todayBills.map(bill => bill.customer_name)).size;
    const avgOrderValue = orders > 0 ? Math.round(sales / orders) : 0;

    return { sales, orders, customers, avgOrderValue };
  };

  const getMonthlyStats = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyBills = bills.filter(bill => {
      const billDate = new Date(bill.created_at);
      return billDate.getMonth() === currentMonth && billDate.getFullYear() === currentYear;
    });

    const sales = monthlyBills.reduce((sum, bill) => sum + Number(bill.total_amount), 0);
    const orders = monthlyBills.length;
    const customers = new Set(monthlyBills.map(bill => bill.customer_name)).size;

    // Calculate growth (placeholder - you can implement based on previous month)
    const growth = 15.2;

    return { sales, orders, customers, growth };
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return {
    bills,
    loading,
    fetchBills,
    saveBill,
    getRecentBills,
    getTodayStats,
    getMonthlyStats
  };
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Today';
  if (diffDays === 2) return 'Yesterday';
  if (diffDays <= 7) return `${diffDays - 1} days ago`;
  
  return date.toLocaleDateString();
};
