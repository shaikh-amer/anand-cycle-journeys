
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBasket, Receipt, LayoutDashboard, Info, Phone, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Products', path: '/products', icon: ShoppingBasket },
    { name: 'Bill Portal', path: '/billing', icon: Receipt },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Live Chat', path: '/live-chat', icon: MessageSquare },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const getDisplayName = (name: string) => {
    if (name === 'Bill Portal') return 'Billing';
    if (name === 'Live Chat') return 'Chat';
    return name;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-[999]">
      <div className="mx-auto px-2">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                'flex flex-1 flex-col items-center justify-center text-center text-muted-foreground hover:text-primary transition-colors pt-2 pb-1',
                isActive(item.path) ? 'text-primary' : ''
              )}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{getDisplayName(item.name)}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
