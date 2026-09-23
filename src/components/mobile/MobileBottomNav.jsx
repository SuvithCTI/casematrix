import React from 'react';
import { Home, LayoutGrid, Info, MessageSquare } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  const handleTabClick = (id) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Products', icon: LayoutGrid },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0c0a09]/95 backdrop-blur-2xl border-t border-amber-500/20 px-4 py-2 shadow-2xl max-w-md mx-auto">
      <div className="grid grid-cols-4 gap-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTabClick(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition ${
                isActive ? 'text-amber-400 font-bold bg-amber-500/15 border border-amber-500/30 shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span className={`text-[11px] mt-1 font-semibold ${isActive ? 'text-amber-300 font-bold' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
