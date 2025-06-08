
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: "Hero Ranger DTB",
      category: "kids",
      price: "₹4,500",
      image: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=500",
      description: "Perfect starter bike for kids",
      features: ["16-inch wheels", "Training wheels included", "Bright colors"]
    },
    {
      id: 2,
      name: "Hero Sprint Pro",
      category: "mtb",
      price: "₹28,000",
      image: "https://images.unsplash.com/photo-1544191696-15693072fb64?w=500",
      description: "Professional mountain bike",
      features: ["21-speed gear", "Front suspension", "Alloy frame"]
    },
    {
      id: 3,
      name: "Hero Kyoto",
      category: "hybrid",
      price: "₹18,500",
      image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500",
      description: "Comfort hybrid for city rides",
      features: ["7-speed", "Comfortable seat", "City & trail ready"]
    },
    {
      id: 4,
      name: "Safety Helmet",
      category: "accessories",
      price: "₹1,200",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      description: "ISI certified safety helmet",
      features: ["Multiple sizes", "Ventilation", "Adjustable straps"]
    },
    {
      id: 5,
      name: "Hero Miss India",
      category: "kids",
      price: "₹5,200",
      image: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=500",
      description: "Stylish bike for young girls",
      features: ["20-inch wheels", "Basket included", "Pink design"]
    },
    {
      id: 6,
      name: "Hero Octane",
      category: "mtb",
      price: "₹35,000",
      image: "https://images.unsplash.com/photo-1544191696-15693072fb64?w=500",
      description: "Premium mountain bike",
      features: ["24-speed", "Dual suspension", "Lightweight frame"]
    }
  ];

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'kids', label: 'Kids Bikes' },
    { value: 'mtb', label: 'Mountain Bikes' },
    { value: 'hybrid', label: 'Hybrid Bikes' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              Our Bike Collection
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the perfect bike for your journey. From kids' first rides to professional racing bikes.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-background border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search bikes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
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
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="card-hover border-0 shadow-md">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground capitalize">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    <div className="text-xl font-bold text-primary">{product.price}</div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1 btn-primary">
                          Add to Cart
                        </Button>
                        <Button variant="outline" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
