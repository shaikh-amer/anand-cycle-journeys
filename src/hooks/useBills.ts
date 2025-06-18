
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BillRecord {
  id: string;
  bill_number: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string | null;
  subtotal: number;
  gst_amount: number;
  total_amount: number;
  include_gst: boolean;
  created_at: string;
  updated_at: string;
}

export interface BillItemRecord {
  id: string;
  bill_id: string;
  item_name: string;
  quantity: number;
  rate: number;
  amount: number;
  created_at: string;
}

export const useBills = () => {
  const [bills, setBills] = useState<BillRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchBills = async () => {
    try {
      const { data, error } = await supabase
        .from('bills')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBills(data || []);
    } catch (error) {
      console.error('Error fetching bills:', error);
      toast({
        title: "Error",
        description: "Failed to fetch bills",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveBill = async (billData: {
    bill_number: string;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    subtotal: number;
    gst_amount: number;
    total_amount: number;
    include_gst: boolean;
  }, billItems: Array<{
    item_name: string;
    quantity: number;
    rate: number;
    amount: number;
  }>) => {
    try {
      // Insert bill
      const { data: billRecord, error: billError } = await supabase
        .from('bills')
        .insert([billData])
        .select()
        .single();

      if (billError) throw billError;

      // Insert bill items
      const itemsToInsert = billItems.map(item => ({
        ...item,
        bill_id: billRecord.id
      }));

      const { error: itemsError } = await supabase
        .from('bill_items')
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      // Refresh bills list
      await fetchBills();

      toast({
        title: "Success",
        description: "Bill saved successfully"
      });

      return billRecord;
    } catch (error) {
      console.error('Error saving bill:', error);
      toast({
        title: "Error",
        description: "Failed to save bill",
        variant: "destructive"
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return {
    bills,
    isLoading,
    fetchBills,
    saveBill
  };
};
