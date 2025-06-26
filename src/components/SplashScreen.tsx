
import React from 'react';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <img 
          src="/lovable-uploads/2ab66434-489e-418c-816f-b74940e5167a.png" 
          alt="Anand Cycle Store" 
          className="w-32 h-32 mx-auto mb-4 object-contain"
        />
        <h1 className="text-2xl font-bold text-orange-600 mb-2">Welcome</h1>
        <p className="text-gray-600">Anand Cycle Store</p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
