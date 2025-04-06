
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingCart, Menu, X, Leaf, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-8">
            <Leaf className="h-6 w-6 text-primary mr-2" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              jegy<span className="text-primary">.ch</span>
            </span>
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/products">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    All Products
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {['Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Beverages', 'Snacks'].map((category) => (
                      <li key={category}>
                        <Link 
                          to={`/products?category=${category.toLowerCase()}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{category}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Explore our {category.toLowerCase()} products
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>
          
          <Link to="/admin" className="hidden md:block">
            <Button variant="outline" size="sm">Admin</Button>
          </Link>
          
          <button 
            className="block md:hidden" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background pt-16">
          <nav className="container py-8">
            <ul className="space-y-6">
              <li>
                <Link to="/products" onClick={toggleMobileMenu} className="text-lg font-medium">
                  All Products
                </Link>
              </li>
              <li>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Categories</span>
                  <ChevronDown className="h-5 w-5" />
                </div>
                <ul className="mt-2 ml-4 space-y-3">
                  {['Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Beverages', 'Snacks'].map((category) => (
                    <li key={category}>
                      <Link 
                        to={`/products?category=${category.toLowerCase()}`}
                        onClick={toggleMobileMenu}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link to="/about" onClick={toggleMobileMenu} className="text-lg font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={toggleMobileMenu} className="text-lg font-medium">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/admin" onClick={toggleMobileMenu} className="text-lg font-medium">
                  Admin
                </Link>
              </li>
              <li className="pt-6">
                <Button onClick={toggleMobileMenu} className="w-full">
                  Close Menu
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
