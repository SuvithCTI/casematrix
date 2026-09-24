import React from 'react';
import { Home, Smartphone, Package, ShoppingBag, User, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrder } from '../../context/OrderContext';

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { currentUser, isAuthenticated, isAdmin } = useAuth();
  const { orders = [] } = useOrder();

  const handleTabClick = (id) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBagClick = () => {
    setIsCartOpen(true);
  };

  // Count user orders
  const userOrdersCount = orders.filter(
    (o) =>
      o.customer?.email?.toLowerCase() === currentUser?.email?.toLowerCase() ||
      o.customer?.phone === currentUser?.phone ||
      (currentUser?.name && o.customer?.name?.toLowerCase() === currentUser?.name?.toLowerCase())
  ).length;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0a09]/95 backdrop-blur-2xl border-t border-amber-500/25 px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.6)]">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1 items-center">
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => handleTabClick('home')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition cursor-pointer active:scale-95 ${
            activeTab === 'home'
              ? 'text-amber-400 font-bold bg-amber-500/15 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'text-amber-400' : 'text-slate-400'}`} />
          <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'home' ? 'text-amber-300 font-black' : 'text-slate-400'}`}>
            Home
          </span>
        </button>

        {/* 2. Products / Covers */}
        <button
          type="button"
          onClick={() => handleTabClick('products')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition cursor-pointer active:scale-95 ${
            activeTab === 'products'
              ? 'text-amber-400 font-bold bg-amber-500/15 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Smartphone className={`w-5 h-5 ${activeTab === 'products' ? 'text-amber-400' : 'text-slate-400'}`} />
          <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'products' ? 'text-amber-300 font-black' : 'text-slate-400'}`}>
            Cases
          </span>
        </button>

        {/* 3. My Orders (with live badge) */}
        <button
          type="button"
          onClick={() => handleTabClick('orders')}
          className={`relative flex flex-col items-center justify-center py-1 rounded-xl transition cursor-pointer active:scale-95 ${
            activeTab === 'orders' || activeTab === 'my-orders'
              ? 'text-amber-400 font-bold bg-amber-500/15 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Package className={`w-5 h-5 ${activeTab === 'orders' || activeTab === 'my-orders' ? 'text-amber-400' : 'text-slate-400'}`} />
            {userOrdersCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 bg-amber-500 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center ring-1 ring-slate-950">
                {userOrdersCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'orders' || activeTab === 'my-orders' ? 'text-amber-300 font-black' : 'text-slate-400'}`}>
            Orders
          </span>
        </button>

        {/* 4. Bag / Cart (with live badge) */}
        <button
          type="button"
          onClick={handleBagClick}
          className="relative flex flex-col items-center justify-center py-1 rounded-xl transition cursor-pointer active:scale-95 text-slate-400 hover:text-slate-200"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-slate-400 group-hover:text-amber-400" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 bg-amber-400 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center ring-1 ring-slate-950">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight text-slate-400 font-semibold">
            Bag
          </span>
        </button>

        {/* 5. Account / Admin */}
        <button
          type="button"
          onClick={() => {
            if (isAdmin) {
              handleTabClick('admin');
            } else if (isAuthenticated) {
              handleTabClick('orders');
            } else {
              handleTabClick('signin');
            }
          }}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition cursor-pointer active:scale-95 ${
            activeTab === 'signin' || activeTab === 'signup' || activeTab === 'admin'
              ? 'text-amber-400 font-bold bg-amber-500/15 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {isAdmin ? (
            <ShieldCheck className={`w-5 h-5 ${activeTab === 'admin' ? 'text-amber-400' : 'text-amber-400/80'}`} />
          ) : (
            <User className={`w-5 h-5 ${activeTab === 'signin' || activeTab === 'signup' ? 'text-amber-400' : 'text-slate-400'}`} />
          )}
          <span className={`text-[10px] mt-0.5 tracking-tight truncate max-w-[50px] ${
            activeTab === 'signin' || activeTab === 'signup' || activeTab === 'admin' ? 'text-amber-300 font-black' : 'text-slate-400'
          }`}>
            {isAdmin ? 'Admin' : (isAuthenticated ? (currentUser?.name?.split(' ')[0] || 'Account') : 'Sign In')}
          </span>
        </button>
      </div>
    </div>
  );
}
