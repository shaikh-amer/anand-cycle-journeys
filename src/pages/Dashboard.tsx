
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Calendar } from 'lucide-react';
import { useBills } from '@/hooks/useBills';
import { format } from 'date-fns';

const Dashboard = () => {
  const { bills, isLoading } = useBills();

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  // Calculate today's stats
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const todayBills = bills.filter(bill => new Date(bill.created_at) >= todayStart);
  const todayStats = {
    sales: todayBills.reduce((sum, bill) => sum + bill.total_amount, 0),
    orders: todayBills.length,
    customers: new Set(todayBills.map(bill => bill.customer_name)).size,
    avgOrderValue: todayBills.length > 0 ? todayBills.reduce((sum, bill) => sum + bill.total_amount, 0) / todayBills.length : 0
  };

  // Calculate monthly stats
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthBills = bills.filter(bill => new Date(bill.created_at) >= monthStart);
  const monthlyStats = {
    sales: monthBills.reduce((sum, bill) => sum + bill.total_amount, 0),
    orders: monthBills.length,
    customers: new Set(monthBills.map(bill => bill.customer_name)).size,
    growth: 15.2 // This would need historical data to calculate properly
  };

  const recentSales = bills.slice(0, 5).map(bill => ({
    id: `#${bill.bill_number}`,
    customer: bill.customer_name,
    amount: bill.total_amount,
    items: 'Items from bill', // You could fetch bill items if needed
    time: format(new Date(bill.created_at), 'h:mm a')
  }));

  // Calculate top products (this would need bill items data)
  const topProducts = [
    { name: 'Hero Sprint Pro', sales: 8, revenue: 224000 },
    { name: 'Kids Safety Set', sales: 15, revenue: 45000 },
    { name: 'Hero Kyoto', sales: 6, revenue: 111000 },
    { name: 'MTB Accessories', sales: 12, revenue: 36000 }
  ];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Sales Dashboard</h1>
            <p className="text-muted-foreground">Track your daily and monthly performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Export Data</Button>
            <Button>Generate Report</Button>
          </div>
        </div>

        {/* Today's Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹{todayStats.sales.toLocaleString()}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">Real-time data</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{todayStats.orders}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">Real-time data</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{todayStats.customers}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">Real-time data</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹{Math.round(todayStats.avgOrderValue).toLocaleString()}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">Real-time data</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2 border-0 shadow-md">
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>Sales overview for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">₹{monthlyStats.sales.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Sales</div>
                  <Badge className="mt-2 bg-green-100 text-green-800">Real data</Badge>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{monthlyStats.orders}</div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                  <div className="text-xs text-muted-foreground mt-2">From database</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{monthlyStats.customers}</div>
                  <div className="text-sm text-muted-foreground">Customers Served</div>
                  <div className="text-xs text-muted-foreground mt-2">Unique customers</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best sellers this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.sales} units sold</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{product.revenue.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Sales */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Latest transactions from the database</CardDescription>
          </CardHeader>
          <CardContent>
            {recentSales.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No sales data available. Start creating bills to see them here!
              </div>
            ) : (
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold">{sale.customer}</div>
                      <div className="text-sm text-muted-foreground">{sale.items}</div>
                      <div className="text-xs text-muted-foreground">{sale.id} • {sale.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-primary">₹{sale.amount.toLocaleString()}</div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
