import React, { useState } from 'react';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

// Main Views & Components
import DesktopNavbar from './components/desktop/DesktopNavbar';
import DesktopFooter from './components/desktop/DesktopFooter';
import DesktopCartDrawer from './components/desktop/DesktopCartDrawer';
import DesktopHomeView from './views/desktop/DesktopHomeView';
import DesktopProductsView from './views/desktop/DesktopProductsView';
import DesktopAboutView from './views/desktop/DesktopAboutView';
import DesktopContactView from './views/desktop/DesktopContactView';

// Common Modals & Overlays
import ProductQuickViewModal from './components/common/ProductQuickViewModal';
import CheckoutModal from './components/common/CheckoutModal';
import OrderReceiptModal from './components/common/OrderReceiptModal';
import EnquiryModal from './components/common/EnquiryModal';
import WhatsAppFloating from './components/common/WhatsAppFloating';
import QuickNotification from './components/common/QuickNotification';
import LegalModal from './components/common/LegalModal';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'products' | 'about' | 'contact'
  const [legalDocument, setLegalDocument] = useState(null);

  return (
    <div className="min-h-screen w-full bg-[#f7f1e6] text-[#1c140d] flex flex-col justify-between selection:bg-amber-500 selection:text-white">
      {/* Main Responsive Header & Layout */}
      <div className="w-full flex-1 flex flex-col justify-between">
        <DesktopNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="w-full flex-1">
          {activeTab === 'home' && <DesktopHomeView setActiveTab={setActiveTab} />}
          {activeTab === 'products' && <DesktopProductsView />}
          {activeTab === 'about' && <DesktopAboutView setActiveTab={setActiveTab} />}
          {activeTab === 'contact' && <DesktopContactView />}
        </main>

        <DesktopFooter setActiveTab={setActiveTab} onOpenLegal={setLegalDocument} />
      </div>

      {/* Shared Modals, Drawers & Overlays */}
      <DesktopCartDrawer />
      <ProductQuickViewModal />
      <CheckoutModal />
      <OrderReceiptModal />
      <EnquiryModal />
      <WhatsAppFloating />
      <QuickNotification />
      <LegalModal documentType={legalDocument} onClose={() => setLegalDocument(null)} />
    </div>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <OrderProvider>
          <AppContent />
        </OrderProvider>
      </CartProvider>
    </ProductProvider>
  );
}
