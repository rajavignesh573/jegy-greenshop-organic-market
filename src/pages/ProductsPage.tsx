
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilter from '@/components/products/ProductFilter';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [categories, setCategories] = useState<string[]>([]);
  const isMobile = useIsMobile();

  // Get filter values from URL params
  const categoryParam = searchParams.get('category');
  const organicParam = searchParams.get('organic');
  const localParam = searchParams.get('local');

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [isOrganic, setIsOrganic] = useState<boolean | null>(
    organicParam === 'true' ? true : organicParam === 'false' ? false : null
  );
  const [isLocal, setIsLocal] = useState<boolean | null>(
    localParam === 'true' ? true : localParam === 'false' ? false : null
  );

  // Extract categories from products
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );
    setCategories(uniqueCategories);
  }, []);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (isOrganic !== null) params.set('organic', isOrganic.toString());
    if (isLocal !== null) params.set('local', isLocal.toString());
    setSearchParams(params);
  }, [selectedCategory, isOrganic, isLocal, setSearchParams]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (isOrganic !== null) {
      filtered = filtered.filter((product) => product.isOrganic === isOrganic);
    }

    if (isLocal !== null) {
      filtered = filtered.filter((product) => product.isLocal === isLocal);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, isOrganic, isLocal]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleOrganicChange = (value: boolean | null) => {
    setIsOrganic(value);
  };

  const handleLocalChange = (value: boolean | null) => {
    setIsLocal(value);
  };

  const FilterComponent = () => (
    <ProductFilter
      categories={categories}
      selectedCategory={selectedCategory}
      onCategoryChange={handleCategoryChange}
      onOrganicChange={handleOrganicChange}
      onLocalChange={handleLocalChange}
      isOrganic={isOrganic}
      isLocal={isLocal}
    />
  );

  return (
    <Layout>
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">All Products</h1>
          <p className="text-muted-foreground">
            Explore our selection of fresh, organic products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Mobile Filters */}
          {isMobile && (
            <div className="mb-4 flex justify-end md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] sm:w-[385px]">
                  <div className="py-4">
                    <h3 className="text-lg font-medium mb-4">Filters</h3>
                    <FilterComponent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}

          {/* Desktop Filters */}
          <div className="hidden md:block md:col-span-1">
            <FilterComponent />
          </div>

          {/* Products */}
          <div className="col-span-1 md:col-span-3">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
