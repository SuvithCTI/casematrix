import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const OrderContext = createContext();

const INITIAL_DEMO_ENQUIRIES = [
  {
    id: 'enq-101',
    name: 'Vikramaditya Singhania',
    company: 'Singhania Capital Tech',
    email: 'vikram@singhaniacapital.in',
    phone: '+91 98201 12345',
    enquiryType: 'Corporate / Bulk iPhone Cases (10+ Units)',
    targetModel: 'iPhone 16 Pro Max',
    estimatedQuantity: '50-100 Units (35% Off)',
    message: 'Need laser-etched custom titanium logo with individual employee initials on Desert Gold cases.',
    createdAt: '2026-03-20T10:30:00.000Z',
    status: 'In Review'
  },
  {
    id: 'enq-102',
    name: 'Pooja Hegde',
    company: 'PixelCraft Studios',
    email: 'pooja@pixelcraft.design',
    phone: '+91 94440 88990',
    enquiryType: 'Custom Laser Name Engraving',
    targetModel: 'iPhone 16 Pro',
    estimatedQuantity: '25-50 Units (25% Off)',
    message: 'Require custom corporate gifting batch for our leadership team with express delivery to Chennai.',
    createdAt: '2026-03-22T14:15:00.000Z',
    status: 'Contacted'
  }
];

const DEFAULT_SEEDED_ORDERS = [
  {
    orderId: 'CM-IN-336352',
    createdAt: '2026-09-24T10:44:00.000Z',
    customer: {
      name: 'Aditya Verma',
      email: 'user@casematrix.in',
      phone: '+91 98765 43210',
      address: 'Milidhane',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      postalCode: '643217',
      country: 'India',
      notes: ''
    },
    paymentMethod: 'Cash On Delivery',
    items: [
      {
        id: 'case-hello-kitty',
        name: 'AURA™ Hello Kitty Pink Camera-Shield Acrylic Case - iPhone 16 Pro Max',
        model: 'iPhone 16 Pro Max',
        selectedModel: 'iPhone 16 Pro Max',
        color: { name: 'Hello Kitty Pink', hex: '#f472b6' },
        price: 1999,
        quantity: 1,
        image: '/images/hero-desert-gold.jpg'
      }
    ],
    pricing: {
      subtotal: 1999,
      discount: 0,
      shipping: 0,
      total: 1999,
      promoCode: ''
    },
    status: 'Confirmed'
  }
];

export const loadOrdersFromStorage = () => {
  try {
    const savedAura = localStorage.getItem('aura_iphone_orders');
    const savedCase = localStorage.getItem('casematrix_orders');

    if (savedAura !== null) {
      const parsed = JSON.parse(savedAura);
      if (Array.isArray(parsed)) return parsed;
    }
    if (savedCase !== null) {
      const parsed = JSON.parse(savedCase);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}

  // First time initialization only
  try {
    localStorage.setItem('aura_iphone_orders', JSON.stringify(DEFAULT_SEEDED_ORDERS));
    localStorage.setItem('casematrix_orders', JSON.stringify(DEFAULT_SEEDED_ORDERS));
  } catch (e) {}

  return DEFAULT_SEEDED_ORDERS;
};

export function OrderProvider({ children }) {
  // 1. Orders list with LocalStorage Persistence
  const [orders, setOrders] = useState(loadOrdersFromStorage);

  // 2. Corporate Enquiries with LocalStorage Persistence
  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('casematrix_enquiries');
      if (saved) {
        return JSON.parse(saved);
      }
      localStorage.setItem('casematrix_enquiries', JSON.stringify(INITIAL_DEMO_ENQUIRIES));
      return INITIAL_DEMO_ENQUIRIES;
    } catch (e) {
      return INITIAL_DEMO_ENQUIRIES;
    }
  });

  const syncOrders = () => {
    const fresh = loadOrdersFromStorage();
    setOrders(fresh);
  };

  // Listen to window focus, storage, and custom events for multi-tab / instant sync
  useEffect(() => {
    syncOrders();
    const handleSync = () => {
      syncOrders();
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('focus', handleSync);
    window.addEventListener('casematrix_orders_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('focus', handleSync);
      window.removeEventListener('casematrix_orders_updated', handleSync);
    };
  }, []);

  // Sync enquiries to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('casematrix_enquiries', JSON.stringify(enquiries));
    } catch (e) {}
  }, [enquiries]);

  // Sync orders to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('aura_iphone_orders', JSON.stringify(orders));
      localStorage.setItem('casematrix_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  const [activeOrderReceipt, setActiveOrderReceipt] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#eab308', '#f59e0b', '#d97706', '#ffffff', '#c5b49e']
      });
    } catch (e) {}
  };

  const createOrder = (orderData, cartItems, pricing) => {
    const existingOrders = loadOrdersFromStorage();
    const orderId = 'CM-IN-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name: orderData.name || 'Aditya Verma',
        email: orderData.email || 'user@casematrix.in',
        phone: orderData.phone || '+91 98765 43210',
        address: orderData.address || 'Address provided',
        city: orderData.city || 'Chennai',
        postalCode: orderData.postalCode || '600001',
        state: orderData.state || 'Tamil Nadu',
        country: orderData.country || 'India',
        notes: orderData.notes || ''
      },
      paymentMethod: orderData.paymentMethod || 'Cash On Delivery',
      items: Array.isArray(cartItems) && cartItems.length > 0 ? cartItems : [
        {
          name: 'AURA™ Hello Kitty Pink Camera-Shield Acrylic Case',
          model: 'iPhone 16 Pro Max',
          selectedModel: 'iPhone 16 Pro Max',
          price: 1999,
          quantity: 1,
          image: '/images/hero-desert-gold.jpg'
        }
      ],
      pricing: {
        subtotal: pricing?.subtotal || 1999,
        discount: pricing?.discountAmount || 0,
        shipping: pricing?.shippingFee || 0,
        total: pricing?.total || 1999,
        promoCode: pricing?.appliedPromoName || ''
      },
      status: 'Confirmed'
    };

    const withoutDup = existingOrders.filter(o => o.orderId !== orderId);
    const updated = [newOrder, ...withoutDup];

    try {
      localStorage.setItem('aura_iphone_orders', JSON.stringify(updated));
      localStorage.setItem('casematrix_orders', JSON.stringify(updated));
    } catch (e) {}

    setOrders(updated);
    setActiveOrderReceipt(newOrder);
    triggerConfetti();

    try {
      window.dispatchEvent(new Event('casematrix_orders_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}

    return newOrder;
  };

  // Admin Order Management with Instant Storage & Event Dispatch
  const updateOrderStatus = (orderId, newStatus) => {
    const existing = loadOrdersFromStorage();
    const updated = existing.map((ord) => 
      ord.orderId === orderId ? { ...ord, status: newStatus } : ord
    );

    try {
      localStorage.setItem('aura_iphone_orders', JSON.stringify(updated));
      localStorage.setItem('casematrix_orders', JSON.stringify(updated));
    } catch (e) {}

    setOrders(updated);

    // If the active receipt is currently open in modal, update its status too!
    setActiveOrderReceipt(prev => (prev && prev.orderId === orderId ? { ...prev, status: newStatus } : prev));

    try {
      window.dispatchEvent(new Event('casematrix_orders_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
  };

  const deleteOrder = (orderId) => {
    const existing = loadOrdersFromStorage();
    const updated = existing.filter((ord) => ord.orderId !== orderId);

    try {
      localStorage.setItem('aura_iphone_orders', JSON.stringify(updated));
      localStorage.setItem('casematrix_orders', JSON.stringify(updated));
    } catch (e) {}

    setOrders(updated);

    try {
      window.dispatchEvent(new Event('casematrix_orders_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
  };

  const clearAllOrders = () => {
    try {
      localStorage.setItem('aura_iphone_orders', JSON.stringify([]));
      localStorage.setItem('casematrix_orders', JSON.stringify([]));
    } catch (e) {}
    setOrders([]);
    try {
      window.dispatchEvent(new Event('casematrix_orders_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
  };

  // Add Corporate Enquiry
  const addEnquiry = (enquiryData) => {
    const newEnquiry = {
      id: 'enq-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'New',
      ...enquiryData
    };
    setEnquiries((prev) => {
      const updated = [newEnquiry, ...prev];
      try {
        localStorage.setItem('casematrix_enquiries', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    return newEnquiry;
  };

  const updateEnquiryStatus = (enquiryId, newStatus) => {
    setEnquiries((prev) => {
      const updated = prev.map((enq) => (enq.id === enquiryId ? { ...enq, status: newStatus } : enq));
      try {
        localStorage.setItem('casematrix_enquiries', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const deleteEnquiry = (enquiryId) => {
    setEnquiries((prev) => {
      const updated = prev.filter((enq) => enq.id !== enquiryId);
      try {
        localStorage.setItem('casematrix_enquiries', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const clearAllEnquiries = () => {
    try {
      localStorage.setItem('casematrix_enquiries', JSON.stringify([]));
    } catch (e) {}
    setEnquiries([]);
  };

  // Direct WhatsApp Order Generator with INR currency
  const generateWhatsAppOrderURL = (cartItems, pricing, customerInfo = null, customMessage = null) => {
    const supportPhone = '919384694189'; // Indian format for wa.me
    
    let text = `👋 *Hello Case Matrix!*\nI would like to place an order from your website.\n\n`;
    
    if (customerInfo?.name) {
      text += `👤 *Customer:* ${customerInfo.name}\n📞 *Phone:* ${customerInfo.phone}\n📍 *Delivery Address:* ${customerInfo.address}, ${customerInfo.city || ''} - ${customerInfo.postalCode || ''}\n\n`;
    }

    text += `📦 *IPHONE ORDER ITEMS:*\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. *${item.name}*\n   • Model: ${item.model}\n   • Color: ${item.color?.name || 'Standard'}\n   ${item.engraving ? `• Laser Engraving: "${item.engraving}"\n   ` : ''}• Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')}\n`;
    });

    text += `\n💰 *Total Amount:* ₹${pricing.total.toLocaleString('en-IN')} (Subtotal: ₹${pricing.subtotal.toLocaleString('en-IN')}`;
    if (pricing.discountAmount > 0) {
      text += `, Discount: -₹${pricing.discountAmount.toLocaleString('en-IN')}`;
    }
    text += `)\n`;

    if (customMessage) {
      text += `\n💬 *Note:* ${customMessage}`;
    }

    text += `\nPlease share UPI payment QR / confirmation. Thank you!`;

    return `https://wa.me/${supportPhone}?text=${encodeURIComponent(text)}`;
  };

  // Direct single-product WhatsApp enquiry in INR
  const generateSingleProductWhatsAppURL = (product, color = null, model = null) => {
    const supportPhone = '919384694189';
    const text = `👋 Hi Case Matrix! I'm interested in buying for my iPhone:\n\n📱 *${product.name}*\n• Compatible iPhone: ${model || 'iPhone 16 Pro Max'}\n• Color Finish: ${color?.name || product.colors?.[0]?.name || 'Standard'}\n• Price: ₹${product.price.toLocaleString('en-IN')}\n\nCan you please share real live photos and delivery timeframe across India?`;
    return `https://wa.me/${supportPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        enquiries,
        activeOrderReceipt,
        setActiveOrderReceipt,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isEnquiryModalOpen,
        setIsEnquiryModalOpen,
        enquirySuccess,
        setEnquirySuccess,
        createOrder,
        syncOrders,
        updateOrderStatus,
        deleteOrder,
        clearAllOrders,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        clearAllEnquiries,
        generateWhatsAppOrderURL,
        generateSingleProductWhatsAppURL,
        triggerConfetti
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
