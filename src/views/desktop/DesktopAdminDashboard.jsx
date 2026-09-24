import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowLeft, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Smartphone,
  Eye,
  ExternalLink,
  DollarSign,
  Layers,
  Filter,
  Download,
  Sliders,
  Sparkles,
  ChevronRight,
  MessageSquare,
  LogOut,
  BarChart3,
  Boxes,
  HelpCircle,
  Settings,
  Menu,
  Database,
  ArrowUpRight,
  Store,
  Tag,
  Calendar,
  CheckCircle,
  Truck,
  CreditCard,
  Star,
  Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProduct } from '../../context/ProductContext';
import { useOrder } from '../../context/OrderContext';
import BrandLogo from '../../components/common/BrandLogo';
import { IPHONE_MODELS_BY_SERIES } from '../../data/categories';

export default function DesktopAdminDashboard({ setActiveTab, onNavigateHome }) {
  const { 
    currentUser, 
    isAdmin, 
    users = [], 
    customerLogins = [], 
    lastActiveCustomer, 
    clearCustomerLogins,
    login,
    signup,
    logout, 
    openAuthModal, 
    createUser,
    updateUser,
    deleteUser,
    clearAllCustomers,
    syncUsers 
  } = useAuth();

  // Inline Admin Unlock Form State
  const [lockEmail, setLockEmail] = useState('casematrix@gmail.com');
  const [lockPassword, setLockPassword] = useState('casematrix');
  const [lockError, setLockError] = useState('');
  const [lockShowPassword, setLockShowPassword] = useState(false);

  const handleLockLoginSubmit = (e) => {
    e.preventDefault();
    setLockError('');
    const res = login(lockEmail, lockPassword);
    if (!res.success) {
      setLockError(res.message || 'Invalid admin credentials');
    }
  };
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    toggleStock, 
    resetToDefaultProducts 
  } = useProduct();
  const { 
    orders, 
    enquiries, 
    updateOrderStatus, 
    deleteOrder, 
    clearAllOrders,
    updateEnquiryStatus, 
    deleteEnquiry,
    clearAllEnquiries,
    syncOrders
  } = useOrder();

  const [activeAdminTab, setActiveAdminTab] = useState(() => {
    try {
      const saved = localStorage.getItem('casematrix_active_admin_tab');
      const valid = ['overview', 'orders', 'products', 'enquiries', 'users', 'settings'];
      if (saved && valid.includes(saved)) return saved;
    } catch (e) {}
    return 'overview';
  });

  // Live Real-Time Multi-Tab and In-App Synchronization
  React.useEffect(() => {
    try {
      localStorage.setItem('casematrix_active_admin_tab', activeAdminTab);
    } catch (e) {}
    if (syncUsers) syncUsers();
    if (syncOrders) syncOrders();

    const handleLiveSync = () => {
      if (syncUsers) syncUsers();
      if (syncOrders) syncOrders();
    };

    window.addEventListener('casematrix_orders_updated', handleLiveSync);
    window.addEventListener('casematrix_users_updated', handleLiveSync);
    window.addEventListener('storage', handleLiveSync);
    window.addEventListener('focus', handleLiveSync);

    // 2-second heartbeat to guarantee 100% live updates
    const interval = setInterval(handleLiveSync, 2000);

    return () => {
      window.removeEventListener('casematrix_orders_updated', handleLiveSync);
      window.removeEventListener('casematrix_users_updated', handleLiveSync);
      window.removeEventListener('storage', handleLiveSync);
      window.removeEventListener('focus', handleLiveSync);
      clearInterval(interval);
    };
  }, [activeAdminTab]);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [selectedOrderStatusFilter, setSelectedOrderStatusFilter] = useState('all');
  const [selectedProductSeriesFilter, setSelectedProductSeriesFilter] = useState('all');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpandOrder = (id) => {
    setExpandedOrderId(prev => prev === id ? null : id);
  };

  const handleVisitStore = () => {
    if (setActiveTab) {
      setActiveTab('home');
    } else if (onNavigateHome) {
      onNavigateHome();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product Add / Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productModalMode, setProductModalMode] = useState('add'); // 'add' | 'edit'
  const [editingProductId, setEditingProductId] = useState(null);

  const initialProductForm = {
    name: '',
    targetModel: 'iPhone 16 Pro Max',
    price: 1999,
    originalPrice: 2699,
    badge: 'New Release',
    tagline: 'Titanium Armor Drop Shield with MagSafe',
    description: 'Precision-engineered case tailored for iPhone with 16ft military shock absorption.',
    material: 'Aerospace Grade Titanium + German Bayer TPU',
    rating: 5.0,
    reviewsCount: 12,
    inStock: true,
    featuresText: 'Dedicated Camera Control sensor access\n16ft military shockproof drop protection\n38 N52 MagSafe neodymium array',
    images: [
      '/images/hero-desert-gold.jpg'
    ]
  };

  const [productFormData, setProductFormData] = useState(initialProductForm);

  // Helper to open Add modal
  const handleOpenAddProduct = () => {
    setProductModalMode('add');
    setEditingProductId(null);
    setProductFormData(initialProductForm);
    setIsProductModalOpen(true);
  };

  // Helper to open Edit modal
  const handleOpenEditProduct = (prod) => {
    setProductModalMode('edit');
    setEditingProductId(prod.id);
    
    // Extract gallery images or fallback to single image
    let existingImages = [];
    if (Array.isArray(prod.gallery) && prod.gallery.length > 0) {
      existingImages = [...prod.gallery];
    } else if (Array.isArray(prod.images) && prod.images.length > 0) {
      existingImages = [...prod.images];
    } else if (prod.image) {
      existingImages = [prod.image];
    } else {
      existingImages = ['/images/hero-desert-gold.jpg'];
    }

    setProductFormData({
      name: prod.name || '',
      targetModel: prod.targetModel || prod.compatibleModels?.[0] || 'iPhone 16 Pro Max',
      price: prod.price || 1999,
      originalPrice: prod.originalPrice || Math.round(prod.price * 1.35),
      badge: prod.badge || '',
      tagline: prod.tagline || '',
      description: prod.description || '',
      material: prod.material || 'Aerospace Grade Titanium + German Bayer TPU',
      rating: prod.rating || 5.0,
      reviewsCount: prod.reviewsCount || 1,
      inStock: prod.inStock !== false,
      featuresText: Array.isArray(prod.features) ? prod.features.join('\n') : (prod.tagline || ''),
      images: existingImages.slice(0, 5)
    });
    setIsProductModalOpen(true);
  };

  // Image Gallery Handlers (Max 5 images)
  const handleAddImageSlot = () => {
    if (productFormData.images.length < 5) {
      setProductFormData({
        ...productFormData,
        images: [...productFormData.images, '']
      });
    }
  };

  const handleUpdateImageSlot = (index, value) => {
    const updated = [...productFormData.images];
    updated[index] = value;
    setProductFormData({
      ...productFormData,
      images: updated
    });
  };

  const handleRemoveImageSlot = (index) => {
    if (productFormData.images.length <= 1) {
      // Don't allow empty, just reset first to empty string
      setProductFormData({
        ...productFormData,
        images: ['']
      });
      return;
    }
    const updated = productFormData.images.filter((_, i) => i !== index);
    setProductFormData({
      ...productFormData,
      images: updated
    });
  };

  const handleSetPrimaryImage = (index) => {
    if (index === 0) return;
    const updated = [...productFormData.images];
    const selected = updated.splice(index, 1)[0];
    updated.unshift(selected);
    setProductFormData({
      ...productFormData,
      images: updated
    });
  };

  // User Add / Edit Modal State
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userModalMode, setUserModalMode] = useState('add'); // 'add' | 'edit'
  const [editingUserId, setEditingUserId] = useState(null);
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    password: 'user123'
  });

  const handleOpenAddUser = () => {
    setUserModalMode('add');
    setEditingUserId(null);
    setUserFormData({
      name: '',
      email: '',
      phone: '',
      role: 'user',
      password: 'user123'
    });
    setIsUserModalOpen(true);
  };

  const handleOpenEditUser = (user) => {
    setUserModalMode('edit');
    setEditingUserId(user.id);
    setUserFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || 'user',
      password: user.password || 'user123'
    });
    setIsUserModalOpen(true);
  };

  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    if (!userFormData.email || !userFormData.name) {
      alert('Please provide customer name and email.');
      return;
    }

    if (userModalMode === 'edit' && editingUserId) {
      updateUser(editingUserId, userFormData);
    } else {
      createUser(userFormData);
    }
    setIsUserModalOpen(false);
  };

  // Access Control: If not admin, render inline unlock screen with direct sign-in
  if (!isAdmin) {
    return (
      <div className="w-full min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-5 shadow-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border border-amber-200/80 shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Admin Console Login</h2>
            <p className="text-xs text-slate-500">
              Sign in with your administrator credentials to access the Case Matrix operations dashboard.
            </p>
          </div>

          {lockError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium text-left">
              {lockError}
            </div>
          )}

          {/* Inline Admin Form */}
          <form onSubmit={handleLockLoginSubmit} className="space-y-3.5 text-left text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="email"
                  value={lockEmail}
                  onChange={(e) => setLockEmail(e.target.value)}
                  placeholder="casematrix@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Admin Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type={lockShowPassword ? 'text' : 'password'}
                  value={lockPassword}
                  onChange={(e) => setLockPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setLockShowPassword(!lockShowPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {lockShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign In & Unlock Dashboard</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setActiveTab ? setActiveTab('signin') : openAuthModal('login')}
              className="text-amber-700 hover:underline font-bold cursor-pointer"
            >
              Sign in as customer
            </button>
            <button
              type="button"
              onClick={handleVisitStore}
              className="text-slate-500 hover:text-slate-800 font-bold cursor-pointer flex items-center gap-1"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.pricing?.total || 0), 0);
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const inStockCount = products.filter((p) => p.inStock !== false).length;
  const outOfStockCount = products.length - inStockCount;
  const pendingOrdersCount = orders.filter((o) => {
    const s = o.status?.toLowerCase();
    return s === 'pending' || s === 'processing' || s === 'confirmed';
  }).length;
  const newEnquiriesCount = enquiries.filter((e) => e.status?.toLowerCase() === 'new' || !e.status).length;

  // Filtered Orders - Safe & Robust Search & Filter
  const filteredOrders = orders.filter((ord) => {
    if (!ord) return false;
    const cleanSearch = (orderSearch || '').toLowerCase().trim();
    
    const matchSearch = !cleanSearch ||
      (ord.orderId && ord.orderId.toLowerCase().includes(cleanSearch)) ||
      (ord.customer?.name && ord.customer.name.toLowerCase().includes(cleanSearch)) ||
      (ord.customer?.email && ord.customer.email.toLowerCase().includes(cleanSearch)) ||
      (ord.customer?.phone && ord.customer.phone.toLowerCase().includes(cleanSearch)) ||
      (ord.items && Array.isArray(ord.items) && ord.items.some(i => i && i.name && i.name.toLowerCase().includes(cleanSearch)));

    const ordStatus = (ord.status || 'Confirmed').toLowerCase();
    const filterStatus = (selectedOrderStatusFilter || 'all').toLowerCase();
    const matchStatus = filterStatus === 'all' || ordStatus === filterStatus;

    return Boolean(matchSearch && matchStatus);
  });

  // Filtered Products
  const filteredAdminProducts = products.filter((p) => {
    const matchSearch = 
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.targetModel?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.badge?.toLowerCase().includes(productSearch.toLowerCase());

    const matchSeries = 
      selectedProductSeriesFilter === 'all' ||
      (selectedProductSeriesFilter === 'inStock' && p.inStock !== false) ||
      (selectedProductSeriesFilter === 'outOfStock' && p.inStock === false) ||
      p.targetModel?.includes(selectedProductSeriesFilter);

    return matchSearch && matchSeries;
  });

  const handleProductFormSubmit = (e) => {
    e.preventDefault();
    
    // Clean and filter images
    const validImages = productFormData.images
      .map(url => url.trim())
      .filter(url => url.length > 0);
      
    if (validImages.length === 0) {
      validImages.push('/images/hero-desert-gold.jpg');
    }

    const primaryImage = validImages[0];
    
    // Parse features from text
    const featuresList = productFormData.featuresText
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const productPayload = {
      name: productFormData.name,
      targetModel: productFormData.targetModel,
      compatibleModels: [productFormData.targetModel],
      price: Number(productFormData.price),
      originalPrice: Number(productFormData.originalPrice) || Math.round(Number(productFormData.price) * 1.35),
      badge: productFormData.badge,
      tagline: productFormData.tagline,
      description: productFormData.description,
      material: productFormData.material,
      rating: Number(productFormData.rating) || 5.0,
      reviewsCount: Number(productFormData.reviewsCount) || 12,
      inStock: Boolean(productFormData.inStock),
      image: primaryImage,
      gallery: validImages,
      images: validImages,
      features: featuresList.length > 0 ? featuresList : [
        'Dedicated Camera Control sensor access',
        '16ft military shockproof drop protection',
        '38 N52 MagSafe neodymium array'
      ],
      colors: [
        { name: 'Titanium Edition', hex: '#c5b49e', image: primaryImage, default: true }
      ]
    };

    if (productModalMode === 'edit' && editingProductId) {
      updateProduct(editingProductId, productPayload);
    } else {
      addProduct({
        ...productPayload,
        id: 'case-' + Date.now(),
        category: 'cases',
        coverStyle: 'designer-cover'
      });
    }

    setIsProductModalOpen(false);
  };

  const navMenuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3, badge: null },
    { id: 'orders', label: 'Orders', icon: Package, badge: orders.length },
    { id: 'products', label: 'Products Catalog', icon: Boxes, badge: products.length },
    { id: 'enquiries', label: 'Corporate Quotes', icon: MessageSquare, badge: newEnquiriesCount > 0 ? `${newEnquiriesCount} new` : enquiries.length },
    { id: 'users', label: 'Users Directory', icon: Users, badge: users.length },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-800 flex flex-col lg:flex-row font-sans antialiased">
      
      {/* ========================================================
          LEFT SIDEBAR (STICKY ON DESKTOP, DRAWER ON MOBILE)
      ======================================================== */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white border-r border-slate-200/80 flex flex-col justify-between p-5 shadow-xs transition-transform duration-300 ease-in-out
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Branding */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleVisitStore}
              className="text-left cursor-pointer group"
              title="Click to visit customer store"
            >
              <BrandLogo size="md" variant="light" />
            </button>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Admin Operations</span>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-900 border border-amber-500/30">
              Live DB
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-1">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeAdminTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveAdminTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-950 border border-amber-500/30 shadow-xs font-black'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Action: VISIT STORE & ADMIN PROFILE */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          
          {/* Prominent Visit Store Button in Sidebar */}
          <button
            type="button"
            onClick={handleVisitStore}
            className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold text-xs transition shadow-sm hover:shadow flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-amber-400" />
              <span>Visit Customer Store</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition" />
          </button>

          {/* User Account Card */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                {currentUser?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.name || 'Administrator'}</p>
                <p className="text-[10px] text-slate-500 truncate">{currentUser?.email || 'casematrix@gmail.com'}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* ========================================================
          RIGHT CONTENT MAIN AREA
      ======================================================== */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* Top Header Bar inside Right Area */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumbs & Title */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <span>Dashboard</span>
                <ChevronRight className="w-3 h-3 text-slate-300" />
                <span className="text-amber-700 font-bold capitalize">{activeAdminTab}</span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight capitalize">
                {activeAdminTab === 'overview' && 'Store Performance & Overview'}
                {activeAdminTab === 'orders' && 'Customer Orders Fulfillment'}
                {activeAdminTab === 'products' && 'Product Catalog & Inventory'}
                {activeAdminTab === 'enquiries' && 'Corporate & Wholesale Quotes'}
                {activeAdminTab === 'users' && 'Registered Users Directory'}
              </h1>
            </div>
          </div>

          {/* Quick Right Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleOpenAddProduct}
              className="hidden sm:flex px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Case</span>
            </button>

            <button
              type="button"
              onClick={handleVisitStore}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer border border-slate-200/60"
            >
              <Store className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Visit Store</span>
            </button>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px]">
          
          {/* ========================================================
              TAB 1: OVERVIEW & KPI METRICS
          ======================================================== */}
          {activeAdminTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Executive KPI Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
                
                {/* Gross Sales */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Gross Sales</span>
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900">₹{totalRevenue.toLocaleString('en-IN')}</p>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
                    <Sparkles className="w-3 h-3" />
                    <span>Real-time Sync</span>
                  </div>
                </div>

                {/* Total Orders */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Orders</span>
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                      <Package className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900">{orders.length}</p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {pendingOrdersCount} pending
                  </p>
                </div>

                {/* Average Order Value */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Avg Ticket</span>
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900">₹{avgOrderValue.toLocaleString('en-IN')}</p>
                  <p className="text-[11px] text-slate-500 font-medium">Per checkout</p>
                </div>

                {/* Active Products */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Inventory</span>
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                      <Boxes className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900">{inStockCount} <span className="text-xs font-normal text-slate-400">/ {products.length}</span></p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {outOfStockCount > 0 ? `${outOfStockCount} out` : '100% In Stock'}
                  </p>
                </div>

                {/* Corporate Quotes */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">B2B Leads</span>
                    <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900">{enquiries.length}</p>
                  <p className="text-[11px] text-amber-700 font-bold">
                    {newEnquiriesCount} new leads
                  </p>
                </div>

                {/* Registered Customers */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Customers</span>
                    <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900">{users.filter(u => u.role !== 'admin').length}</p>
                  <div className="flex items-center gap-1 text-[11px] text-indigo-600 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Live Database</span>
                  </div>
                </div>

              </div>

              {/* Quick Shortcuts Bar */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-600">Shortcuts:</span>
                  <button
                    type="button"
                    onClick={handleOpenAddProduct}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-900 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-700" /> Add Case
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveAdminTab('orders')}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Package className="w-3.5 h-3.5 text-slate-500" /> View Orders ({orders.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveAdminTab('users')}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5 text-blue-600" /> View Users ({users.length})
                  </button>
                  <button
                    type="button"
                    onClick={handleVisitStore}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Store className="w-3.5 h-3.5 text-amber-600" /> Preview Store
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Reset catalog to default titanium cases?')) {
                        resetToDefaultProducts();
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-rose-50 hover:text-rose-700 border border-slate-200 text-slate-600 text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reset Default Catalog
                  </button>
                </div>
              </div>

              {/* Recent Orders List (Full Width) */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Recent Customer Orders</h3>
                    <p className="text-xs text-slate-500">Live order feed saved in LocalStorage</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveAdminTab('orders')}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All ({orders.length})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 space-y-2">
                    <Package className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-xs font-medium">No customer orders placed yet.</p>
                    <button
                      type="button"
                      onClick={handleVisitStore}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer"
                    >
                      Visit Store to Test Order
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {orders.slice(0, 5).map((ord) => {
                      const firstItem = ord.items?.[0] || {};
                      return (
                        <div
                          key={ord.orderId}
                          className="p-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/70 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <img
                              src={firstItem.image || '/images/hero-desert-gold.jpg'}
                              alt="Item"
                              className="w-9 h-9 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                            />
                            <div className="overflow-hidden">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-[10px]">
                                  #{ord.orderId}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {new Date(ord.createdAt || Date.now()).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                              <p className="text-slate-800 font-bold text-xs truncate mt-0.5">
                                {ord.customer?.name || 'Customer'} • <span className="font-normal text-slate-500">{ord.customer?.phone}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 shrink-0">
                            <span className="text-sm font-black text-slate-900">₹{ord.pricing?.total?.toLocaleString('en-IN')}</span>
                            <select
                              value={ord.status || 'Confirmed'}
                              onChange={(e) => updateOrderStatus(ord.orderId, e.target.value)}
                              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-[11px] font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer shadow-2xs"
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Delete order #${ord.orderId} permanently?`)) {
                                  deleteOrder(ord.orderId);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                              title="Delete Order"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Recent Registered Customers Widget */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Registered Customer Accounts</h3>
                    <p className="text-xs text-slate-500">Live profiles registered via Storefront & Checkout</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveAdminTab('users')}
                    className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Directory ({users.length})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {users
                    .filter(u => u.role !== 'admin')
                    .slice(0, 6)
                    .map((cust) => {
                      const custOrders = orders.filter(
                        o => o.customer?.email?.toLowerCase() === cust.email?.toLowerCase()
                      );
                      const isCurrentSession = currentUser?.email?.toLowerCase() === cust.email?.toLowerCase();

                      return (
                        <div
                          key={cust.id}
                          className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 font-black flex items-center justify-center shrink-0 border border-blue-200">
                              {cust.name?.charAt(0)?.toUpperCase() || 'C'}
                            </div>
                            <div className="overflow-hidden">
                              <p className="font-bold text-slate-900 truncate">{cust.name || 'Customer'}</p>
                              <p className="text-[11px] text-slate-500 truncate">{cust.email}</p>
                              <div className="flex items-center gap-1.5 mt-0.5 text-[10px]">
                                {isCurrentSession ? (
                                  <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">Active Now</span>
                                ) : (
                                  <span className="text-slate-500">{cust.phone || 'Account active'}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-bold text-slate-700 text-[10px] block">
                              {custOrders.length} {custOrders.length === 1 ? 'order' : 'orders'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

            </div>
          )}


          {/* ========================================================
              TAB 2: ORDERS MANAGEMENT
          ======================================================== */}
          {activeAdminTab === 'orders' && (
            <div className="space-y-4">
              
              {/* Filter & Search Header */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search by Order #, Customer name, Phone, Email..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                {/* Status Filter Tabs & Re-sync */}
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => syncOrders && syncOrders()}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
                    title="Refresh orders from storage"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                    <span>Re-sync</span>
                  </button>

                  {orders.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to permanently delete all ${orders.length} orders?`)) {
                          clearAllOrders();
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 border border-rose-200 shadow-2xs"
                      title="Clear all orders"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All Orders</span>
                    </button>
                  )}

                  {['all', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                        selectedOrderStatusFilter.toLowerCase() === st.toLowerCase()
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {st === 'all' ? 'All Orders' : st}
                    </button>
                  ))}
                </div>

              </div>

              {/* Orders Feed */}
              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-400 space-y-3">
                  <Package className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="text-sm font-bold text-slate-700">No orders found matching filters.</p>
                  <p className="text-xs text-slate-400">Try changing your search terms or status filter.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredOrders.map((ord) => {
                    const isExpanded = expandedOrderId === ord.orderId;
                    const firstItem = ord.items?.[0] || {};
                    return (
                      <div
                        key={ord.orderId}
                        className="rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition overflow-hidden"
                      >
                        {/* Main Compact Row */}
                        <div className="p-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
                          
                          {/* Order ID & Date */}
                          <div className="flex items-center gap-2.5 shrink-0">
                            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 font-bold flex items-center justify-center border border-amber-100 shrink-0">
                              <Package className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                                  #{ord.orderId}
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold text-[10px] uppercase">
                                  {ord.paymentMethod === 'cod' ? 'COD' : 'Prepaid UPI'}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                {new Date(ord.createdAt || Date.now()).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>

                          {/* Customer Name & Phone */}
                          <div className="lg:border-l lg:border-slate-100 lg:pl-3 min-w-[140px]">
                            <p className="font-bold text-slate-900 text-xs truncate">{ord.customer?.name || 'Customer'}</p>
                            <p className="text-[11px] text-slate-500 font-mono">{ord.customer?.phone || 'No phone'}</p>
                          </div>

                          {/* Product Preview Thumbnail & Name */}
                          <div className="flex items-center gap-2.5 flex-1 min-w-[200px] lg:border-l lg:border-slate-100 lg:pl-3">
                            <img
                              src={firstItem.image || '/images/hero-desert-gold.jpg'}
                              alt={firstItem.name || 'Case'}
                              className="w-8 h-8 rounded-md object-cover bg-slate-100 border border-slate-200 shrink-0"
                            />
                            <div className="truncate">
                              <p className="font-medium text-slate-800 text-xs truncate max-w-[260px]">
                                {firstItem.name || 'Titanium Case'}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {ord.items?.length > 1 ? `+${ord.items.length - 1} more item(s)` : firstItem.selectedModel || firstItem.targetModel || 'Qty: 1'}
                              </p>
                            </div>
                          </div>

                          {/* Price, Status Box, Details & Delete */}
                          <div className="flex items-center justify-between lg:justify-end gap-2.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                            <span className="text-sm font-black text-slate-900 mr-1">
                              ₹{ord.pricing?.total?.toLocaleString('en-IN')}
                            </span>

                            {/* Status Switcher Box */}
                            <select
                              value={ord.status || 'Confirmed'}
                              onChange={(e) => updateOrderStatus(ord.orderId, e.target.value)}
                              className="bg-slate-50 hover:bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer shadow-2xs"
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>

                            {/* Details Toggle Button */}
                            <button
                              type="button"
                              onClick={() => toggleExpandOrder(ord.orderId)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                                isExpanded ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              <span>{isExpanded ? 'Hide' : 'Details'}</span>
                              <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </button>

                            {/* Delete Order */}
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Delete order #${ord.orderId} permanently?`)) {
                                  deleteOrder(ord.orderId);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                              title="Delete Order"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                        </div>

                        {/* Expandable Order Details Drawer */}
                        {isExpanded && (
                          <div className="p-3.5 bg-slate-50 border-t border-slate-200/80 text-xs space-y-3 animate-in fade-in duration-150">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {/* Shipping Info */}
                              <div className="p-3 rounded-lg bg-white border border-slate-200/70 space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Shipping & Delivery</span>
                                <p className="text-slate-800 font-medium">
                                  {ord.customer?.streetAddress}, {ord.customer?.city}, {ord.customer?.state} - {ord.customer?.pincode}
                                </p>
                                <p className="text-[11px] text-slate-500">Email: {ord.customer?.email}</p>
                              </div>

                              {/* Items Breakdown */}
                              <div className="p-3 rounded-lg bg-white border border-slate-200/70 space-y-1.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Items Purchased ({ord.items?.length || 1})</span>
                                <div className="space-y-1.5">
                                  {ord.items?.map((it, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-[11px]">
                                      <span className="text-slate-800 font-medium truncate max-w-[220px]">
                                        {it.name} <span className="text-slate-400 font-normal">({it.selectedModel || it.targetModel})</span>
                                      </span>
                                      <span className="font-bold text-slate-900 shrink-0">
                                        ₹{it.price} × {it.quantity || 1}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}


          {/* ========================================================
              TAB 3: PRODUCTS CATALOG CRUD
          ======================================================== */}
          {activeAdminTab === 'products' && (
            <div className="space-y-4">
              
              {/* Header & Filter Controls */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search products by model, title, badge..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={selectedProductSeriesFilter}
                    onChange={(e) => setSelectedProductSeriesFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Models</option>
                    <option value="iPhone 16">iPhone 16 Series</option>
                    <option value="iPhone 15">iPhone 15 Series</option>
                    <option value="iPhone 14">iPhone 14 Series</option>
                    <option value="iPhone 13">iPhone 13 Series</option>
                    <option value="inStock">In Stock Only</option>
                    <option value="outOfStock">Out of Stock Only</option>
                  </select>

                  <button
                    type="button"
                    onClick={handleOpenAddProduct}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                </div>

              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAdminProducts.map((prod) => {
                  const productImages = prod.gallery || prod.images || (prod.image ? [prod.image] : ['/images/hero-desert-gold.jpg']);
                  return (
                    <div
                      key={prod.id}
                      className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-sm transition p-4 flex flex-col justify-between space-y-3.5"
                    >
                      <div className="space-y-3">
                        {/* Thumbnail, Badges & Image Counter */}
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img
                            src={prod.image || productImages[0]}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-md bg-slate-950/80 text-amber-300 font-black text-[10px] uppercase">
                              {prod.badge || 'Case'}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-black/60 text-white font-bold text-[10px] backdrop-blur-xs flex items-center gap-1">
                              <span>📷 {productImages.length} {productImages.length === 1 ? 'Photo' : 'Photos'}</span>
                            </span>
                          </div>
                          <div className="absolute top-2 right-2">
                            <button
                              type="button"
                              onClick={() => toggleStock(prod.id)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition cursor-pointer shadow-md ${
                                prod.inStock !== false
                                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                  : 'bg-rose-500 text-white hover:bg-rose-600'
                              }`}
                            >
                              {prod.inStock !== false ? 'In Stock' : 'Out of Stock'}
                            </button>
                          </div>
                        </div>

                        {/* Info */}
                        <div>
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-bold text-amber-700 uppercase tracking-wider">{prod.targetModel}</span>
                            <span className="text-slate-400 font-medium">★ {prod.rating || '5.0'}</span>
                          </div>
                          <h4 className="text-sm font-black text-slate-900 leading-tight mt-0.5">{prod.name}</h4>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1">{prod.description || prod.tagline}</p>
                        </div>
                      </div>

                      {/* Pricing & Full Edit Controls */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-black text-slate-900">₹{prod.price?.toLocaleString('en-IN')}</span>
                            {prod.originalPrice && prod.originalPrice > prod.price && (
                              <span className="text-xs text-slate-400 line-through font-medium">₹{prod.originalPrice}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Full Edit Modal Trigger Button */}
                          <button
                            type="button"
                            onClick={() => handleOpenEditProduct(prod)}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                            title="Edit all product details & gallery"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                            <span>Edit</span>
                          </button>

                          {/* Delete Product */}
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete product "${prod.name}" permanently?`)) {
                                deleteProduct(prod.id);
                              }
                            }}
                            className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}


          {/* ========================================================
              TAB 4: CORPORATE QUOTES & B2B ENQUIRIES
          ======================================================== */}
          {activeAdminTab === 'enquiries' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-black text-slate-900">Corporate & Bulk Orders Desk</h3>
                  <p className="text-xs text-slate-500">Manage institutional client inquiries, company giftings, and wholesale quotes</p>
                </div>
                <div className="flex items-center gap-2">
                  {enquiries.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Delete all corporate inquiries permanently?')) {
                          clearAllEnquiries();
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-rose-200 shadow-2xs"
                      title="Clear all leads"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All Leads</span>
                    </button>
                  )}
                  <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                    {enquiries.length} Total Leads
                  </span>
                </div>
              </div>

              {enquiries.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-400 space-y-2">
                  <MessageSquare className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="text-sm font-bold text-slate-700">No corporate enquiries submitted yet.</p>
                  <p className="text-xs text-slate-400">Enquiries submitted through the "Corporate Quote" modal in footer/cart will appear here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-slate-900">{enq.name}</h4>
                            {enq.company && (
                              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold">
                                {enq.company}
                              </span>
                            )}
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              enq.status === 'Closed' ? 'bg-emerald-100 text-emerald-800' :
                              enq.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {enq.status || 'New'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Received: {new Date(enq.createdAt || Date.now()).toLocaleDateString('en-IN')}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* WhatsApp Direct */}
                          {enq.phone && (
                            <a
                              href={`https://wa.me/91${enq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(enq.name)},%20thank%20you%20for%20your%20Case%20Matrix%20corporate%20quote%20enquiry.`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp Lead</span>
                            </a>
                          )}

                          <select
                            value={enq.status || 'New'}
                            onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                            className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 cursor-pointer"
                          >
                            <option value="New">Status: New</option>
                            <option value="Contacted">Status: Contacted</option>
                            <option value="Negotiation">Status: In Negotiation</option>
                            <option value="Closed">Status: Closed Deal</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm('Delete enquiry?')) {
                                deleteEnquiry(enq.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Contact Phone</span>
                          <a href={`tel:${enq.phone}`} className="font-bold text-slate-900 hover:text-amber-600">{enq.phone || 'N/A'}</a>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Email Address</span>
                          <span className="font-medium text-slate-700">{enq.email || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Estimated Units</span>
                          <span className="font-black text-amber-700">{enq.quantity || 'Bulk Order'}</span>
                        </div>
                      </div>

                      {enq.requirements && (
                        <div className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Requirement Notes:</span>
                          <p className="text-slate-700 leading-relaxed">{enq.requirements}</p>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              )}

            </div>
          )}


          {/* ========================================================
              TAB 5: USERS DIRECTORY
          ======================================================== */}
          {activeAdminTab === 'users' && (
            <div className="space-y-4">
              {/* Top Banner & Active User Info */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-600" /> Registered Customer Accounts
                    </h3>
                    <p className="text-xs text-slate-500">Live synchronized with store login & checkout profiles</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={handleOpenAddUser}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5 text-slate-950" />
                      <span>Add Customer</span>
                    </button>

                    {users.some(u => u.role !== 'admin') && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Delete all customer accounts? Default administrator will remain.')) {
                            clearAllCustomers();
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-rose-200 shadow-2xs"
                        title="Delete all customer accounts"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear Customers</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => syncUsers && syncUsers()}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                      title="Re-read all registered customer accounts from browser storage"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                      <span>Re-sync</span>
                    </button>
                    <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                      {users.filter(u => u.role === 'user').length} Customers
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
                      {users.length} Total Accounts
                    </span>
                  </div>
                </div>

                {/* Filters Strip */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search by name, email, phone..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      value={userRoleFilter}
                      onChange={(e) => setUserRoleFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer w-full sm:w-auto"
                    >
                      <option value="all">All Roles ({users.length})</option>
                      <option value="user">Customers Only ({users.filter(u => u.role === 'user').length})</option>
                      <option value="admin">Administrators ({users.filter(u => u.role === 'admin').length})</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-3 px-4">User Profile</th>
                        <th className="py-3 px-4">Contact Details</th>
                        <th className="py-3 px-4">Role & Status</th>
                        <th className="py-3 px-4">Orders Placed</th>
                        <th className="py-3 px-4">Total Spent</th>
                        <th className="py-3 px-4">Last Active</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users
                        .filter((u) => {
                          const clean = userSearch.toLowerCase().trim();
                          const matchesSearch = !clean || 
                            u.name?.toLowerCase().includes(clean) || 
                            u.email?.toLowerCase().includes(clean) || 
                            u.phone?.toLowerCase().includes(clean);
                          const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
                          return matchesSearch && matchesRole;
                        })
                        .map((u) => {
                          const userOrders = orders.filter(
                            o => o.customer?.email?.toLowerCase() === u.email?.toLowerCase()
                          );
                          const userSpent = userOrders.reduce((acc, curr) => acc + (curr.pricing?.total || 0), 0);
                          const isCurrentSession = currentUser?.email?.toLowerCase() === u.email?.toLowerCase();

                          return (
                            <tr key={u.id} className="hover:bg-slate-50/80 transition">
                              {/* User Profile */}
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2.5">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                                    u.role === 'admin' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-slate-100 text-slate-700 border border-slate-200'
                                  }`}>
                                    {u.name?.charAt(0)?.toUpperCase() || 'U'}
                                  </div>
                                  <div>
                                    <span className="font-bold text-slate-900 block leading-tight">{u.name || 'Anonymous User'}</span>
                                    <span className="text-[10px] text-slate-400 font-mono">ID: {u.id?.slice(0, 12)}</span>
                                  </div>
                                </div>
                              </td>

                              {/* Contact */}
                              <td className="py-3.5 px-4">
                                <div className="space-y-0.5">
                                  <p className="font-medium text-slate-700">{u.email}</p>
                                  <p className="text-[11px] text-slate-400">{u.phone || 'No phone recorded'}</p>
                                </div>
                              </td>

                              {/* Role & Live Status */}
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                    u.role === 'admin' ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                                  }`}>
                                    {u.role === 'admin' ? 'Admin' : 'Customer'}
                                  </span>

                                  {isCurrentSession ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active Now
                                    </span>
                                  ) : u.lastLoginAt ? (
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                                      Logged In
                                    </span>
                                  ) : null}
                                </div>
                              </td>

                              {/* Orders */}
                              <td className="py-3.5 px-4">
                                <span className="px-2 py-1 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs">
                                  {userOrders.length} {userOrders.length === 1 ? 'order' : 'orders'}
                                </span>
                              </td>

                              {/* Total Spent */}
                              <td className="py-3.5 px-4 font-bold text-slate-900">
                                {userSpent > 0 ? `₹${userSpent.toLocaleString('en-IN')}` : '₹0'}
                              </td>

                              {/* Last Active */}
                              <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                                {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString('en-IN', {
                                  dateStyle: 'short',
                                  timeStyle: 'short'
                                }) : new Date(u.createdAt || Date.now()).toLocaleDateString('en-IN')}
                              </td>

                              {/* Actions */}
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditUser(u)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-700 hover:bg-amber-50 transition cursor-pointer"
                                    title="Edit Customer Profile"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>

                                  {u.role !== 'admin' && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (window.confirm(`Remove account for ${u.name} (${u.email}) permanently?`)) {
                                          deleteUser(u.id);
                                        }
                                      }}
                                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                      title="Remove Customer Account"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* Bottom Sub-Footer inside Right Area */}
        <footer className="w-full bg-white border-t border-slate-200/80 py-3.5 px-4 sm:px-6 lg:px-8 text-slate-500 text-xs mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p>© 2026 Case Matrix Operations Studio • Express Avenue, Chennai</p>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-400">LocalStorage Active</span>
              <button
                type="button"
                onClick={handleVisitStore}
                className="text-amber-700 hover:text-amber-800 font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Visit Store</span>
              </button>
            </div>
          </div>
        </footer>

      </div>

      {/* ========================================================
          ADD / EDIT PRODUCT MODAL (LIGHT THEME + MULTI-IMAGE GALLERY)
      ======================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="max-w-2xl w-full bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/80">
                  {productModalMode === 'edit' ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    {productModalMode === 'edit' ? 'Edit Product & Gallery' : 'Add New iPhone Case'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {productModalMode === 'edit' ? 'Update case specifications, pricing, and up to 5 gallery photos' : 'Publish a new iPhone case model to your active store catalog'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleProductFormSubmit} className="space-y-4 text-xs overflow-y-auto pr-1.5 pt-3 pb-1">
              
              {/* Section 1: Basic Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                  <Tag className="w-3.5 h-3.5 text-amber-600" />
                  <span>1. Case Identification</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Product Title / Name *</label>
                    <input
                      required
                      type="text"
                      value={productFormData.name}
                      onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                      placeholder="e.g., Titanium Desert MagArmor Shield"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Target iPhone Model *</label>
                    <select
                      value={productFormData.targetModel}
                      onChange={(e) => setProductFormData({ ...productFormData, targetModel: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
                    >
                      {IPHONE_MODELS_BY_SERIES.map((group) => (
                        <optgroup key={group.series} label={group.series} className="font-bold text-slate-900 bg-slate-100">
                          {group.models.map((model) => (
                            <option key={model} value={model} className="font-medium text-slate-800 bg-white">
                              {model}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Badge / Ribbon Tag</label>
                    <input
                      type="text"
                      value={productFormData.badge}
                      onChange={(e) => setProductFormData({ ...productFormData, badge: e.target.value })}
                      placeholder="e.g. New Release, Bestseller, Titanium"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Tagline / Subtitle</label>
                    <input
                      type="text"
                      value={productFormData.tagline}
                      onChange={(e) => setProductFormData({ ...productFormData, tagline: e.target.value })}
                      placeholder="e.g. 16ft Military Shock Drop Protection with MagSafe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Pricing & Inventory */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                  <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                  <span>2. Pricing & Availability</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Selling Price (₹) *</label>
                    <input
                      required
                      type="number"
                      value={productFormData.price}
                      onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-black text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">MRP / Strikethrough (₹)</label>
                    <input
                      type="number"
                      value={productFormData.originalPrice}
                      onChange={(e) => setProductFormData({ ...productFormData, originalPrice: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-600 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Star Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={productFormData.rating}
                      onChange={(e) => setProductFormData({ ...productFormData, rating: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Reviews Count</label>
                    <input
                      type="number"
                      value={productFormData.reviewsCount}
                      onChange={(e) => setProductFormData({ ...productFormData, reviewsCount: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* In-Stock Toggle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${productFormData.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    <div>
                      <p className="font-black text-slate-900 text-xs">Inventory Status</p>
                      <p className="text-[11px] text-slate-500">
                        {productFormData.inStock ? 'Product is live and ready for immediate purchase' : 'Marked as Out of Stock in customer store'}
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productFormData.inStock}
                      onChange={(e) => setProductFormData({ ...productFormData, inStock: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>

              {/* Section 3: Multi-Image Gallery (Up to 5 images) */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                    <span>3. Product Images ({productFormData.images.length}/5)</span>
                  </div>
                  {productFormData.images.length < 5 && (
                    <button
                      type="button"
                      onClick={handleAddImageSlot}
                      className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-black text-[11px] flex items-center gap-1 border border-amber-200/80 cursor-pointer transition"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Photo Slot</span>
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-slate-500">
                  First image is the <strong>Primary Cover Photo</strong>. You can re-order covers with the "Set as Cover" button.
                </p>

                {/* Preset Quick Chips */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mr-1">Quick Presets:</span>
                  {[
                    { label: 'Desert Gold', path: '/images/hero-desert-gold.jpg' },
                    { label: 'Titanium Gray', path: '/images/product-titanium-gray.jpg' },
                    { label: 'Black Titanium', path: '/images/product-black-titanium.jpg' },
                    { label: 'White Titanium', path: '/images/product-white-titanium.jpg' },
                    { label: 'Frosted Blue', path: '/images/product-frosted-blue.jpg' },
                  ].map((preset) => (
                    <button
                      key={preset.path}
                      type="button"
                      onClick={() => {
                        // If current has an empty slot, fill it, otherwise add if < 5
                        const emptyIdx = productFormData.images.findIndex(img => !img.trim());
                        if (emptyIdx !== -1) {
                          handleUpdateImageSlot(emptyIdx, preset.path);
                        } else if (productFormData.images.length < 5) {
                          setProductFormData({
                            ...productFormData,
                            images: [...productFormData.images, preset.path]
                          });
                        } else {
                          // Replace first slot
                          handleUpdateImageSlot(0, preset.path);
                        }
                      }}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:border-amber-500 hover:text-amber-700 hover:bg-amber-50/50 transition cursor-pointer"
                    >
                      + {preset.label}
                    </button>
                  ))}
                </div>

                {/* Images List */}
                <div className="space-y-2">
                  {productFormData.images.map((imgUrl, index) => (
                    <div key={index} className="flex items-center gap-2.5 p-2 rounded-2xl bg-slate-50 border border-slate-200">
                      {/* Thumbnail Preview */}
                      <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0 overflow-hidden border border-slate-300 relative flex items-center justify-center">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = '/images/hero-desert-gold.jpg'; }}
                          />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-slate-400" />
                        )}
                        {index === 0 && (
                          <span className="absolute bottom-0 inset-x-0 bg-amber-500 text-[8px] font-black text-slate-950 text-center uppercase tracking-tighter py-0.2">
                            Cover
                          </span>
                        )}
                      </div>

                      {/* URL input */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                            {index === 0 ? '★ Primary Photo (#1)' : `Gallery Photo #${index + 1}`}
                          </span>
                        </div>
                        <input
                          type="text"
                          value={imgUrl}
                          onChange={(e) => handleUpdateImageSlot(index, e.target.value)}
                          placeholder="/images/product-titanium-gray.jpg or https://..."
                          className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 font-mono text-[11px] text-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        {index !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleSetPrimaryImage(index)}
                            title="Set as primary cover image"
                            className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-amber-700 hover:border-amber-300 text-[10px] font-bold cursor-pointer transition shadow-2xs"
                          >
                            Set Cover
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImageSlot(index)}
                          title="Remove this photo slot"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Specifications & Highlights */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-amber-600" />
                  <span>4. Description & Specifications</span>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Product Description</label>
                  <textarea
                    rows={2}
                    value={productFormData.description}
                    onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                    placeholder="Comprehensive case design overview..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Material Composition</label>
                  <input
                    type="text"
                    value={productFormData.material}
                    onChange={(e) => setProductFormData({ ...productFormData, material: e.target.value })}
                    placeholder="e.g. Aerospace Grade Titanium + German Bayer TPU"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Key Features (One feature per line)</label>
                  <textarea
                    rows={3}
                    value={productFormData.featuresText}
                    onChange={(e) => setProductFormData({ ...productFormData, featuresText: e.target.value })}
                    placeholder="Dedicated Camera Control sensor access&#10;16ft military shock drop protection&#10;38 N52 MagSafe neodymium array"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black cursor-pointer shadow-md hover:shadow-lg transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>{productModalMode === 'edit' ? 'Save Changes' : 'Publish Product'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          ADD / EDIT USER MODAL (CUSTOMER & ADMIN ACCOUNT MANAGER)
      ======================================================== */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="max-w-md w-full bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200 my-auto animate-in zoom-in-95 duration-150 space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                  {userModalMode === 'edit' ? <Edit3 className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {userModalMode === 'edit' ? 'Edit User Account' : 'Add New Customer'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {userModalMode === 'edit' ? 'Update customer profile and account permissions' : 'Create a registered customer or administrator account'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsUserModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUserFormSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  value={userFormData.name}
                  onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                <input
                  required
                  type="email"
                  value={userFormData.email}
                  onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                  placeholder="ramesh@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={userFormData.phone}
                  onChange={(e) => setUserFormData({ ...userFormData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Account Role</label>
                  <select
                    value={userFormData.role}
                    onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
                  >
                    <option value="user">Customer</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Account Password</label>
                  <input
                    type="text"
                    value={userFormData.password}
                    onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                    placeholder="welcome123"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black transition cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>{userModalMode === 'edit' ? 'Save User' : 'Create User'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
