
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X, Smartphone } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { useToast } from '@/hooks/use-toast';

const InstallPopup = () => {
  const { showInstallPrompt, installApp, dismissInstallPrompt } = usePWAInstall();
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

  const handleDismiss = () => {
    dismissInstallPrompt();
    // Don't show again for 2 hours instead of 24
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  // Check if user dismissed popup recently (reduced to 2 hours for testing)
  const lastDismissed = localStorage.getItem('installPromptDismissed');
  if (lastDismissed) {
    const dismissedTime = parseInt(lastDismissed);
    const hoursSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60);
    if (hoursSinceDismissed < 2) {
      return null;
    }
  }

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full mx-auto animate-in fade-in zoom-in duration-300">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-xl">Install Anand Cycle Store</CardTitle>
          <CardDescription>
            Add our app to your home screen for quick access and offline use
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              ✓ <span>Works offline</span>
            </div>
            <div className="flex items-center gap-2">
              ✓ <span>Fast access from home screen</span>
            </div>
            <div className="flex items-center gap-2">
              ✓ <span>No app store needed</span>
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={handleInstall} 
              disabled={isInstalling}
              className="flex-1 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isInstalling ? 'Installing...' : 'Install App'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDismiss}
              className="flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Later
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            For Chrome: Look for "Install app" in the address bar or menu
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstallPopup;
