
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const todayStats = {
    sales: 45600,
    orders: 12,
    customers: 8,
    avgOrderValue: 3800
  };

  const monthlyStats = {
    sales: 1240000,
    orders: 340,
    customers: 180,
    growth: 15.2
  };

  const recentSales = [
    { id: '#001234', customer: 'Rahul Sharma', amount: 15600, items: 'Hero Sprint Pro', time: '2:30 PM' },
    { id: '#001233', customer: 'Priya Patel', amount: 8400, items: 'Kids Bike + Helmet', time: '1:45 PM' },
    { id: '#001232', customer: 'Amit Kumar', amount: 22500, items: 'Hero Octane MTB', time: '12:20 PM' },
    { id: '#001231', customer: 'Sneha Desai', amount: 4200, items: 'Accessories Set', time: '11:15 AM' },
    { id: '#001230', customer: 'Vijay Singh', amount: 18900, items: 'Hero Kyoto Hybrid', time: '10:30 AM' }
  ];

  const topProducts = [
    { name: 'Hero Sprint Pro', sales: 8, revenue: 224000 },
    { name: 'Kids Safety Set', sales: 15, revenue: 45000 },
    { name: 'Hero Kyoto', sales: 6, revenue: 111000 },
    { name: 'MTB Accessories', sales: 12, revenue: 36000 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary">Sales Dashboard</h1>
              <p className="text-muted-foreground">Track your daily and monthly performance</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Export Data</Button>
              <Button className="btn-primary">Generate Report</Button>
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
                  <span className="text-green-600">+12% from yesterday</span>
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
                  <span className="text-green-600">+3 from yesterday</span>
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
                  <span className="text-green-600">+2 from yesterday</span>
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
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  <span className="text-red-600">-5% from yesterday</span>
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
                    <Badge className="mt-2 bg-green-100 text-green-800">+{monthlyStats.growth}% growth</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{monthlyStats.orders}</div>
                    <div className="text-sm text-muted-foreground">Total Orders</div>
                    <div className="text-xs text-muted-foreground mt-2">Avg: 11 orders/day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{monthlyStats.customers}</div>
                    <div className="text-sm text-muted-foreground">Customers Served</div>
                    <div className="text-xs text-muted-foreground mt-2">45% repeat customers</div>
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
              <CardDescription>Latest transactions from today</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
