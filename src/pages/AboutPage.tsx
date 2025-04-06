
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Leaf, Award, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">About jegy.ch</h1>
          
          <div className="mb-10">
            <p className="text-lg mb-4">
              Welcome to jegy.ch, your trusted source for organic, locally-sourced produce and products. 
              We are committed to bringing the freshest organic goods directly to your doorstep.
            </p>
            <p className="text-lg">
              Our journey began with a simple mission: to make organic and sustainable food accessible to everyone 
              while supporting local farmers and producers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">100% Organic</h3>
              <p className="text-muted-foreground">
                All our products are certified organic, grown without harmful pesticides or chemical fertilizers.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                We source only the highest quality products that meet our strict standards for freshness and taste.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We are committed to sustainable practices, from farm to table, minimizing our environmental impact.
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-6 md:p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="mb-4">
              Founded in 2022, jegy.ch started as a small farmer's market stand in Zurich. 
              Our founder, passionate about organic farming and sustainability, wanted to create a platform 
              where consumers could easily access organic products while supporting local agriculture.
            </p>
            <p>
              Today, we've grown into a digital marketplace, but our core values remain the same: 
              quality, sustainability, and community support. We work directly with over 30 local farmers 
              and producers to bring you the very best Switzerland has to offer.
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: "Sarah Mueller", role: "Founder & CEO" },
                { name: "Thomas Weber", role: "Head of Sourcing" },
                { name: "Lisa Schmidt", role: "Customer Relations" }
              ].map((member, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full"></div>
                  <h3 className="text-lg font-medium">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
