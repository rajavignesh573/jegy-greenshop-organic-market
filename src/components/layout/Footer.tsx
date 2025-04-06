
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-50 border-t border-border">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <Leaf className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold tracking-tight">
                jegy<span className="text-primary">.ch</span>
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Your trusted source for organic products. 
              We deliver quality, sustainability, and health to your doorstep.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=vegetables" className="text-muted-foreground hover:text-primary">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link to="/products?category=fruits" className="text-muted-foreground hover:text-primary">
                  Fruits
                </Link>
              </li>
              <li>
                <Link to="/products?category=dairy" className="text-muted-foreground hover:text-primary">
                  Dairy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p>123 Green Street</p>
              <p>Zurich, Switzerland</p>
              <p className="mt-3">Email: info@jegy.ch</p>
              <p>Phone: +41 123 456 789</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} jegy.ch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
