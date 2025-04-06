
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilter from '@/components/products/ProductFilter';
import { products } from '@/data/products';
import { Product } from '@/types/product';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [categories, setCategories] = useState<string[]>([]);

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

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-muted-foreground">
            Explore our selection of fresh, organic products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="md:col-span-1">
            <ProductFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              onOrganicChange={handleOrganicChange}
              onLocalChange={handleLocalChange}
              isOrganic={isOrganic}
              isLocal={isLocal}
            />
          </div>

          {/* Products */}
          <div className="md:col-span-3">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
