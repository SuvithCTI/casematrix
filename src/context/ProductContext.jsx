import React, { createContext, useContext, useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { IPHONE_MODELS } from '../data/categories';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeries, setSelectedSeries] = useState('iPhone 16 Series'); // default to iPhone 16
  const [selectedModel, setSelectedModel] = useState('all'); // 'all' or specific model id e.g. 'iphone-13'
  const [selectedCaseType, setSelectedCaseType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  
  // Active customizer product / preview state
  const [activeCustomizerProduct, setActiveCustomizerProduct] = useState(PRODUCTS[0]);
  const [customizerColor, setCustomizerColor] = useState(PRODUCTS[0].colors[0]);
  const [customizerModel, setCustomizerModel] = useState('iPhone 16 Pro Max');
  const [customizerFinish, setCustomizerFinish] = useState('matte');
  const [customizerEngraving, setCustomizerEngraving] = useState('');
  
  // Selected product for quick-view modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filtered products list - Comprehensive multi-attribute search & model matching
  const filteredProducts = useMemo(() => {
    const cleanSearch = searchQuery.trim().toLowerCase();
    const isSearching = cleanSearch !== '';

    return PRODUCTS.filter((item) => {
      // 1. Search Query Matching (Active Search takes precedence across all models & series)
      if (isSearching) {
        const matchesName = item.name?.toLowerCase().includes(cleanSearch);
        const matchesTarget = item.targetModel?.toLowerCase().includes(cleanSearch);
        const matchesDesc = item.description?.toLowerCase().includes(cleanSearch);
        const matchesTagline = item.tagline?.toLowerCase().includes(cleanSearch);
        const matchesBadge = item.badge?.toLowerCase().includes(cleanSearch);
        const matchesMaterial = item.material?.toLowerCase().includes(cleanSearch);
        const matchesFeatures = item.features?.some(f => f.toLowerCase().includes(cleanSearch));
        const matchesColors = item.colors?.some(c => c.name?.toLowerCase().includes(cleanSearch));

        const isSearchHit = matchesName || matchesTarget || matchesDesc || matchesTagline || matchesBadge || matchesMaterial || matchesFeatures || matchesColors;
        if (!isSearchHit) return false;

        // If a specific category filter is active, respect it during search
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }

        return true;
      }

      // 2. Category match (when not searching)
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 3. Case type match (if applied)
      if (selectedCaseType !== 'all' && item.caseType !== selectedCaseType) {
        return false;
      }

      // 4. Exact iPhone Model Match: When a model is clicked, strictly return only the 2 covers for that model
      if (selectedModel !== 'all') {
        const modelObj = IPHONE_MODELS.find(m => m.id === selectedModel);
        if (modelObj) {
          if (!item.targetModel || item.targetModel.toLowerCase() !== modelObj.name.toLowerCase()) {
            return false;
          }
        }
      } else if (selectedSeries !== 'all') {
        // 5. Series Match when model is 'all': return strictly the covers belonging to this series
        const seriesModelNames = IPHONE_MODELS
          .filter(m => m.series === selectedSeries)
          .map(m => m.name.toLowerCase());
        
        if (!item.targetModel || !seriesModelNames.includes(item.targetModel.toLowerCase())) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedSeries, selectedModel, selectedCaseType, searchQuery, sortBy]);

  const openCustomizer = (product, color = null, model = null) => {
    setActiveCustomizerProduct(product || PRODUCTS[0]);
    if (color) {
      setCustomizerColor(color);
    } else if (product?.colors?.[0]) {
      setCustomizerColor(product.colors[0]);
    }
    if (model) {
      setCustomizerModel(model);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products: PRODUCTS,
        filteredProducts,
        selectedCategory,
        setSelectedCategory,
        selectedSeries,
        setSelectedSeries,
        selectedModel,
        setSelectedModel,
        selectedCaseType,
        setSelectedCaseType,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        quickViewProduct,
        setQuickViewProduct,
        // Customizer state
        activeCustomizerProduct,
        setActiveCustomizerProduct,
        customizerColor,
        setCustomizerColor,
        customizerModel,
        setCustomizerModel,
        customizerFinish,
        setCustomizerFinish,
        customizerEngraving,
        setCustomizerEngraving,
        openCustomizer
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}
