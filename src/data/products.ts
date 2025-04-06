
import { Product } from '@/types/product';

// Sample product data
export const products: Product[] = [
  {
    id: "1",
    name: "Organic Carrots",
    description: "Fresh, locally grown organic carrots. Perfect for salads, juicing, or cooking.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&h=500&fit=crop",
    category: "vegetables",
    stock: 50,
    unit: "bunch",
    isOrganic: true,
    isLocal: true,
    isFeatured: true
  },
  {
    id: "2",
    name: "Organic Apples",
    description: "Sweet and crisp organic apples from local farms. Rich in antioxidants and dietary fiber.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500&h=500&fit=crop",
    category: "fruits",
    stock: 75,
    unit: "kg",
    isOrganic: true,
    isLocal: true,
    isFeatured: true
  },
  {
    id: "3",
    name: "Fresh Spinach",
    description: "Nutritious organic spinach leaves, freshly harvested. High in iron and vitamins.",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&h=500&fit=crop",
    category: "vegetables",
    stock: 30,
    unit: "bunch",
    isOrganic: true,
    isLocal: true,
    isFeatured: false
  },
  {
    id: "4",
    name: "Organic Milk",
    description: "Fresh organic milk from grass-fed cows. Rich and creamy with no additives.",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=500&fit=crop",
    category: "dairy",
    stock: 40,
    unit: "liter",
    isOrganic: true,
    isLocal: true,
    isFeatured: false
  },
  {
    id: "5",
    name: "Whole Grain Bread",
    description: "Freshly baked whole grain bread made with organic flour. Rich in fiber and nutrients.",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=500&fit=crop",
    category: "bakery",
    stock: 25,
    unit: "loaf",
    isOrganic: true,
    isLocal: true,
    isFeatured: true
  },
  {
    id: "6",
    name: "Organic Tomatoes",
    description: "Juicy and flavorful organic tomatoes. Perfect for salads, sauces, or sandwiches.",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=500&h=500&fit=crop",
    category: "vegetables",
    stock: 60,
    unit: "kg",
    isOrganic: true,
    isLocal: true,
    isFeatured: false
  },
  {
    id: "7",
    name: "Free-Range Eggs",
    description: "Organic free-range eggs from happy chickens. Rich in protein and omega-3.",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&h=500&fit=crop",
    category: "dairy",
    stock: 50,
    unit: "dozen",
    isOrganic: true,
    isLocal: true,
    isFeatured: true
  },
  {
    id: "8",
    name: "Organic Bananas",
    description: "Sweet and nutritious organic bananas. Great source of potassium and fiber.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1543218024-57a70143c369?w=500&h=500&fit=crop",
    category: "fruits",
    stock: 80,
    unit: "kg",
    isOrganic: true,
    isLocal: false,
    isFeatured: false
  },
  {
    id: "9",
    name: "Organic Cucumber",
    description: "Crisp and refreshing organic cucumbers. Perfect for salads or snacking.",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=500&h=500&fit=crop",
    category: "vegetables",
    stock: 45,
    unit: "piece",
    isOrganic: true,
    isLocal: true,
    isFeatured: false
  },
  {
    id: "10",
    name: "Greek Yogurt",
    description: "Creamy organic Greek yogurt. High in protein and probiotics.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=500&fit=crop",
    category: "dairy",
    stock: 35,
    unit: "500g",
    isOrganic: true,
    isLocal: true,
    isFeatured: false
  },
  {
    id: "11",
    name: "Organic Strawberries",
    description: "Sweet and juicy organic strawberries. Rich in antioxidants and vitamin C.",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&h=500&fit=crop",
    category: "fruits",
    stock: 30,
    unit: "punnet",
    isOrganic: true,
    isLocal: true,
    isFeatured: true
  },
  {
    id: "12",
    name: "Organic Avocados",
    description: "Creamy organic avocados. Rich in healthy fats and nutrients.",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=500&h=500&fit=crop",
    category: "fruits",
    stock: 40,
    unit: "piece",
    isOrganic: true,
    isLocal: false,
    isFeatured: false
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};
