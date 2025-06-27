
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import WhatsappIcon from '@/components/icons/WhatsappIcon';
import { useToast } from '@/hooks/use-toast';
import ProductForm from './ProductForm';

interface Product {
  id: string;
  name: string;
  image: string;
  category: 'kids' | 'mtb' | 'hybrid';
  whatsappNumber: string;
  description: string;
  features: string[];
  createdAt: string;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleAddProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
    setIsSubmitting(true);
    try {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...productData,
        createdAt: new Date().toISOString()
      };

      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      
      // Save to localStorage so it persists and can be accessed by Products page
      localStorage.setItem('customProducts', JSON.stringify(updatedProducts));
      
      setIsAddDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Product added successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
    if (!editingProduct) return;
    
    setIsSubmitting(true);
    try {
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData }
          : p
      );
      
      setProducts(updatedProducts);
      localStorage.setItem('customProducts', JSON.stringify(updatedProducts));
      
      setEditingProduct(null);
      
      toast({
        title: "Success",
        description: "Product updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('customProducts', JSON.stringify(updatedProducts));
    
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
  };

  const closeDialog = () => {
    setIsAddDialogOpen(false);
    setEditingProduct(null);
    setIsSubmitting(false);
  };

  // Load products from localStorage on component mount
  useState(() => {
    const savedProducts = localStorage.getItem('customProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  });

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
              closeDialog();
            }
          }}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                <DialogDescription>
                  {editingProduct ? 'Update product details below.' : 'Fill in the product details below.'}
                </DialogDescription>
              </DialogHeader>
              <ProductForm
                onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
                onCancel={closeDialog}
                editingProduct={editingProduct}
                isSubmitting={isSubmitting}
              />
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
                  <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground capitalize">
                    {product.category}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.description}</p>
                    {product.features.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 2).map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {product.features.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{product.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                    )}
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
