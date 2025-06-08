
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-gradient text-white py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <span className="text-secondary font-semibold">Trusted Since 1995</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Pedal Your Dreams Forward
                <span className="block text-secondary">🚴‍♂️</span>
              </h1>
              
              <p className="text-xl text-primary-foreground/90 max-w-lg">
                Your trusted partner for quality bicycles, expert service, and cycling adventures. 
                From kids' first rides to professional racing bikes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button size="lg" className="btn-secondary group">
                  Explore Bikes
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Visit Store
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">500+</div>
                <div className="text-sm text-primary-foreground/80">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">25+</div>
                <div className="text-sm text-primary-foreground/80">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">100+</div>
                <div className="text-sm text-primary-foreground/80">Bike Models</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-4 sm:p-8 border border-white/20">
              <img
                src="/lovable-uploads/ed3cb4f3-7175-4d6d-a02e-e383bd9df95a.png"
                alt="Anand Cycle Store Logo"
                className="w-full max-w-xs sm:max-w-md mx-auto animate-scale-in"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-xl"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
