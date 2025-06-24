import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import WhatsappIcon from '@/components/icons/WhatsappIcon';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: "Victory 24\"26\"27\"29\"",
      category: "mtb",
      image: "/lovable-uploads/2daebb57-aab9-452f-83a2-0919501752d4.png",
      description: "High-performance mountain bike with multiple size options",
      features: ["Multi-size options", "Disc brakes", "Durable frame"]
    },
    {
      id: 2,
      name: "Victory IBC 24\"26\"27\"29\"",
      category: "mtb",
      image: "/lovable-uploads/ef172d3f-5510-47e1-991d-ddb2f5343957.png",
      description: "Advanced mountain bike with rear carrier",
      features: ["Rear carrier", "Multi-gear", "All-terrain ready"]
    },
    {
      id: 3,
      name: "Jumbo 10\"",
      category: "kids",
      image: "/lovable-uploads/cdf166e9-a8e9-4203-8d12-af6ce6b68571.png",
      description: "Colorful kids bike with training wheels and accessories",
      features: ["Training wheels", "Water bottle", "Basket included"]
    },
    {
      id: 4,
      name: "Speed 10\"",
      category: "kids",
      image: "/lovable-uploads/8f960652-edf8-4ffe-8f2a-a70fbe18f1f3.png",
      description: "Racing-inspired kids bike in vibrant colors",
      features: ["Racing design", "Training wheels", "Side support wheels"]
    },
    {
      id: 5,
      name: "Flora 10\"",
      category: "kids",
      image: "/lovable-uploads/e771f26e-b050-4657-9599-c88848286db2.png",
      description: "Pretty pink bike designed for young girls",
      features: ["Pink design", "Decorative elements", "Training wheels"]
    },
    {
      id: 6,
      name: "Teddy 10\"",
      category: "kids",
      image: "/lovable-uploads/fa60c363-670e-4048-a53a-984360ead868.png",
      description: "Fun teddy bear themed bike for kids",
      features: ["Teddy bear theme", "Orange color scheme", "Training wheels"]
    },
    {
      id: 7,
      name: "Calburn Challenge",
      category: "hybrid",
      image: "/lovable-uploads/84c45eaf-a2b9-47cc-ba84-bb2224110dc2.png",
      description: "Built for the challenge, made for the thrill",
      features: ["Professional grade", "Challenge ready", "Thrill seeker"]
    },
    {
      id: 8,
      name: "Calburn Adventure",
      category: "hybrid",
      image: "/lovable-uploads/3101950a-0542-470f-9765-0666cdcc7eaf.png",
      description: "Your next adventure starts here",
      features: ["Adventure ready", "Long distance", "Comfort design"]
    },
    {
      id: 9,
      name: "Big Bull IBC D/D 20.300",
      category: "mtb",
      image: "/lovable-uploads/cb0e8dd8-7409-4506-8e05-e61a0d280fd2.png",
      description: "Heavy-duty mountain bike with dual disc brakes",
      features: ["Dual disc brakes", "20\" frame", "Heavy duty build"]
    },
    {
      id: 10,
      name: "Fighter (Gents) S/B 26.1.50",
      category: "hybrid",
      image: "/lovable-uploads/c843e4da-ff4d-49e4-a5d1-d5faf4e147dd.png",
      description: "Classic gents bicycle with single brake system",
      features: ["26\" wheels", "Single brake", "Classic design"]
    },
    {
      id: 11,
      name: "Fighter (Gents) D/B 28.1.50",
      category: "hybrid",
      image: "/lovable-uploads/ecd28f12-af48-4628-9a1c-9185ce4df01f.png",
      description: "Classic gents bicycle with dual brake system",
      features: ["28\" wheels", "Dual brake", "Victory branded", "Gents design"]
    },
    {
      id: 12,
      name: "Shoorveer IC 26.1.50",
      category: "hybrid",
      image: "/lovable-uploads/4d035791-9915-4d58-9bb7-d3e66307f876.png",
      description: "Stylish hybrid bike with rear carrier",
      features: ["26\" wheels", "Rear carrier", "Red accents", "Single gear"]
    },
    {
      id: 13,
      name: "Jumbo EVA/T.T 20.2.40",
      category: "kids",
      image: "/lovable-uploads/9761bc6e-78f1-4174-ba7b-bdadca31d764.png",
      description: "Colorful kids bike with elephant theme and training wheels",
      features: ["Training wheels", "Elephant theme", "EVA foam", "20\" wheels"]
    },
    {
      id: 14,
      name: "Hangover 26",
      category: "mtb",
      image: "/lovable-uploads/67cd574c-b5c6-4023-ad53-125ad7e1dbbf.png",
      description: "Mountain bike with rear carrier and robust build",
      features: ["26\" wheels", "Rear carrier", "Mountain bike", "All-terrain"]
    },
    {
      id: 15,
      name: "Blade IC T.T/EVA 14.2.40",
      category: "kids",
      image: "/lovable-uploads/d639a440-c5d5-4951-8cea-7b1c7dfa60fa.png",
      description: "Colorful kids bike with blade theme and basket",
      features: ["14\" wheels", "Training wheels", "Front basket", "Blade design"]
    },
    {
      id: 16,
      name: "Blade IC T.T/EVA 20.2.40",
      category: "kids",
      image: "/lovable-uploads/aa10c2c7-7f4b-4998-b293-c245029cccc9.png",
      description: "Kids bike with vibrant blade graphics and accessories",
      features: ["20\" wheels", "Training wheels", "Colorful graphics", "Front basket"]
    },
    {
      id: 17,
      name: "Blade T.T/EVA 20.2.40",
      category: "kids",
      image: "/lovable-uploads/d429efd0-6080-4dc4-b794-8135328b6e3c.png",
      description: "Kids bike with yellow and red blade design",
      features: ["20\" wheels", "Training wheels", "Yellow accents", "Blade theme"]
    },
    {
      id: 18,
      name: "Blade IC T.T/EVA 16.2.40",
      category: "kids",
      image: "/lovable-uploads/d9eaba64-5040-40ca-a5fd-91783d2cb7a4.png",
      description: "Smaller kids bike with red blade graphics",
      features: ["16\" wheels", "Training wheels", "Red graphics", "Front basket"]
    },
    {
      id: 19,
      name: "Blade T.T/EVA 14.2.40",
      category: "kids",
      image: "/lovable-uploads/28587fe5-b67a-4817-94f5-f0c3bd41c5b4.png",
      description: "Kids bike with turquoise and orange blade design",
      features: ["14\" wheels", "Training wheels", "Front basket", "Turquoise frame"]
    },
    {
      id: 20,
      name: "Blade T.T/EVA 16.2.40",
      category: "kids",
      image: "/lovable-uploads/45324278-0968-486b-acfd-c78554dcfb9b.png",
      description: "Kids bike with green and yellow blade graphics",
      features: ["16\" wheels", "Training wheels", "Green frame", "Colorful graphics"]
    },
    {
      id: 21,
      name: "Veronica IBC Lady 26\"",
      category: "hybrid",
      image: "/lovable-uploads/7ee88311-dbac-4ad5-9409-776dddb75e87.png",
      description: "Elegant ladies bike with basket and carrier",
      features: ["26\" wheels", "Front basket", "Rear carrier", "Lady design", "Pink color"]
    },
    {
      id: 22,
      name: "Defender F/S D/D 20.2.40",
      category: "mtb",
      image: "/lovable-uploads/99e8d27a-d46d-488e-a5d4-3a8443baf414.png",
      description: "Full suspension mountain bike with dual disc brakes",
      features: ["20\" wheels", "Full suspension", "Dual disc brakes", "Mountain bike"]
    },
    {
      id: 23,
      name: "Defender IC D/D 20.2.40",
      category: "mtb",
      image: "/lovable-uploads/c2c221fa-ff96-4f1c-9858-c640efeed896.png",
      description: "Mountain bike with rear carrier and dual disc brakes",
      features: ["20\" wheels", "Rear carrier", "Dual disc brakes", "White frame"]
    },
    {
      id: 24,
      name: "Stella 26.1.95",
      category: "hybrid",
      image: "/lovable-uploads/e330ec70-0d2f-4abb-b0a7-3ecc332cba4d.png",
      description: "Beautiful turquoise ladies bike with decorative patterns",
      features: ["26\" wheels", "Front basket", "Decorative patterns", "Turquoise color"]
    },
    {
      id: 25,
      name: "Defender IC 24.2.40/26.2.40",
      category: "mtb",
      image: "/lovable-uploads/4eceb290-90cb-46ea-910d-fcac403d5aa7.png",
      description: "Mountain bike with rear carrier available in multiple sizes",
      features: ["Multi-size options", "Rear carrier", "Silver frame", "Mountain bike"]
    },
    {
      id: 26,
      name: "Victory D/D 24.300/26.300",
      category: "mtb",
      image: "/lovable-uploads/a88442c5-b545-4bb7-8d8f-baa92f309e50.png",
      description: "Victory series mountain bike with dual disc brakes",
      features: ["24\"/26\" options", "Dual disc brakes", "Black frame", "Victory series"]
    },
    {
      id: 27,
      name: "Bubble IBC T.T/EVA 16.2.40/20.2.40",
      category: "kids",
      image: "/lovable-uploads/de9ede66-afb0-4128-8ffd-e24d3b7721e6.png",
      description: "Colorful bubble-themed kids bike with basket",
      features: ["Multi-size options", "Training wheels", "Front basket", "Bubble design", "Pink accents"]
    },
    {
      id: 28,
      name: "Bubble T.T/EVA 16.2.40/20.2.40",
      category: "kids",
      image: "/lovable-uploads/19c7b92f-de0e-47ae-bd13-781b7198b8b5.png",
      description: "Bubble-themed kids bike with orange and black design",
      features: ["Multi-size options", "Training wheels", "Front basket", "Bubble design", "Orange accents"]
    },
    {
      id: 29,
      name: "20\" TEDDY",
      category: "kids",
      image: "/lovable-uploads/b62e2fad-4ae7-4dec-b929-776c6eb5e082.png",
      description: "Pink teddy bear themed bike with training wheels and accessories",
      features: ["20\" wheels", "Training wheels", "Teddy theme", "Pink design", "Front basket"]
    },
    {
      id: 30,
      name: "16\" TADDY",
      category: "kids",
      image: "/lovable-uploads/2bd851ae-00c2-48fd-92e2-87f0cafbce66.png",
      description: "Colorful teddy themed bike with red and green accents",
      features: ["16\" wheels", "Training wheels", "Teddy theme", "Red accents", "Front basket"]
    },
    {
      id: 31,
      name: "14\" TEDDY",
      category: "kids",
      image: "/lovable-uploads/6b1311f1-1de7-4b5b-9612-83ef0e48c253.png",
      description: "Yellow and orange teddy bear bike for younger kids",
      features: ["14\" wheels", "Training wheels", "Teddy theme", "Yellow frame", "Orange accents"]
    },
    {
      id: 32,
      name: "20\" THUNDER SX/DX",
      category: "mtb",
      image: "/lovable-uploads/b950a127-363c-4504-bd73-61fd939fa6de.png",
      description: "Professional mountain bike with red and black design",
      features: ["20\" wheels", "Thunder series", "Mountain bike", "Red accents", "Professional grade"]
    },
    {
      id: 33,
      name: "20\" VICTORY",
      category: "mtb",
      image: "/lovable-uploads/2105680d-f96b-4107-978a-2c891e99f2da.png",
      description: "Victory series mountain bike with disc brakes",
      features: ["20\" wheels", "Victory series", "Disc brakes", "Red accents", "Mountain bike"]
    },
    {
      id: 34,
      name: "20\" VICTORY IC",
      category: "mtb",
      image: "/lovable-uploads/d5e2f9b7-94ce-4178-9df2-59b3c0bea171.png",
      description: "Victory IC series with rear carrier and turquoise accents",
      features: ["20\" wheels", "Rear carrier", "Victory IC series", "Turquoise design", "Disc brakes"]
    },
    {
      id: 35,
      name: "24.300/26.300 VICTORY D/D",
      category: "mtb",
      image: "/lovable-uploads/aad36a44-ff0f-422a-b0a1-a8a14a2bc473.png",
      description: "Victory series with dual disc brakes and turquoise design",
      features: ["Multi-size options", "Dual disc brakes", "Victory series", "Turquoise accents", "Professional grade"]
    },
    {
      id: 36,
      name: "24.300/26.300 VICTORY IC D/D",
      category: "mtb",
      image: "/lovable-uploads/ae9556b9-19d0-4653-8996-55f4ff91ce8d.png",
      description: "Victory IC series with dual disc brakes and yellow accents",
      features: ["Multi-size options", "Dual disc brakes", "Victory IC series", "Yellow accents", "Rear carrier"]
    },
    {
      id: 37,
      name: "24.300/26.300 BIG BULL D/D",
      category: "mtb",
      image: "/lovable-uploads/f996e4f4-c064-4a9e-afb6-de608abac4c2.png",
      description: "Big Bull series with dual disc brakes and green design",
      features: ["Multi-size options", "Dual disc brakes", "Big Bull series", "Green frame", "Heavy duty"]
    },
    {
      id: 38,
      name: "24.2.40 DRAGON DX DD",
      category: "mtb",
      image: "/lovable-uploads/cb434e6a-757e-40a8-b887-995f5a3fd436.png",
      description: "Dragon DX series with full suspension and orange accents",
      features: ["24\" wheels", "Full suspension", "Dragon DX series", "Orange accents", "Dual disc brakes"]
    },
    {
      id: 39,
      name: "24,26 TUSKER IC",
      category: "hybrid",
      image: "/lovable-uploads/0c691c6c-a6d0-4a50-992c-3f4ed6d1dc3e.png",
      description: "Tusker IC series with rear carrier and sporty design",
      features: ["24\"/26\" options", "Rear carrier", "Tusker series", "Sporty design", "Cal Burn branding"]
    },
    {
      id: 40,
      name: "24,26 BENZO",
      category: "hybrid",
      image: "/lovable-uploads/748a2f9f-5e30-4626-8c0c-052bc39e57c6.png",
      description: "Benzo series with modern design and rear carrier",
      features: ["24\"/26\" options", "Rear carrier", "Benzo series", "Modern design", "Cal Burn branding"]
    },
    {
      id: 41,
      name: "24,26 GABBRO",
      category: "hybrid",
      image: "/lovable-uploads/bd1d4e2f-18a6-4b7b-9846-97997ab69dca.png",
      description: "Gabbro series with stylish red frame and rear carrier",
      features: ["24\"/26\" options", "Rear carrier", "Gabbro series", "Red frame design", "Cal Burn branding"]
    },
    {
      id: 42,
      name: "24,26 GABBRO",
      category: "hybrid",
      image: "/lovable-uploads/00187e63-2bae-4506-a10e-80a3ebb2fde2.png",
      description: "Gabbro series with navy blue frame and rear carrier",
      features: ["24\"/26\" options", "Rear carrier", "Gabbro series", "Navy blue frame", "Cal Burn branding"]
    },
    {
      id: 43,
      name: "24,26 HANGOVER IC",
      category: "mtb",
      image: "/lovable-uploads/cc2c196e-eed4-4d94-80e9-b7e16dd8e231.png",
      description: "Hangover IC series mountain bike with rear carrier",
      features: ["24\"/26\" options", "Rear carrier", "Mountain bike", "Hangover IC series", "All-terrain ready"]
    },
    {
      id: 44,
      name: "24.2.40 DRAGON SX DD",
      category: "mtb",
      image: "/lovable-uploads/5be2f664-e7fe-404c-bb70-a7237edee7e6.png",
      description: "Dragon SX series with full suspension and green accents",
      features: ["24\" wheels", "Full suspension", "Dragon SX series", "Green accents", "Dual disc brakes"]
    },
    {
      id: 45,
      name: "24,26,27,29 VICTORY IC",
      category: "mtb",
      image: "/lovable-uploads/71eb53aa-06c7-4284-b744-41ce6959bbee.png",
      description: "Victory IC series with multiple size options and rear carrier",
      features: ["Multi-size options", "Rear carrier", "Victory IC series", "Disc brakes", "Mountain bike"]
    },
    {
      id: 46,
      name: "24,26 THUNDER SX",
      category: "mtb",
      image: "/lovable-uploads/b696d641-c325-4985-b927-443fd34f33b0.png",
      description: "Thunder SX series with full suspension and blue-yellow design",
      features: ["24\"/26\" options", "Full suspension", "Thunder SX series", "Blue-yellow design", "Cal Burn branding"]
    },
    {
      id: 47,
      name: "24,26 BRUTUS IC",
      category: "hybrid",
      image: "/lovable-uploads/a4da3666-3ce8-4616-9a21-cb89da36094e.png",
      description: "Brutus IC series with rear carrier and navy design",
      features: ["24\"/26\" options", "Rear carrier", "Brutus IC series", "Navy design", "Cal Burn branding"]
    },
    {
      id: 48,
      name: "24.2.40/26.2.40 DEFENDER IC",
      category: "mtb",
      image: "/lovable-uploads/bf4d67bf-3bfa-47f0-94dc-c8fb37494bcb.png",
      description: "Defender IC series with rear carrier and silver frame",
      features: ["Multi-size options", "Rear carrier", "Defender IC series", "Silver frame", "Mountain bike"]
    },
    {
      id: 49,
      name: "Hangover 26\"",
      category: "mtb",
      image: "/lovable-uploads/417801cf-36fa-4a05-aacf-f36c3eea943e.png",
      description: "Hangover series mountain bike with 26\" wheels and POPSTAR branding",
      features: ["26\" wheels", "Mountain bike", "POPSTAR branding", "Hangover series", "Multi-color options"]
    },
    {
      id: 50,
      name: "Florence IBC 20\"",
      category: "kids",
      image: "/lovable-uploads/2b93340c-ae42-4d11-9430-b996f93f6dff.png",
      description: "Beautiful pink Florence bike with basket and training wheels",
      features: ["20\" wheels", "Training wheels", "Front basket", "Florence design", "Pink theme"]
    },
    {
      id: 51,
      name: "Hangover IBC 26\"",
      category: "mtb",
      image: "/lovable-uploads/9bec2ce9-6e04-42c7-9fa5-d8e47f8c1bfd.png",
      description: "Hangover IBC series with rear carrier and blue accents",
      features: ["26\" wheels", "Rear carrier", "Blue frame", "POPSTAR branding", "Multi-color options"]
    },
    {
      id: 52,
      name: "Sniper IBC 26\"",
      category: "mtb",
      image: "/lovable-uploads/4f5b846f-e7f6-42a7-96a9-1792945abed7.png",
      description: "Sniper IBC series with rear carrier and sporty design",
      features: ["26\" wheels", "Rear carrier", "Sniper series", "CAL BURN branding", "Multi-color options"]
    },
    {
      id: 53,
      name: "Sniper 26\"",
      category: "mtb",
      image: "/lovable-uploads/40bf3096-8d8f-4ddc-91be-49a5229a664c.png",
      description: "Sniper series with red frame and racing design",
      features: ["26\" wheels", "Racing design", "Red frame", "CAL BURN branding", "Multi-color options"]
    },
    {
      id: 54,
      name: "Florence DX 20\"",
      category: "kids",
      image: "/lovable-uploads/cb1ccaf2-0d84-4d7e-876e-47744eae64a5.png",
      description: "Florence DX series with purple theme and training wheels",
      features: ["20\" wheels", "Training wheels", "Purple design", "Florence DX series", "Front basket"]
    },
    {
      id: 55,
      name: "24,26,27,29 VICTORY",
      category: "mtb",
      image: "/lovable-uploads/e847d19f-e80f-4f3a-b4c2-9e2478e5684e.png",
      description: "Victory series mountain bike with multiple size options",
      features: ["Multi-size options", "Victory series", "Disc brakes", "Professional grade", "Black frame"]
    },
    {
      id: 56,
      name: "24,26,27,29 VICTORY",
      category: "mtb",
      image: "/lovable-uploads/3599edc3-dd91-40c4-b287-a1f197a9baad.png",
      description: "Victory series with black frame and turquoise accents",
      features: ["Multi-size options", "Victory series", "Disc brakes", "Turquoise accents", "Professional grade"]
    },
    {
      id: 57,
      name: "24,26 BRUTUS",
      category: "hybrid",
      image: "/lovable-uploads/a1b99656-9980-46f5-a9d1-29492a6542b0.png",
      description: "Brutus series with disc brakes and modern design",
      features: ["24\"/26\" options", "Disc brakes", "Brutus series", "CAL BURN branding", "Modern design"]
    },
    {
      id: 58,
      name: "24,26 HANGOVER IC",
      category: "mtb",
      image: "/lovable-uploads/69dd6b6b-43f8-47c0-9db9-e503689c22c1.png",
      description: "Hangover IC series with rear carrier and black frame",
      features: ["24\"/26\" options", "Rear carrier", "Hangover IC series", "Black frame", "POPSTAR branding"]
    }
  ];

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'kids', label: 'Kids Bikes' },
    { value: 'mtb', label: 'Mountain Bikes' },
    { value: 'hybrid', label: 'Hybrid Bikes' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const handleWhatsAppInquiry = (productName: string) => {
    const phoneNumber = "919393559292";
    const message = `Hello, I'm interested in the "${productName}" bike. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Our Bike Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect bike for your journey. From kids' first rides to professional racing bikes.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search bikes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="card-hover border-0 shadow-md">
                <div className="relative overflow-hidden rounded-t-lg bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain p-2 transition-transform duration-300 hover:scale-110"
                  />
                  <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground capitalize">
                    {product.category}
                  </Badge>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button
                      className="w-full btn-primary"
                      onClick={() => handleWhatsAppInquiry(product.name)}
                    >
                      <WhatsappIcon className="h-5 w-5" />
                      Inquire on WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
