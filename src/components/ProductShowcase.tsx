
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductShowcase = () => {
  const categories = [
    {
      title: "Kids Bikes",
      description: "Safe, colorful, and perfectly sized for young adventurers",
      image: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=500&q=80",
      badge: "Best Seller",
      features: ["Safety First", "Adjustable", "Bright Colors"]
    },
    {
      title: "Mountain Bikes",
      description: "Rugged bikes built for trails, hills, and adventure",
      image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&q=80",
      badge: "Adventure Ready",
      features: ["21-Speed", "Suspension", "All-Terrain"]
    },
    {
      title: "Hybrid Bikes",
      description: "Perfect blend of comfort and performance for city rides",
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80",
      badge: "Most Popular",
      features: ["Comfortable", "Versatile", "City & Trail"]
    },
    {
      title: "Accessories",
      description: "Helmets, lights, locks, and everything you need",
      image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&q=80",
      badge: "Essential",
      features: ["Safety Gear", "Maintenance", "Comfort"]
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Our Bike Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From your first ride to professional cycling, we have the perfect bike for every journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <Card key={index} className="card-hover border-0 shadow-md">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                  {category.badge}
                </Badge>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full btn-primary">
                  View Collection
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/products">
            <Button size="lg" className="btn-secondary group">
              View All Products
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
