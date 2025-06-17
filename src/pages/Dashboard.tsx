
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBills } from '@/hooks/useBills';

const Dashboard = () => {
  const { getTodayStats, getMonthlyStats, getRecentBills, loading } = useBills();
  
  const todayStats = getTodayStats();
  const monthlyStats = getMonthlyStats();
  const recentSales = getRecentBills(5).map(bill => ({
    id: bill.id,
    customer: bill.customer,
    amount: bill.amount,
    items: 'Invoice Items', // You can enhance this to show actual items
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }));

  if (loading) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Sales Dashboard</h1>
            <p className="text-muted-foreground">Track your daily and monthly performance</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/live-chat">
                <MessageSquare className="mr-2 h-4 w-4" /> Live Chat
              </Link>
            </Button>
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
                <span className="text-green-600">Real time data</span>
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
                <span className="text-green-600">Bills generated</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers Today</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{todayStats.customers}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">Unique customers</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹{todayStats.avgOrderValue.toLocaleString()}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className="text-muted-foreground">Today's average</span>
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
                  <div className="text-xs text-muted-foreground mt-2">This month</div>
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
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentSales.length > 0 ? (
                recentSales.slice(0, 4).map((sale, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{sale.customer}</div>
                      <div className="text-xs text-muted-foreground">#{sale.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{Number(sale.amount).toLocaleString()}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground">
                  No recent activity
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Sales */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Latest transactions and bills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.length > 0 ? (
                recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold">{sale.customer}</div>
                      <div className="text-sm text-muted-foreground">{sale.items}</div>
                      <div className="text-xs text-muted-foreground">#{sale.id} • {sale.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-primary">₹{Number(sale.amount).toLocaleString()}</div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No sales data available yet. Start generating bills to see data here.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
