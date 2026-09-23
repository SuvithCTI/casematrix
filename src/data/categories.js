export const IPHONE_MODELS = [
  { id: 'all', name: 'All iPhone Models', badge: 'All Models' },
  // iPhone 16 Series
  { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', series: 'iPhone 16 Series', isNew: true, screen: '6.9"', casesCount: 2 },
  { id: 'iphone-16-pro', name: 'iPhone 16 Pro', series: 'iPhone 16 Series', isNew: true, screen: '6.3"', casesCount: 2 },
  { id: 'iphone-16-plus', name: 'iPhone 16 Plus', series: 'iPhone 16 Series', isNew: true, screen: '6.7"', casesCount: 2 },
  { id: 'iphone-16', name: 'iPhone 16', series: 'iPhone 16 Series', isNew: true, screen: '6.1"', casesCount: 2 },
  // iPhone 15 Series
  { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', series: 'iPhone 15 Series', screen: '6.7"', casesCount: 2 },
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', series: 'iPhone 15 Series', screen: '6.1"', casesCount: 2 },
  { id: 'iphone-15-plus', name: 'iPhone 15 Plus', series: 'iPhone 15 Series', screen: '6.7"', casesCount: 2 },
  { id: 'iphone-15', name: 'iPhone 15', series: 'iPhone 15 Series', screen: '6.1"', casesCount: 2 },
  // iPhone 14 Series
  { id: 'iphone-14-pro-max', name: 'iPhone 14 Pro Max', series: 'iPhone 14 Series', screen: '6.7"', casesCount: 2 },
  { id: 'iphone-14-pro', name: 'iPhone 14 Pro', series: 'iPhone 14 Series', screen: '6.1"', casesCount: 2 },
  { id: 'iphone-14-plus', name: 'iPhone 14 Plus', series: 'iPhone 14 Series', screen: '6.7"', casesCount: 2 },
  { id: 'iphone-14', name: 'iPhone 14', series: 'iPhone 14 Series', screen: '6.1"', casesCount: 2 },
  // iPhone 13 Series
  { id: 'iphone-13-pro-max', name: 'iPhone 13 Pro Max', series: 'iPhone 13 Series', screen: '6.7"', casesCount: 2 },
  { id: 'iphone-13-pro', name: 'iPhone 13 Pro', series: 'iPhone 13 Series', screen: '6.1"', casesCount: 2 },
  { id: 'iphone-13', name: 'iPhone 13', series: 'iPhone 13 Series', screen: '6.1"', casesCount: 2 },
];

export const CATEGORIES = [
  { id: 'all', name: 'All Products', count: 36 },
  { id: 'cases', name: 'iPhone MagSafe Cases', count: 30, description: 'Titanium Armor, Velvet Silicone, Leather, Clear & Aramid Carbon' },
  { id: 'magsafe', name: 'MagSafe Wireless Gear', count: 2, description: '15W Qi2 Foldable Stands & Magnetic RFID Wallets' },
  { id: 'protection', name: 'Screen & Lens Armor', count: 2, description: '9H Sapphire Camera Rings & 28° Privacy Glass' },
  { id: 'chargers', name: 'GaN Fast Chargers & Cables', count: 2, description: '65W Dual Port GaN & 240W Kevlar Cables' },
];

export const CASE_TYPES = [
  { id: 'all', name: 'All Case Styles' },
  { id: 'magsafe-armor', name: 'Titanium Armor' },
  { id: 'silicone', name: 'Velvet Liquid Silicone' },
  { id: 'clear', name: 'Lumina Anti-Yellow Clear' },
  { id: 'leather', name: 'Italian Vegan Leather' },
  { id: 'carbon', name: 'Aramid Carbon Kevlar' },
];

export const COLOR_OPTIONS = [
  { id: 'desert-titanium', name: 'Desert Titanium Gold', hex: '#c5b49e', accent: '#eab308' },
  { id: 'titanium-black', name: 'Obsidian Titanium Black', hex: '#1c1d22', accent: '#e2e8f0' },
  { id: 'natural-titanium', name: 'Natural Titanium Gray', hex: '#8a8d91', accent: '#94a3b8' },
  { id: 'emerald-green', name: 'Alpine Forest Green', hex: '#1e382b', accent: '#10b981' },
  { id: 'saddle-brown', name: 'Saddle Tan Cognac', hex: '#8b4513', accent: '#d97706' },
];
