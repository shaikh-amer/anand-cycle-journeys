
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useBills } from '@/hooks/useBills';
import { format } from 'date-fns';

const RecentBills = () => {
  const { bills, isLoading } = useBills();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Bills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading bills...</div>
        </CardContent>
      </Card>
    );
  }

  const recentBills = bills.slice(0, 3);

  return (
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
        {recentBills.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No bills found. Create your first bill!
          </div>
        ) : (
          recentBills.map((bill) => (
            <div key={bill.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <div className="font-semibold text-sm">{bill.customer_name}</div>
                <div className="text-xs text-muted-foreground">
                  #{bill.bill_number} • {format(new Date(bill.created_at), 'MMM dd, yyyy')}
                </div>
              </div>
              <Badge variant="outline">₹{bill.total_amount}</Badge>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default RecentBills;
