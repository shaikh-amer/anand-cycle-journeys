
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useBills } from '@/hooks/useBills';

const RecentBills = () => {
  const { getRecentBills, loading } = useBills();
  const recentBills = getRecentBills(3);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Bills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    );
  }

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
        {recentBills.length > 0 ? (
          recentBills.map((bill) => (
            <div key={bill.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <div className="font-semibold text-sm">{bill.customer}</div>
                <div className="text-xs text-muted-foreground">#{bill.id} • {bill.date}</div>
              </div>
              <Badge variant="outline">₹{Number(bill.amount).toLocaleString()}</Badge>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-4">
            No bills generated yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentBills;
