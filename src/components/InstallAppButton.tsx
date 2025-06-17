
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Check } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { useToast } from '@/hooks/use-toast';

const InstallAppButton = () => {
  const { isInstallable, isInstalled, installApp } = usePWAInstall();
  const [isInstalling, setIsInstalling] = useState(false);
  const { toast } = useToast();

  const handleInstall = async () => {
    setIsInstalling(true);
    
    try {
      const success = await installApp();
      if (success) {
        toast({
          title: "App Installed!",
          description: "Anand Cycle Store has been added to your home screen"
        });
      }
    } catch (error) {
      toast({
        title: "Installation Failed",
        description: "Could not install the app. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsInstalling(false);
    }
  };

  if (isInstalled) {
    return (
      <Button variant="outline" disabled className="flex items-center gap-2">
        <Check className="w-4 h-4" />
        App Installed
      </Button>
    );
  }

  if (!isInstallable) {
    return null;
  }

  return (
    <Button 
      onClick={handleInstall} 
      disabled={isInstalling}
      variant="outline" 
      className="flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      {isInstalling ? 'Installing...' : 'Install App'}
    </Button>
  );
};

export default InstallAppButton;
