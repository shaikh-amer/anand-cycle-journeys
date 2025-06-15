
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Phone, MapPin, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Bill Portal', path: '/billing' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919393559292', '_blank');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/0ac68c5d-e4f1-4711-adcc-18b303c46f65.png" alt="New Anand Cycle Store" className="h-14 w-14 rounded-full object-cover" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & Mobile WhatsApp */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>9393559292</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Nanded</span>
              </div>
            </div>

            {/* Mobile WhatsApp Button */}
            <Button 
              onClick={handleWhatsAppClick}
              className="md:hidden bg-secondary text-secondary-foreground hover:bg-secondary/90 flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
