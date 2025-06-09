import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Clock, MessageCircle, Mail, Navigation } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              Visit Our Store
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Come experience our bikes in person. We're located in the heart of Nanded and ready to help you find your perfect ride.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="card-hover border-0 shadow-md text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Our Location</h3>
                  <p className="text-muted-foreground text-sm">
                    M.G. Road, Near Habib Talkies<br />
                    Nanded - 431604 (M.S)
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover border-0 shadow-md text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Call Us</h3>
                  <p className="text-muted-foreground text-sm">
                    9393559292<br />
                    9960708348
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover border-0 shadow-md text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Store Hours</h3>
                  <p className="text-muted-foreground text-sm">
                    Monday - Sunday<br />
                    9:00 AM - 8:00 PM
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Map and Contact Form */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Map Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">Find Us</h2>
                  <p className="text-muted-foreground">
                    We're conveniently located on M.G. Road, one of Nanded's main thoroughfares. 
                    Look for our bright signage next to Habib Talkies.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border">
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p>Interactive Map Coming Soon</p>
                      <p className="text-sm">M.G. Road, Nanded - 431604</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1 btn-primary">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button className="flex-1 btn-secondary">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Us
                  </Button>
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">Get in Touch</h2>
                  <p className="text-muted-foreground">
                    Have questions about our bikes or services? Send us a message and we'll get back to you soon.
                  </p>
                </div>

                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>
                      We'll respond within 24 hours during business days
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input placeholder="Your Name" />
                      <Input placeholder="Phone Number" />
                    </div>
                    <Input placeholder="Email Address" />
                    <Input placeholder="Subject" />
                    <Textarea 
                      placeholder="Tell us about your cycling needs or ask any questions..."
                      className="min-h-32"
                    />
                    <Button className="w-full btn-primary">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Need Immediate Assistance?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                For urgent bike repairs or quick questions, reach out to us directly
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-primary">
                  <Phone className="w-4 h-4 mr-2" />
                  Call: 9393559292
                </Button>
                <Button size="lg" className="btn-secondary">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Chat
                </Button>
              </div>
              
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-muted-foreground">
                <div>🔧 Same-day repairs</div>
                <div>🚲 Test rides available</div>
                <div>📦 Wholesale inquiries</div>
                <div>💡 Expert consultation</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
