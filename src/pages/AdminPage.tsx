
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Product } from '@/types/product';
import { products as initialProducts } from '@/data/products';

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm<Product>();
  
  const watchedValues = watch();
  
  const handleAddProduct = (data: Product) => {
    const newProduct: Product = {
      ...data,
      id: (products.length + 1).toString(),
    };
    
    setProducts([newProduct, ...products]);
    
    toast.success('Product added successfully!');
    reset();
    setIsAdding(false);
  };
  
  const handleEditProduct = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      Object.entries(product).forEach(([key, value]) => {
        setValue(key as keyof Product, value);
      });
      setIsEditing(id);
      setIsAdding(true);
    }
  };
  
  const handleUpdateProduct = (data: Product) => {
    const updatedProducts = products.map((product) =>
      product.id === isEditing ? { ...data, id: isEditing } : product
    );
    
    setProducts(updatedProducts);
    toast.success('Product updated successfully!');
    reset();
    setIsAdding(false);
    setIsEditing(null);
  };
  
  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    toast.success('Product deleted successfully!');
  };
  
  return (
    <Layout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="mb-8">
          {!isAdding ? (
            <Button onClick={() => setIsAdding(true)}>
              Add New Product
            </Button>
          ) : (
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h2>
              
              <form onSubmit={handleSubmit(isEditing ? handleUpdateProduct : handleAddProduct)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      placeholder="Product name"
                      {...register('name', { required: 'Product name is required' })}
                      className="mt-1"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="price">Price (CHF)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register('price', {
                        required: 'Price is required',
                        valueAsNumber: true,
                        min: { value: 0.01, message: 'Price must be greater than 0' },
                      })}
                      className="mt-1"
                    />
                    {errors.price && (
                      <p className="text-destructive text-sm mt-1">{errors.price.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      {...register('category', { required: 'Category is required' })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    >
                      <option value="">Select a category</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="dairy">Dairy</option>
                      <option value="bakery">Bakery</option>
                      <option value="beverages">Beverages</option>
                      <option value="snacks">Snacks</option>
                    </select>
                    {errors.category && (
                      <p className="text-destructive text-sm mt-1">{errors.category.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="Available quantity"
                      {...register('stock', {
                        required: 'Stock is required',
                        valueAsNumber: true,
                        min: { value: 0, message: 'Stock cannot be negative' },
                      })}
                      className="mt-1"
                    />
                    {errors.stock && (
                      <p className="text-destructive text-sm mt-1">{errors.stock.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      placeholder="e.g. kg, piece, bunch"
                      {...register('unit', { required: 'Unit is required' })}
                      className="mt-1"
                    />
                    {errors.unit && (
                      <p className="text-destructive text-sm mt-1">{errors.unit.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      placeholder="https://example.com/image.jpg"
                      {...register('image', { required: 'Image URL is required' })}
                      className="mt-1"
                    />
                    {errors.image && (
                      <p className="text-destructive text-sm mt-1">{errors.image.message}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Product description"
                      rows={3}
                      {...register('description', { required: 'Description is required' })}
                      className="mt-1"
                    />
                    {errors.description && (
                      <p className="text-destructive text-sm mt-1">{errors.description.message}</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isOrganic"
                        {...register('isOrganic')}
                        checked={watchedValues.isOrganic}
                        onCheckedChange={(checked) => {
                          setValue('isOrganic', checked === true);
                        }}
                      />
                      <Label htmlFor="isOrganic">Organic</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isLocal"
                        {...register('isLocal')}
                        checked={watchedValues.isLocal}
                        onCheckedChange={(checked) => {
                          setValue('isLocal', checked === true);
                        }}
                      />
                      <Label htmlFor="isLocal">Local</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isFeatured"
                        {...register('isFeatured')}
                        checked={watchedValues.isFeatured}
                        onCheckedChange={(checked) => {
                          setValue('isFeatured', checked === true);
                        }}
                      />
                      <Label htmlFor="isFeatured">Featured</Label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-2">
                  <Button type="submit">
                    {isEditing ? 'Update Product' : 'Add Product'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      reset();
                      setIsAdding(false);
                      setIsEditing(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <h2 className="p-4 border-b text-xl font-semibold">Product List</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="capitalize">{product.category}</TableCell>
                    <TableCell>CHF {product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive border-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
