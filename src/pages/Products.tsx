
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
      name: "Victory 24\"26\"27\"29\"",
      category: "mtb",
      image: "/lovable-uploads/2daebb57-aab9-452f-83a2-0919501752d4.png",
      description: "High-performance mountain bike with multiple size options",
      features: ["Multi-size options", "Disc brakes", "Durable frame"]
    },
    {
      id: 2,
      name: "Victory IBC 24\"26\"27\"29\"",
      category: "mtb",
      image: "/lovable-uploads/ef172d3f-5510-47e1-991d-ddb2f5343957.png",
      description: "Advanced mountain bike with rear carrier",
      features: ["Rear carrier", "Multi-gear", "All-terrain ready"]
    },
    {
      id: 3,
      name: "Jumbo 10\"",
      category: "kids",
      image: "/lovable-uploads/cdf166e9-a8e9-4203-8d12-af6ce6b68571.png",
      description: "Colorful kids bike with training wheels and accessories",
      features: ["Training wheels", "Water bottle", "Basket included"]
    },
    {
      id: 4,
      name: "Speed 10\"",
      category: "kids",
      image: "/lovable-uploads/8f960652-edf8-4ffe-8f2a-a70fbe18f1f3.png",
      description: "Racing-inspired kids bike in vibrant colors",
      features: ["Racing design", "Training wheels", "Side support wheels"]
    },
    {
      id: 5,
      name: "Flora 10\"",
      category: "kids",
      image: "/lovable-uploads/e771f26e-b050-4657-9599-c88848286db2.png",
      description: "Pretty pink bike designed for young girls",
      features: ["Pink design", "Decorative elements", "Training wheels"]
    },
    {
      id: 6,
      name: "Teddy 10\"",
      category: "kids",
      image: "/lovable-uploads/fa60c363-670e-4048-a53a-984360ead868.png",
      description: "Fun teddy bear themed bike for kids",
      features: ["Teddy bear theme", "Orange color scheme", "Training wheels"]
    },
    {
      id: 7,
      name: "Calburn Challenge",
      category: "hybrid",
      image: "/lovable-uploads/84c45eaf-a2b9-47cc-ba84-bb2224110dc2.png",
      description: "Built for the challenge, made for the thrill",
      features: ["Professional grade", "Challenge ready", "Thrill seeker"]
    },
    {
      id: 8,
      name: "Calburn Adventure",
      category: "hybrid",
      image: "/lovable-uploads/3101950a-0542-470f-9765-0666cdcc7eaf.png",
      description: "Your next adventure starts here",
      features: ["Adventure ready", "Long distance", "Comfort design"]
    },
    {
      id: 9,
      name: "Big Bull IBC D/D 20.300",
      category: "mtb",
      image: "/lovable-uploads/cb0e8dd8-7409-4506-8e05-e61a0d280fd2.png",
      description: "Heavy-duty mountain bike with dual disc brakes",
      features: ["Dual disc brakes", "20\" frame", "Heavy duty build"]
    },
    {
      id: 10,
      name: "Fighter (Gents) S/B 26.1.50",
      category: "hybrid",
      image: "/lovable-uploads/c843e4da-ff4d-49e4-a5d1-d5faf4e147dd.png",
      description: "Classic gents bicycle with single brake system",
      features: ["26\" wheels", "Single brake", "Classic design"]
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
