
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const RecentBills = () => {
  const recentBills = [
    { id: '#001234', customer: 'Rahul Sharma', amount: 15600, date: 'Today' },
    { id: '#001233', customer: 'Priya Patel', amount: 8400, date: 'Yesterday' },
    { id: '#001232', customer: 'Amit Kumar', amount: 22500, date: '2 days ago' }
  ];

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
        {recentBills.map((bill) => (
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
  );
};

export default RecentBills;
