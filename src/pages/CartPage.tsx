
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <div className="flex flex-col items-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products">
              <Button>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearCart}
            className="text-destructive border-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="p-4 flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <Link to={`/products/${item.product.id}`} className="text-lg font-medium hover:underline">
                          {item.product.name}
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {item.product.unit} · CHF {item.product.price.toFixed(2)}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-medium">
                          CHF {(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <Link to="/products" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>CHF {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{cartTotal >= 50 ? "Free" : "CHF 7.00"}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>CHF {(cartTotal + (cartTotal >= 50 ? 0 : 7)).toFixed(2)}</span>
                </div>
              </div>
              
              <Button className="w-full mt-6" size="lg">
                Proceed to Checkout
              </Button>
              
              <div className="mt-4 text-sm text-center text-muted-foreground">
                <p>Shipping costs are calculated for Switzerland.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
