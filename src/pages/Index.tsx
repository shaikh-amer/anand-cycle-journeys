
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <Hero />
        <WhyChooseUs />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;
