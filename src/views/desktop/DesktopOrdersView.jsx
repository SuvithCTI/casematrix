import React, { useState, useEffect } from 'react';
import { 
  Package, 
  ShoppingBag, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Printer, 
  MessageSquare, 
  MapPin, 
  Copy, 
  Check, 
  Sparkles,
  ArrowLeft,
  User,
  CreditCard,
  RefreshCw,
  Phone,
  LogOut
} from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function DesktopOrdersView({ setActiveTab }) {
  const { orders = [], setActiveOrderReceipt, syncOrders } = useOrder();
  const { currentUser, logout } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();

  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (syncOrders) syncOrders();
  }, []);

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReorder = (item) => {
    if (addToCart) {
      addToCart({
        id: item.id || 'case-' + Date.now(),
        name: item.name,
        price: item.price,
        image: item.image || '/images/hero-desert-gold.jpg',
        model: item.model || item.selectedModel || 'iPhone 16 Pro Max',
        color: item.color || { name: 'Titanium', hex: '#c5b49e' },
        engraving: item.engraving || ''
      });
      if (setIsCartOpen) setIsCartOpen(true);
    }
  };

  const handleWhatsAppSupport = (order) => {
    const supportPhone = '919384694189';
    const text = `Hi Case Matrix! I'd like to check dispatch status for my order *#${order.orderId}*.\nName: ${order.customer?.name}\nTotal: ₹${order.pricing?.total?.toLocaleString('en-IN')}`;
    window.open(`https://wa.me/${supportPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Filter orders matching current user
  const userOrders = orders.filter((ord) => {
    if (!currentUser) return true;
    const userEmail = currentUser.email?.toLowerCase().trim();
    const userPhone = currentUser.phone?.replace(/[^0-9]/g, '');
    const ordEmail = ord.customer?.email?.toLowerCase().trim();
    const ordPhone = ord.customer?.phone?.replace(/[^0-9]/g, '');

    const emailMatch = userEmail && ordEmail && (userEmail === ordEmail || ordEmail.includes(userEmail));
    const phoneMatch = userPhone && ordPhone && (userPhone === ordPhone || ordPhone.includes(userPhone));
    const nameMatch = currentUser.name && ord.customer?.name && 
      ord.customer.name.toLowerCase() === currentUser.name.toLowerCase();

    return emailMatch || phoneMatch || nameMatch || orders.length <= 2;
  });

  const getStatusStepIndex = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'delivered') return 4;
    if (s === 'shipped') return 3;
    if (s === 'processing') return 2;
    return 1; // Confirmed
  };

  return (
    <div className="min-h-screen w-full bg-[#fbf9f5] text-[#1c140d] py-5 sm:py-12 px-3 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Page Top Header with Clean Alignment */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-900/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-1.5">
              <button 
                type="button" 
                onClick={() => setActiveTab('home')}
                className="hover:underline cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Storefront
              </button>
              <span>/</span>
              <span className="text-slate-500">Account</span>
              <span>/</span>
              <span className="text-slate-900 font-bold">My Orders</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1c140d] tracking-tight">
              My Orders & Tracking
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              View your order history, delivery progress, and invoices
            </p>
          </div>

          {/* Quick Refresh & User Badge & Sign Out */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => syncOrders && syncOrders()}
              className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Refresh Orders"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>

            {currentUser && (
              <div className="flex items-center gap-1.5">
                <div className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2 shadow-2xs">
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black">
                    {currentUser.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="max-w-[120px] truncate">{currentUser.name || 'User'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (logout) logout();
                  }}
                  className="px-2.5 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-2xs"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Orders List */}
        {userOrders.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No orders found</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              You haven't placed any orders yet.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer mt-2"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map((ord) => {
              const currentStep = getStatusStepIndex(ord.status);
              const isDelivered = ord.status?.toLowerCase() === 'delivered';
              const isShipped = ord.status?.toLowerCase() === 'shipped';
              const isProcessing = ord.status?.toLowerCase() === 'processing';

              return (
                <div
                  key={ord.orderId}
                  className="rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-sm transition overflow-hidden"
                >
                  {/* Card Header: Order #, Date, Status, Total */}
                  <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                          #{ord.orderId}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(ord.orderId)}
                          className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                          title="Copy reference"
                        >
                          {copiedId === ord.orderId ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <span className="text-xs text-slate-500">
                        {new Date(ord.createdAt || Date.now()).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      {/* Status Pill */}
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                        isDelivered ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        isShipped ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        isProcessing ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isDelivered ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                        <span>{ord.status || 'Confirmed'}</span>
                      </span>

                      <span className="text-base font-black text-slate-900">
                        ₹{ord.pricing?.total?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Clean 4-Step Progress Bar */}
                  <div className="px-3 sm:px-5 py-3 bg-white border-b border-slate-100">
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center text-[9px] sm:text-[10px] font-bold">
                      <div className="space-y-1">
                        <div className="h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-emerald-700 truncate block">1. Confirmed</span>
                      </div>
                      <div className="space-y-1">
                        <div className={`h-1.5 rounded-full ${currentStep >= 2 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                        <span className={`truncate block ${currentStep >= 2 ? 'text-emerald-700' : 'text-slate-400'}`}>2. Processing</span>
                      </div>
                      <div className="space-y-1">
                        <div className={`h-1.5 rounded-full ${currentStep >= 3 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                        <span className={`truncate block ${currentStep >= 3 ? 'text-emerald-700' : 'text-slate-400'}`}>3. Shipped</span>
                      </div>
                      <div className="space-y-1">
                        <div className={`h-1.5 rounded-full ${currentStep >= 4 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                        <span className={`truncate block ${currentStep >= 4 ? 'text-emerald-700' : 'text-slate-400'}`}>4. Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="p-4 sm:p-5 space-y-3">
                    {ord.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-50/60 border border-slate-200/60 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image || '/images/hero-desert-gold.jpg'}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
                          />
                          <div>
                            <h4 className="font-bold text-slate-900 leading-snug">{item.name}</h4>
                            <p className="text-slate-500 text-[11px] mt-0.5">
                              {item.model || item.selectedModel || 'iPhone 16 Pro Max'} • <span className="font-semibold text-amber-800">{item.color?.name || 'Standard'}</span>
                            </p>
                            {item.engraving && (
                              <p className="text-[10px] text-amber-800 bg-amber-100/70 px-1.5 py-0.2 rounded mt-0.5 w-fit font-semibold">
                                Laser: "{item.engraving}"
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/50 shrink-0">
                          <div className="text-right">
                            <span className="font-bold text-slate-900 block">
                              ₹{((item.price || 1999) * (item.quantity || 1)).toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              Qty: {item.quantity || 1}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleReorder(item)}
                            className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[11px] transition cursor-pointer"
                          >
                            Buy Again
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Bottom Metadata & Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      {/* Destination Address Info */}
                      <div className="text-slate-600 space-y-0.5">
                        <p className="font-semibold text-slate-800 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-700" />
                          <span>{ord.customer?.name} • {ord.customer?.phone}</span>
                        </p>
                        <p className="text-[11px] text-slate-500 pl-4.5">
                          {ord.customer?.address}, {ord.customer?.city} - {ord.customer?.postalCode} ({ord.paymentMethod || 'COD'})
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleWhatsAppSupport(ord)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                          <span>WhatsApp Tracking</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveOrderReceipt(ord)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Printer className="w-3.5 h-3.5 text-amber-400" />
                          <span>Receipt</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
