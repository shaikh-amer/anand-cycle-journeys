
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-primary font-bold text-lg">A</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">Anand Cycle Store</h3>
                <p className="text-sm text-primary-foreground/80">Pedal Your Dreams Forward</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your trusted cycling partner since 1995. Quality bikes, expert service, 
              and a passion for helping you discover the joy of cycling.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                Home
              </Link>
              <Link to="/products" className="block text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                Our Bikes
              </Link>
              <Link to="/about" className="block text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="block text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Services</h4>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div>🔧 Bike Repairs & Service</div>
              <div>🚲 New Bike Sales</div>
              <div>🛠️ Custom Modifications</div>
              <div>📦 Wholesale Supply</div>
              <div>🎯 Expert Consultation</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-secondary" />
                <div className="text-sm text-primary-foreground/80">
                  <div>M.G. Road, Near Habib Talkies</div>
                  <div>Nanded - 431604 (M.S)</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-secondary" />
                <div className="text-sm text-primary-foreground/80">
                  <div>9823285728</div>
                  <div>9960708348</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-secondary" />
                <div className="text-sm text-primary-foreground/80">
                  <div>Mon - Sun: 9:00 AM - 8:00 PM</div>
                </div>
              </div>
            </div>
            
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full mt-4">
              WhatsApp Us
            </Button>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-primary-foreground/60">
            © 2024 Anand Cycle Store. All rights reserved.
          </div>
          <div className="text-sm text-primary-foreground/60">
            Made with ❤️ for the cycling community
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
