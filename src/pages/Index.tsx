
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Truck } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductGrid from '@/components/products/ProductGrid';
import { getFeaturedProducts } from '@/data/products';

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-green-100 py-20">
        <div className="absolute inset-0 leaf-pattern opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Fresh Organic Products for a <span className="text-primary">Healthier Life</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We deliver high-quality organic fruits, vegetables, and more straight to your door.
              Locally sourced, sustainably grown, and always fresh.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products">
                <Button size="lg">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">100% Organic</h3>
                <p className="text-muted-foreground">
                  All our products are certified organic, grown without harmful pesticides or chemical fertilizers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Free Delivery</h3>
                <p className="text-muted-foreground">
                  Enjoy free delivery on orders over CHF 50. We deliver to your doorstep within 24 hours.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground">
                  We stand behind the quality of our products. Not satisfied? We'll refund you, no questions asked.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of the finest organic products this season.
              Fresh, local, and sustainably sourced.
            </p>
          </div>
          <ProductGrid products={featuredProducts} />
          <div className="text-center mt-10">
            <Link to="/products">
              <Button variant="outline" size="lg">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for weekly updates on new products, seasonal offerings, and exclusive promotions.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
