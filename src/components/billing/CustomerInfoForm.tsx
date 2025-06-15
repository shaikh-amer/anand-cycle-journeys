
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
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            placeholder="Customer Name"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
          />
          <Input
            placeholder="Phone Number"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
          />
        </div>
        <Textarea
          placeholder="Customer Address"
          value={customerInfo.address}
          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
        />
      </CardContent>
    </Card>
  );
};

export default CustomerInfoForm;
