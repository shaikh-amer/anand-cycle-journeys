
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, Users, Wrench } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every bike is tested and comes with warranty. We stand behind our products with confidence."
    },
    {
      icon: Award,
      title: "25+ Years Experience",
      description: "Three generations of cycling expertise. We know bikes inside out and help you find the perfect fit."
    },
    {
      icon: Users,
      title: "Community Trust",
      description: "Serving Nanded's cycling community for decades. Your neighbors trust us, and so can you."
    },
    {
      icon: Wrench,
      title: "Expert Service",
      description: "Professional repairs, maintenance, and upgrades. Keep your bike running smoothly for years."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Why Choose Anand Cycle Store?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            More than just a bike shop - we're your cycling partners for life
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="card-hover text-center border-0 shadow-md">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Join Our Cycling Family
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you're a beginner taking your first ride or a seasoned cyclist looking for an upgrade, 
            we're here to support your cycling journey every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div>📍 M.G. Road, Nanded</div>
            <div>📞 9823285728</div>
            <div>🕒 Open 7 days a week</div>
            <div>🔧 Expert repairs available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
