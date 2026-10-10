import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { IPHONE_MODELS, CATEGORIES } from '../data/categories';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  // 1. Products List with LocalStorage Persistence and Validation
  const sanitizeProductList = (list) => {
    if (!Array.isArray(list) || list.length === 0) return PRODUCTS;
    const allowedModelNames = IPHONE_MODELS.filter(m => m.id !== 'all').map(m => m.name.toLowerCase());
    const valid = list.filter(p => {
      // Must have a valid non-empty image
      const hasImage = p && p.image && typeof p.image === 'string' && p.image.trim() !== '';
      if (!hasImage) return false;
      // Must belong to supported iPhone 13-16 models if it's a case
      if (p.category === 'cases' && p.targetModel) {
        return allowedModelNames.includes(p.targetModel.toLowerCase());
      }
      return true;
    });
    return valid.length > 0 ? valid : PRODUCTS;
  };

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('casematrix_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        const oldKeywords = [
          'magcharge', 'turbomatrix', 'pocketmatrix', 'solarmatrix',
          'voltmatrix', 'matrixdesk', 'airfold', 'titanium-240w', 'voltmini',
          'diamondshield', 'opticshield', 'magring', 'drivematrix', 'leather wallet'
        ];
        const oldIds = new Set([
          'phone-iphone-16-pro',
          'powerbank-magcharge-10k',
          'powerbank-turbomatrix-25k',
          'powerbank-pocketmatrix-built-in-cables',
          'powerbank-solarmatrix-20k',
          'charger-voltmatrix-65w-gan',
          'charger-matrixdesk-100w-hub',
          'charger-airfold-3in1-wireless-dock',
          'charger-cable-titanium-240w',
          'charger-voltmini-30w-pd',
          'acc-prosound-anc-earbuds',
          'acc-magsafe-leather-wallet-stand',
          'acc-diamondshield-screen-protector',
          'acc-opticshield-camera-protectors',
          'acc-magring-360-finger-kickstand',
          'acc-drivematrix-qi2-car-mount'
        ]);
        const clean = sanitizeProductList(parsed.filter(p => {
          if (!p) return false;
          if (p.category === 'accessories') return false;
          if (oldIds.has(p.id)) return false;
          const lowerName = (p.name || '').toLowerCase();
          if (oldKeywords.some(kw => lowerName.includes(kw))) return false;
          return true;
        }));
        // Smart merge: ensure updated images/gallery/colors from PRODUCTS are refreshed,
        // while preserving custom items and admin edits
        const defaultMap = new Map(PRODUCTS.map(p => [p.id, p]));
        const updated = clean.map(item => {
          if (defaultMap.has(item.id)) {
            const def = defaultMap.get(item.id);
            return {
              ...item,
              image: def.image,
              gallery: def.gallery,
              colors: def.colors,
              name: def.name,
              category: def.category,
              imageFit: def.imageFit
            };
          }
          return item;
        });
        const existingIds = new Set(updated.map(p => p.id));
        const missing = PRODUCTS.filter(p => !existingIds.has(p.id));
        const merged = [...updated, ...missing];
        localStorage.setItem('casematrix_products', JSON.stringify(merged));
        return merged;
      }
      localStorage.setItem('casematrix_products', JSON.stringify(PRODUCTS));
      return PRODUCTS;
    } catch (e) {
      return PRODUCTS;
    }
  });

  // Active sync & purge of obsolete products on mount / HMR
  useEffect(() => {
    const oldKeywords = [
      'magcharge', 'turbomatrix', 'pocketmatrix', 'solarmatrix',
      'voltmatrix', 'matrixdesk', 'airfold', 'titanium-240w', 'voltmini',
      'diamondshield', 'opticshield', 'magring', 'drivematrix', 'leather wallet'
    ];
    const oldIds = new Set([
      'phone-iphone-16-pro',
      'powerbank-magcharge-10k',
      'powerbank-turbomatrix-25k',
      'powerbank-pocketmatrix-built-in-cables',
      'powerbank-solarmatrix-20k',
      'charger-voltmatrix-65w-gan',
      'charger-matrixdesk-100w-hub',
      'charger-airfold-3in1-wireless-dock',
      'charger-cable-titanium-240w',
      'charger-voltmini-30w-pd',
      'acc-prosound-anc-earbuds',
      'acc-magsafe-leather-wallet-stand',
      'acc-diamondshield-screen-protector',
      'acc-opticshield-camera-protectors',
      'acc-magring-360-finger-kickstand',
      'acc-drivematrix-qi2-car-mount'
    ]);
    const isOldProduct = (p) => {
      if (!p) return true;
      if (p.category === 'accessories') return true;
      if (oldIds.has(p.id)) return true;
      const lowerName = (p.name || '').toLowerCase();
      if (oldKeywords.some(kw => lowerName.includes(kw))) return true;
      return false;
    };

    setProducts((prev) => {
      const hasOld = prev.some(isOldProduct);
      const missingNew = PRODUCTS.some(p => (p.category === 'powerbanks' || p.category === 'chargers' || p.category === 'earpods') && !prev.some(curr => curr.id === p.id));
      if (hasOld || missingNew) {
        const cleaned = prev.filter(p => !isOldProduct(p));
        const existingIds = new Set(cleaned.map(p => p.id));
        const toAdd = PRODUCTS.filter(p => !existingIds.has(p.id));
        const updated = [...cleaned, ...toAdd];
        try {
          localStorage.setItem('casematrix_products', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      }
      return prev;
    });
  }, []);

  // Sync products to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('casematrix_products', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  const [selectedCategory, setSelectedCategory] = useState(() => CATEGORIES[0]?.id || 'phones');
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [selectedModel, setSelectedModel] = useState('all'); // 'all' or specific model id e.g. 'iphone-13'
  const [selectedCaseType, setSelectedCaseType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  
  // Active customizer product / preview state
  const [activeCustomizerProduct, setActiveCustomizerProduct] = useState(() => products[0] || PRODUCTS[0]);
  const [customizerColor, setCustomizerColor] = useState(() => (products[0] || PRODUCTS[0]).colors?.[0]);
  const [customizerModel, setCustomizerModel] = useState('iPhone 16 Pro Max');
  const [customizerFinish, setCustomizerFinish] = useState('matte');
  const [customizerEngraving, setCustomizerEngraving] = useState('');
  
  // Selected product for quick-view modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Admin CRUD operations
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || 'case-' + Date.now(),
      rating: newProduct.rating || 5.0,
      reviewsCount: newProduct.reviewsCount || 1,
      inStock: newProduct.inStock !== false
    };
    setProducts((prev) => [productWithId, ...prev]);
    return productWithId;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleStock = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const resetToDefaultProducts = () => {
    setProducts(PRODUCTS);
    try {
      localStorage.setItem('casematrix_products', JSON.stringify(PRODUCTS));
    } catch (e) {}
  };

  // Filtered products list - Comprehensive multi-attribute search & model matching
  const filteredProducts = useMemo(() => {
    const cleanSearch = searchQuery.trim().toLowerCase();
    const isSearching = cleanSearch !== '';

    return products.filter((item) => {
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
        const matchesCategory = item.category?.toLowerCase().includes(cleanSearch);

        const isSearchHit = matchesName || matchesTarget || matchesDesc || matchesTagline || matchesBadge || matchesMaterial || matchesFeatures || matchesColors || matchesCategory;
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

      // 3. Case type match (if applied, only applies to cases)
      if (selectedCaseType !== 'all' && item.category === 'cases' && item.caseType !== selectedCaseType) {
        return false;
      }

      // 4. Exact iPhone Model Match: When a specific iPhone model is chosen
      if (selectedModel !== 'all') {
        if (item.category !== 'cases') return false;
        const modelObj = IPHONE_MODELS.find(m => m.id === selectedModel);
        if (modelObj) {
          if (!item.targetModel || item.targetModel.toLowerCase() !== modelObj.name.toLowerCase()) {
            return false;
          }
        }
      } else if (selectedSeries !== 'all') {
        // 5. Series Match: only applies if browsing cases specifically or if item is a case
        if (selectedCategory === 'cases') {
          const seriesModelNames = IPHONE_MODELS
            .filter(m => m.series === selectedSeries)
            .map(m => m.name.toLowerCase());
          
          if (!item.targetModel || !seriesModelNames.includes(item.targetModel.toLowerCase())) {
            return false;
          }
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedCategory, selectedSeries, selectedModel, selectedCaseType, searchQuery, sortBy]);

  const openCustomizer = (product, color = null, model = null) => {
    setActiveCustomizerProduct(product || products[0] || PRODUCTS[0]);
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
        products,
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
        openCustomizer,
        // Admin CRUD methods
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        resetToDefaultProducts
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
