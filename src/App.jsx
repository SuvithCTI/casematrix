import React, { useState } from 'react';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Main Views & Components
import DesktopNavbar from './components/desktop/DesktopNavbar';
import DesktopFooter from './components/desktop/DesktopFooter';
import DesktopCartDrawer from './components/desktop/DesktopCartDrawer';
import DesktopHomeView from './views/desktop/DesktopHomeView';
import DesktopProductsView from './views/desktop/DesktopProductsView';
import DesktopAboutView from './views/desktop/DesktopAboutView';
import DesktopContactView from './views/desktop/DesktopContactView';
import DesktopAdminDashboard from './views/desktop/DesktopAdminDashboard';
import DesktopAuthView from './views/desktop/DesktopAuthView';
import DesktopOrdersView from './views/desktop/DesktopOrdersView';
import MobileBottomNav from './components/mobile/MobileBottomNav';

// Common Modals & Overlays
import ProductQuickViewModal from './components/common/ProductQuickViewModal';
import CheckoutModal from './components/common/CheckoutModal';
import OrderReceiptModal from './components/common/OrderReceiptModal';
import EnquiryModal from './components/common/EnquiryModal';
import WhatsAppFloating from './components/common/WhatsAppFloating';
import QuickNotification from './components/common/QuickNotification';
import LegalModal from './components/common/LegalModal';

function AppContent() {
  const getInitialTab = () => {
    try {
      // 1. Check URL hash first (e.g. #admin, #signin, #products, #about, #contact, #orders)
      const hash = window.location.hash.replace('#', '').trim();
      const validTabs = ['home', 'products', 'about', 'contact', 'admin', 'signin', 'signup', 'admin-login', 'auth', 'orders', 'my-orders'];
      if (hash && validTabs.includes(hash)) {
        return hash;
      }
      // 2. Check localStorage
      const saved = localStorage.getItem('casematrix_active_tab');
      if (saved && validTabs.includes(saved)) {
        return saved;
      }
    } catch (e) {}
    return 'home';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [legalDocument, setLegalDocument] = useState(null);

  // Sync activeTab to LocalStorage and URL hash on changes
  React.useEffect(() => {
    try {
      localStorage.setItem('casematrix_active_tab', activeTab);
      if (activeTab === 'home') {
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } else {
        if (window.location.hash !== `#${activeTab}`) {
          window.history.replaceState(null, '', `#${activeTab}`);
        }
      }
    } catch (e) {}
  }, [activeTab]);

  // Listen to hash changes (e.g. browser back / forward)
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash) {
        const validTabs = ['home', 'products', 'about', 'contact', 'admin', 'signin', 'signup', 'admin-login', 'auth', 'orders', 'my-orders'];
        if (validTabs.includes(hash)) {
          setActiveTab(hash);
        }
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // If in dedicated auth page mode, render standalone Sign In / Sign Up / Admin Page
  if (activeTab === 'signin' || activeTab === 'signup' || activeTab === 'admin-login' || activeTab === 'auth') {
    return (
      <div className="min-h-screen w-full bg-[#f8fafc] text-slate-800 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 font-sans">
        <DesktopAuthView 
          initialTab={activeTab === 'admin-login' ? 'admin' : (activeTab === 'signup' ? 'signup' : 'signin')}
          setActiveTab={setActiveTab}
          onNavigateHome={() => setActiveTab('home')}
          onNavigateAdmin={() => setActiveTab('admin')}
        />
        <QuickNotification />
      </div>
    );
  }

  // If in admin mode, display the Admin Page as a completely separate, dedicated standalone console
  if (activeTab === 'admin') {
    return (
      <div className="min-h-screen w-full bg-[#f8fafc] text-slate-800 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 font-sans">
        <DesktopAdminDashboard 
          setActiveTab={setActiveTab} 
          onNavigateHome={() => setActiveTab('home')} 
        />
        <QuickNotification />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f7f1e6] text-[#1c140d] flex flex-col justify-between selection:bg-amber-500 selection:text-white pb-16 md:pb-0">
      {/* Main Responsive Header & Store Layout */}
      <div className="w-full flex-1 flex flex-col justify-between">
        <DesktopNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="w-full flex-1">
          {activeTab === 'home' && <DesktopHomeView setActiveTab={setActiveTab} />}
          {activeTab === 'products' && <DesktopProductsView />}
          {activeTab === 'about' && <DesktopAboutView setActiveTab={setActiveTab} />}
          {activeTab === 'contact' && <DesktopContactView />}
          {(activeTab === 'orders' || activeTab === 'my-orders') && (
            <DesktopOrdersView setActiveTab={setActiveTab} />
          )}
        </main>

        <DesktopFooter setActiveTab={setActiveTab} onOpenLegal={setLegalDocument} />
      </div>

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Shared Modals, Drawers & Overlays for Store */}
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
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <AppContent />
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
