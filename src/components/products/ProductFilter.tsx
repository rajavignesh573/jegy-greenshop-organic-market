
import React, { useState } from 'react';
import { Check, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

interface ProductFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onOrganicChange: (isOrganic: boolean | null) => void;
  onLocalChange: (isLocal: boolean | null) => void;
  isOrganic: boolean | null;
  isLocal: boolean | null;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onOrganicChange,
  onLocalChange,
  isOrganic,
  isLocal,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const formatCategoryName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="bg-white border rounded-md shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className={`${showFilters ? 'block' : 'hidden'} md:block mt-4`}>
          <div>
            <h4 className="font-medium mb-2">Category</h4>
            <div className="space-y-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                className="mr-2 mb-2"
                onClick={() => onCategoryChange(null)}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className="mr-2 mb-2"
                  onClick={() => onCategoryChange(category)}
                >
                  {formatCategoryName(category)}
                </Button>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h4 className="font-medium mb-2">Product Type</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className={`mr-2 ${isOrganic ? 'bg-primary text-white hover:bg-primary/90' : ''}`}
                  onClick={() => onOrganicChange(isOrganic === null ? true : isOrganic ? null : true)}
                >
                  {isOrganic && <Check className="h-4 w-4 mr-1" />}
                  Organic
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`mr-2 ${isLocal ? 'bg-primary text-white hover:bg-primary/90' : ''}`}
                  onClick={() => onLocalChange(isLocal === null ? true : isLocal ? null : true)}
                >
                  {isLocal && <Check className="h-4 w-4 mr-1" />}
                  Local
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              onCategoryChange(null);
              onOrganicChange(null);
              onLocalChange(null);
            }}
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
