
const BrandsShowcase = () => {
  const brandItems = [
    { icon: "🚲" },
    { icon: "🔥" },
    { icon: "💪" },
    { icon: "🌍" },
    { icon: "⭐" }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Trusted Brands We Carry
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We partner with India's most trusted bicycle brands to bring you quality, 
            reliability, and performance in every ride.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {brandItems.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover-scale group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Quality brands available in our physical store
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandsShowcase;
