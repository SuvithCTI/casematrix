import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_iphone_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal e.g. 0.20
  const [appliedPromoName, setAppliedPromoName] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('aura_iphone_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  const showNotification = (title, message, image = null) => {
    setNotification({ title, message, image, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const addToCart = (product, selectedColor, selectedModel, engraving = '', qty = 1) => {
    const itemKey = `${product.id}-${selectedColor?.name || 'default'}-${selectedModel || 'universal'}-${engraving}`;
    
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.key === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [
          ...prev,
          {
            key: itemKey,
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            color: selectedColor || (product.colors ? product.colors[0] : null),
            model: selectedModel || (product.compatibleModels ? product.compatibleModels[0] : 'iPhone 16 Pro Max'),
            engraving: engraving.trim(),
            quantity: qty
          }
        ];
      }
    });

    showNotification(
      'Added to Bag',
      `${product.name} (${selectedModel || 'iPhone'}) added successfully!`,
      product.image
    );
  };

  const removeFromCart = (itemKey) => {
    setCartItems(prev => prev.filter(item => item.key !== itemKey));
  };

  const updateQuantity = (itemKey, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.key === itemKey) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedDiscount(0);
    setAppliedPromoName('');
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'IPHONE20' || cleanCode === 'AURA20') {
      setAppliedDiscount(0.20);
      setAppliedPromoName(cleanCode);
      return { success: true, message: '20% OFF Special VIP Discount applied!' };
    } else if (cleanCode === 'SAVE10' || cleanCode === 'APPLE10') {
      setAppliedDiscount(0.10);
      setAppliedPromoName(cleanCode);
      return { success: true, message: '10% Welcome Discount applied!' };
    } else if (cleanCode === 'FREESHIP') {
      setAppliedDiscount(0.01);
      setAppliedPromoName(cleanCode);
      return { success: true, message: 'Free Express Shipping unlocked!' };
    } else {
      return { success: false, message: 'Invalid promo code. Try "IPHONE20"' };
    }
  };

  const removePromoCode = () => {
    setAppliedDiscount(0);
    setAppliedPromoName('');
  };

  // Computations in INR
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedDiscount === 0.01 ? 0 : Math.round(subtotal * appliedDiscount);
  const shippingThreshold = 999;
  const isFreeShipping = subtotal >= shippingThreshold || appliedPromoName === 'FREESHIP';
  const shippingFee = cartItems.length === 0 ? 0 : (isFreeShipping ? 0 : 99);
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        promoCode,
        setPromoCode,
        applyPromoCode,
        removePromoCode,
        appliedDiscount,
        appliedPromoName,
        subtotal,
        discountAmount,
        shippingThreshold,
        isFreeShipping,
        shippingFee,
        total,
        totalItemsCount,
        notification,
        setNotification
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
