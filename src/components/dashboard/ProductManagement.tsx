
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit3, Trash2, Eye } from 'lucide-react';
import WhatsappIcon from '@/components/icons/WhatsappIcon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  image: string;
  whatsappNumber: string;
  createdAt: string;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Hero Sprint Pro',
      image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&q=80',
      whatsappNumber: '+919876543210',
      createdAt: new Date().toISOString()
    }
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    whatsappNumber: '+91'
  });
  const { toast } = useToast();

  const handleAddProduct = () => {
    if (!formData.name || !formData.image || !formData.whatsappNumber) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      image: formData.image,
      whatsappNumber: formData.whatsappNumber,
      createdAt: new Date().toISOString()
    };

    setProducts([...products, newProduct]);
    setFormData({ name: '', image: '', whatsappNumber: '+91' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Product added successfully!",
    });
  };

  const handleEditProduct = () => {
    if (!editingProduct || !formData.name || !formData.image || !formData.whatsappNumber) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setProducts(products.map(p => 
      p.id === editingProduct.id 
        ? { ...p, name: formData.name, image: formData.image, whatsappNumber: formData.whatsappNumber }
        : p
    ));
    
    setEditingProduct(null);
    setFormData({ name: '', image: '', whatsappNumber: '+91' });
    
    toast({
      title: "Success",
      description: "Product updated successfully!",
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Success",
      description: "Product deleted successfully!",
    });
  };

  const openWhatsApp = (product: Product) => {
    const message = `Hi! I'm interested in ${product.name}. Can you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    const cleanNumber = product.whatsappNumber.replace(/\D/g, '');
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      image: product.image,
      whatsappNumber: product.whatsappNumber
    });
  };

  const resetForm = () => {
    setFormData({ name: '', image: '', whatsappNumber: '+91' });
    setEditingProduct(null);
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>Add, edit, and manage your product catalog</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen || !!editingProduct} onOpenChange={(open) => {
            if (!open) {
              setIsAddDialogOpen(false);
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                <DialogDescription>
                  {editingProduct ? 'Update product details below.' : 'Fill in the product details below.'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Enter image URL"
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-20 h-20 object-cover rounded border"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    placeholder="+919876543210"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => {
                    setIsAddDialogOpen(false);
                    resetForm();
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={editingProduct ? handleEditProduct : handleAddProduct}>
                    {editingProduct ? 'Update' : 'Add'} Product
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-lg mb-2">No products added yet</div>
            <div className="text-sm">Click "Add Product" to get started</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="border border-border">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&q=80';
                    }}
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => openEditDialog(product)}
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                    <div className="text-xs text-muted-foreground">
                      Added: {new Date(product.createdAt).toLocaleDateString()}
                    </div>
                    <Button
                      onClick={() => openWhatsApp(product)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-1 h-8"
                    >
                      <WhatsappIcon className="w-3 h-3 mr-1" />
                      Contact on WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductManagement;
