
import React from 'react';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <img 
          src="/lovable-uploads/93d9a98d-d3ab-4aa4-96b7-f75a7ddd174f.png" 
          alt="Anand Cycle Store" 
          className="w-48 h-48 mx-auto mb-6 object-contain"
        />
        <h1 className="text-3xl font-bold text-orange-600 mb-2">Welcome</h1>
        <p className="text-gray-600 text-lg">Anand Cycle Store</p>
        <div className="mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
