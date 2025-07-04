
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CustomerInfo } from '@/types/billing';

interface CustomerInfoFormProps {
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
}

const CustomerInfoForm = ({ customerInfo, setCustomerInfo }: CustomerInfoFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
        <CardDescription>Enter customer details for the invoice</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="min-w-0">
            <label className="text-sm font-medium text-muted-foreground mb-1 block">Customer Name</label>
            <Input
              placeholder="Customer Name"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
              className="w-full min-w-0"
            />
          </div>
          <div className="min-w-0">
            <label className="text-sm font-medium text-muted-foreground mb-1 block">Phone Number</label>
            <Input
              placeholder="Phone Number"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
              className="w-full min-w-0"
            />
          </div>
        </div>
        <div className="min-w-0">
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Customer Address</label>
          <Textarea
            placeholder="Customer Address"
            value={customerInfo.address}
            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
            className="w-full resize-none min-w-0"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfoForm;
