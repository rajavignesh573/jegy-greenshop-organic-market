
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Leaf, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="h-full transition-all hover:shadow-md overflow-hidden">
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105" 
          />
          {product.isOrganic && (
            <Badge className="absolute top-2 left-2 bg-primary/90">
              <Leaf className="h-3 w-3 mr-1" /> Organic
            </Badge>
          )}
          {product.isLocal && (
            <Badge className="absolute top-2 right-2 bg-green-700/90">
              <MapPin className="h-3 w-3 mr-1" /> Local
            </Badge>
          )}
        </div>
        <CardContent className="pt-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {product.description}
          </p>
          <p className="font-medium text-lg">
            CHF {product.price.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/ {product.unit}</span>
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleAddToCart} 
            className="w-full"
            disabled={product.stock <= 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
