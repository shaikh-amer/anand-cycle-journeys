
import { useState, useEffect } from 'react';

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSInstalled = (window.navigator as any).standalone === true;
    const isInstalled = isInStandaloneMode || isIOSInstalled;
    
    setIsInstalled(isInstalled);

    // Only show install prompt if not already installed
    if (!isInstalled) {
      // Show install prompt after 3 seconds if installable
      const timer = setTimeout(() => {
        if (deferredPrompt && !isInstalled) {
          setShowInstallPrompt(true);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      
      // Show install prompt after a delay if not installed
      if (!isInstalled) {
        setTimeout(() => {
          setShowInstallPrompt(true);
        }, 3000);
      }
    };

    const handleAppInstalled = () => {
      console.log('App installed');
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    };

    // Check if PWA criteria are met
    const checkPWAReadiness = () => {
      // Force show installable state for testing
      if (!isInstalled && !deferredPrompt) {
        console.log('Forcing installable state for testing');
        setIsInstallable(true);
        setTimeout(() => {
          setShowInstallPrompt(true);
        }, 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('load', checkPWAReadiness);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('load', checkPWAReadiness);
    };
  }, [deferredPrompt, isInstalled]);

  const installApp = async () => {
    if (!deferredPrompt) {
      // Fallback for browsers that don't support install prompt
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes('chrome') && userAgent.includes('mobile')) {
        alert('To install this app:\n1. Tap the menu button (⋮)\n2. Select "Add to Home screen"');
      } else if (userAgent.includes('safari') && userAgent.includes('mobile')) {
        alert('To install this app:\n1. Tap the share button\n2. Select "Add to Home Screen"');
      } else {
        alert('To install this app, look for "Install" or "Add to Home Screen" in your browser menu.');
      }
      return false;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallable(false);
        setShowInstallPrompt(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Install failed:', error);
      return false;
    }
  };

  const dismissInstallPrompt = () => {
    setShowInstallPrompt(false);
  };

  return {
    isInstallable,
    isInstalled,
    showInstallPrompt,
    installApp,
    dismissInstallPrompt
  };
};
