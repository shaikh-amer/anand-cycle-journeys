
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import BrandsShowcase from '@/components/BrandsShowcase';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <BrandsShowcase />
        <ProductShowcase />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
