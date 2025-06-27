
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from './ImageUpload';

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

interface ProductFormProps {
  onSubmit: (productData: Omit<Product, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  editingProduct?: Product | null;
  isSubmitting?: boolean;
}

const ProductForm = ({ onSubmit, onCancel, editingProduct, isSubmitting }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: editingProduct?.name || '',
    image: editingProduct?.image || '',
    category: editingProduct?.category || '',
    description: editingProduct?.description || '',
    features: editingProduct?.features?.join(', ') || '',
    whatsappNumber: editingProduct?.whatsappNumber || '+919393559292'
  });

  const categories = [
    { value: 'kids', label: 'Kids Bikes' },
    { value: 'mtb', label: 'Mountain Bikes' },
    { value: 'hybrid', label: 'Hybrid Bikes' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.image || !formData.category || !formData.description) {
      return;
    }

    onSubmit({
      name: formData.name,
      image: formData.image,
      category: formData.category as 'kids' | 'mtb' | 'hybrid',
      whatsappNumber: formData.whatsappNumber,
      description: formData.description,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
    });
  };

  const handleImageSelect = (imageUrl: string) => {
    setFormData({ ...formData, image: imageUrl });
  };

  const handleImageRemove = () => {
    setFormData({ ...formData, image: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter product name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Select 
          value={formData.category} 
          onValueChange={(value) => setFormData({ ...formData, category: value })}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ImageUpload 
        onImageSelect={handleImageSelect}
        currentImage={formData.image}
        onImageRemove={handleImageRemove}
      />
      
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter product description"
          rows={3}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="features">Features (comma-separated)</Label>
        <Input
          id="features"
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          placeholder="e.g., 26 wheels, Disc brakes, Lightweight"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp Number</Label>
        <Input
          id="whatsapp"
          value={formData.whatsappNumber}
          onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
          placeholder="+919393559292"
        />
      </div>
      
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
