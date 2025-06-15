import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Award, Heart, Bike } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { Link } from 'react-router-dom';

const About = () => {
  const milestones = [
    {
      year: "1995",
      title: "The Beginning",
      description: "Started as a small cycle repair shop with a passion for helping people fix their rides."
    },
    {
      year: "2000",
      title: "First Retail Store",
      description: "Opened our first retail location, bringing quality bikes to the Nanded community."
    },
    {
      year: "2010",
      title: "Wholesale Expansion",
      description: "Began supplying bikes to retailers across the region, growing our network."
    },
    {
      year: "2024",
      title: "Digital Innovation",
      description: "Launched our digital platform to serve customers better and streamline operations."
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Cycling",
      description: "We live and breathe cycling. Every recommendation comes from genuine enthusiasm for the sport."
    },
    {
      icon: Users,
      title: "Community First",
      description: "We're not just selling bikes; we're building a cycling community that supports each other."
    },
    {
      icon: Award,
      title: "Quality Promise",
      description: "Every bike we sell meets our high standards. We stand behind our products with full confidence."
    },
    {
      icon: Bike,
      title: "Expert Service",
      description: "Our technicians have decades of experience. Your bike is in the best hands with us."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-16 md:pb-0">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Our Story: Three Generations of 
                  <span className="text-secondary block">Cycling Excellence</span>
                </h1>
                <p className="text-xl text-primary-foreground/90 leading-relaxed">
                  What started as a small repair shop in 1995 has grown into Nanded's most trusted 
                  cycling destination. We've been pedaling forward with our community for over 25 years.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="btn-secondary">
                    Visit Our Store
                  </Button>
                </Link>
              </div>
              
              <div className="relative">
                <img
                  src="/lovable-uploads/a881c037-efd2-4b54-bc5c-3000bab741b0.png"
                  alt="Anand Cycle Store Logo"
                  className="w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                Our Journey Through Time
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From humble beginnings to becoming a household name in cycling
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => (
                <Card key={index} className="card-hover border-0 shadow-md text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">{milestone.year}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-3">{milestone.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{milestone.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                What Drives Us
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our core values that have guided us for over two decades
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="card-hover border-0 shadow-md text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary">
                  Meet the Family Behind the Business
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Three generations of the Anand family have poured their hearts into this business. 
                  What started with Grandfather's passion for fixing cycles has evolved into a 
                  full-service cycling destination.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, we combine traditional values with modern innovation. Our team knows 
                  every bolt, gear, and component that goes into making your cycling experience perfect.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div>
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-muted-foreground">Happy Families</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">25+</div>
                    <div className="text-muted-foreground">Years of Trust</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">1000+</div>
                    <div className="text-muted-foreground">Bikes Sold</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">99%</div>
                    <div className="text-muted-foreground">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
                    alt="Our cycling workshop"
                    className="w-full rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Ready to Start Your Cycling Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're buying your first bike or upgrading to something special, 
              we're here to help you find the perfect ride.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="btn-primary">
                  Browse Our Bikes
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Visit Our Store
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <BottomNav />
    </div>
  );
};

export default About;
