
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Leaf, MapPin, Minus, Plus, ShoppingCart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { getProductById } from '@/data/products';
import { useCart } from '@/hooks/useCart';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">Sorry, the product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-6">
          <Link to="/products" className="text-muted-foreground hover:text-foreground flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden bg-white border">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {product.isOrganic && (
                <Badge className="bg-primary">
                  <Leaf className="h-3 w-3 mr-1" /> Organic
                </Badge>
              )}
              {product.isLocal && (
                <Badge className="bg-green-700">
                  <MapPin className="h-3 w-3 mr-1" /> Local
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold mb-4">
              CHF {product.price.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/ {product.unit}</span>
            </p>

            <p className="text-muted-foreground mb-6">
              {product.description}
            </p>

            <Separator className="my-6" />

            <div className="mb-6">
              <p className="text-sm mb-2">
                Availability: {' '}
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">In Stock ({product.stock} {product.stock === 1 ? product.unit : product.unit + 's'})</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </p>
              <p className="text-sm mb-2">Category: <span className="font-medium capitalize">{product.category}</span></p>
            </div>

            <Separator className="my-6" />

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
