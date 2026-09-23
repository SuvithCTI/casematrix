import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_iphone_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

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
    const orderId = 'AURA-IN-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        city: orderData.city,
        postalCode: orderData.postalCode,
        state: orderData.state || 'Maharashtra',
        country: orderData.country || 'India',
        notes: orderData.notes || ''
      },
      paymentMethod: orderData.paymentMethod || 'Instant UPI / QR Code',
      items: cartItems,
      pricing: {
        subtotal: pricing.subtotal,
        discount: pricing.discountAmount,
        shipping: pricing.shippingFee,
        total: pricing.total,
        promoCode: pricing.appliedPromoName
      },
      status: 'Confirmed - Preparing for Fast Dispatch'
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem('aura_iphone_orders', JSON.stringify(updated));
    } catch (e) {}

    setActiveOrderReceipt(newOrder);
    triggerConfetti();
    return newOrder;
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
        activeOrderReceipt,
        setActiveOrderReceipt,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isEnquiryModalOpen,
        setIsEnquiryModalOpen,
        enquirySuccess,
        setEnquirySuccess,
        createOrder,
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
