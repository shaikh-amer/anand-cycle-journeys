
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

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      
      // Show install prompt after a delay if not installed
      if (!isInstalled) {
        setTimeout(() => {
          setShowInstallPrompt(true);
        }, 2000);
      }
    };

    const handleAppInstalled = () => {
      console.log('App installed');
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Force show install prompt for testing if not installed and meets PWA criteria
    if (!isInstalled) {
      // Check if service worker is registered and manifest exists
      setTimeout(() => {
        if ('serviceWorker' in navigator && document.querySelector('link[rel="manifest"]')) {
          console.log('PWA criteria met, showing install prompt');
          setIsInstallable(true);
          setShowInstallPrompt(true);
        }
      }, 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) {
      // Fallback instructions for manual installation
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes('chrome')) {
        alert('To install this app:\n1. Tap the menu button (⋮) in Chrome\n2. Select "Add to Home screen" or "Install app"');
      } else if (userAgent.includes('safari')) {
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
