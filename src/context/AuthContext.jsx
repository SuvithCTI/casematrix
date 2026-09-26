import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { safeJSONParse, sanitizeText, validatePassword } from '../utils/security';

const AuthContext = createContext();

const DEFAULT_ADMIN = {
  id: 'usr-admin-01',
  name: 'Case Matrix Admin',
  email: 'casematrix@gmail.com',
  password: 'casematrix',
  phone: '+91 93846 94189',
  role: 'admin',
  createdAt: '2026-01-01T00:00:00.000Z'
};

const DEFAULT_USER = {
  id: 'usr-demo-01',
  name: 'Aditya Verma',
  email: 'user@casematrix.in',
  password: 'user123',
  phone: '+91 98765 43210',
  role: 'user',
  createdAt: '2026-02-15T00:00:00.000Z'
};

const PRESET_CUSTOMERS = [
  DEFAULT_USER
];

// Helper to load and merge all users across storage sources
export const loadAllUsersFromStorage = () => {
  const userMap = new Map();
  let deletedEmails = [];
  try {
    deletedEmails = safeJSONParse(localStorage.getItem('casematrix_deleted_user_emails'), []);
  } catch (e) {}

  const isDeleted = (email) => {
    if (!email) return false;
    const clean = email.toLowerCase().trim();
    return clean === 'ss@gmail.com' || clean === 'st@gmail.com' || deletedEmails.includes(clean);
  };

  // 1. Always ensure default Admin
  userMap.set('casematrix@gmail.com', DEFAULT_ADMIN);

  // 2. Preload single default customer profile (if not explicitly deleted)
  PRESET_CUSTOMERS.forEach(c => {
    if (c && c.email && !isDeleted(c.email)) {
      userMap.set(c.email.toLowerCase().trim(), c);
    }
  });

  // 3. Load dedicated registered customers list (excluding removed accounts)
  try {
    const parsed = safeJSONParse(localStorage.getItem('casematrix_registered_customers'), []);
    if (Array.isArray(parsed)) {
      parsed.forEach(u => {
        if (u && u.email && !isDeleted(u.email)) {
          const emailKey = u.email.toLowerCase().trim();
          const existing = userMap.get(emailKey) || {};
          userMap.set(emailKey, { ...existing, ...u });
        }
      });
    }
  } catch (e) {}

  // 4. Load stored users list
  try {
    const parsed = safeJSONParse(localStorage.getItem('casematrix_users'), []);
    if (Array.isArray(parsed)) {
      parsed.forEach(u => {
        if (u && u.email && !isDeleted(u.email)) {
          const emailKey = u.email.toLowerCase().trim();
          const existing = userMap.get(emailKey) || {};
          userMap.set(emailKey, { ...existing, ...u });
        }
      });
    }
  } catch (e) {}

  // 5. Load active customer session (if currently or recently signed in!)
  try {
    const u = safeJSONParse(localStorage.getItem('casematrix_current_user'), null);
    if (u && u.email && !isDeleted(u.email)) {
      const emailKey = u.email.toLowerCase().trim();
      const existing = userMap.get(emailKey) || {};
      userMap.set(emailKey, { ...existing, ...u });
    }
  } catch (e) {}

  // 6. Load last active customer
  try {
    const u = safeJSONParse(localStorage.getItem('casematrix_last_active_customer'), null);
    if (u && u.email && !isDeleted(u.email)) {
      const emailKey = u.email.toLowerCase().trim();
      const existing = userMap.get(emailKey) || {};
      userMap.set(emailKey, { ...existing, ...u });
    }
  } catch (e) {}

  // 7. Load login history entries
  try {
    const parsed = safeJSONParse(localStorage.getItem('casematrix_customer_logins'), []);
    if (Array.isArray(parsed)) {
      parsed.forEach(s => {
        if (s && s.email && !isDeleted(s.email)) {
          const emailKey = s.email.toLowerCase().trim();
          if (!userMap.has(emailKey)) {
            userMap.set(emailKey, {
              id: s.userId || 'usr-' + Date.now(),
              name: s.name || emailKey.split('@')[0],
              email: s.email,
              phone: s.phone || '',
              role: s.role === 'admin' && s.email?.toLowerCase() === 'casematrix@gmail.com' ? 'admin' : 'user',
              createdAt: s.timestamp || new Date().toISOString(),
              lastLoginAt: s.timestamp || new Date().toISOString()
            });
          }
        }
      });
    }
  } catch (e) {}

  // 8. Load customers from Orders
  try {
    const parsed = safeJSONParse(localStorage.getItem('aura_iphone_orders'), []);
    if (Array.isArray(parsed)) {
      parsed.forEach(ord => {
        const cust = ord.customer;
        if (cust && cust.email && !isDeleted(cust.email)) {
          const emailKey = cust.email.toLowerCase().trim();
          if (!userMap.has(emailKey)) {
            userMap.set(emailKey, {
              id: 'usr-' + Date.now() + Math.random().toString(36).slice(2, 5),
              name: cust.name || emailKey.split('@')[0],
              email: cust.email,
              phone: cust.phone || '',
              role: 'user',
              createdAt: ord.createdAt || new Date().toISOString(),
              lastLoginAt: ord.createdAt || new Date().toISOString()
            });
          }
        }
      });
    }
  } catch (e) {}

  // Strict: Ensure admin credentials cannot be overridden
  userMap.set('casematrix@gmail.com', DEFAULT_ADMIN);

  const merged = Array.from(userMap.values());
  try {
    localStorage.setItem('casematrix_users', JSON.stringify(merged));
    const registeredCustomers = merged.filter(u => u.role !== 'admin');
    localStorage.setItem('casematrix_registered_customers', JSON.stringify(registeredCustomers));
  } catch (e) {}
  return merged;
};

export function AuthProvider({ children }) {
  // 1. Registered users list in LocalStorage
  const [users, setUsers] = useState(loadAllUsersFromStorage);

  // 2. Active logged-in session (with role integrity check)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = safeJSONParse(localStorage.getItem('casematrix_current_user'), null);
      if (stored) {
        // Enforce role integrity: only casematrix@gmail.com can hold admin role
        if (stored.role === 'admin' && stored.email?.toLowerCase() !== 'casematrix@gmail.com') {
          stored.role = 'user';
        }
        return stored;
      }
      return null;
    } catch (e) {
      return null;
    }
  });

  // 3. Customer Logins & Activity Log
  const [customerLogins, setCustomerLogins] = useState(() => {
    return safeJSONParse(localStorage.getItem('casematrix_customer_logins'), []);
  });

  // 4. Most Recent Active Customer Profile
  const [lastActiveCustomer, setLastActiveCustomer] = useState(() => {
    return safeJSONParse(localStorage.getItem('casematrix_last_active_customer'), null);
  });

  // 5. Auth Modal Open / Tab state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'signup' | 'admin'

  // 6. Failed Login Attempt Rate-Limiter State
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(null);

  // Sync users function to reload from all sources
  const syncUsers = () => {
    const loaded = loadAllUsersFromStorage();
    setUsers(loaded);
  };

  // Sync on mount and listen to window storage changes & focus
  useEffect(() => {
    syncUsers();

    const handleStorageChange = () => {
      syncUsers();
      try {
        const stored = safeJSONParse(localStorage.getItem('casematrix_current_user'), null);
        if (stored) {
          if (stored.role === 'admin' && stored.email?.toLowerCase() !== 'casematrix@gmail.com') {
            stored.role = 'user';
          }
          setCurrentUser(stored);
        }
      } catch (e) {}
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', syncUsers);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', syncUsers);
    };
  }, []);

  // Persist session to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('casematrix_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('casematrix_current_user');
      }
    } catch (e) {}
  }, [currentUser]);

  // Persist users list to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('casematrix_users', JSON.stringify(users));
    } catch (e) {}
  }, [users]);

  // Helper to permanently persist customer account into dedicated storage
  const persistCustomerPermanently = (user) => {
    if (!user || !user.email) return;
    const emailKey = user.email.toLowerCase().trim();
    if (user.role === 'admin' || emailKey === 'casematrix@gmail.com') return;

    try {
      let list = safeJSONParse(localStorage.getItem('casematrix_registered_customers'), []);
      if (!Array.isArray(list)) list = [];
      const withoutDup = list.filter(u => u && u.email && u.email.toLowerCase().trim() !== emailKey);
      const updated = [user, ...withoutDup];
      localStorage.setItem('casematrix_registered_customers', JSON.stringify(updated));
    } catch (e) {}

    try {
      localStorage.setItem('casematrix_last_active_customer', JSON.stringify(user));
    } catch (e) {}
  };

  // Helper to record a customer login session
  const logCustomerActivity = (user) => {
    if (!user) return;
    const isCustomer = user.role !== 'admin' && user.email?.toLowerCase() !== 'casematrix@gmail.com';
    const sessionEntry = {
      id: 'sess-' + Date.now(),
      userId: user.id || 'usr-' + Date.now(),
      name: user.name || 'Customer',
      email: user.email,
      phone: user.phone || '',
      role: user.role === 'admin' && user.email?.toLowerCase() === 'casematrix@gmail.com' ? 'admin' : 'user',
      timestamp: new Date().toISOString(),
      timeFormatted: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      dateFormatted: new Date().toLocaleDateString('en-IN')
    };

    setCustomerLogins(prev => {
      const withoutDup = prev.filter(s => s.email?.toLowerCase() !== user.email?.toLowerCase());
      const updated = [sessionEntry, ...withoutDup].slice(0, 50);
      try {
        localStorage.setItem('casematrix_customer_logins', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    if (isCustomer) {
      setLastActiveCustomer(user);
      persistCustomerPermanently(user);
    }
  };

  // Login handler with anti-brute-force rate limiting
  const login = (email, password) => {
    // Check if currently locked out
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const remainingSecs = Math.ceil((lockoutUntil - Date.now()) / 1000);
      return { 
        success: false, 
        message: `Too many failed login attempts. Please wait ${remainingSecs} seconds before retrying.` 
      };
    }

    const cleanEmail = email?.trim().toLowerCase() || '';
    const normalizedEmail = cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@gmail.com`;
    const cleanPass = password?.trim() || '';

    if (!cleanEmail || !cleanPass) {
      return { success: false, message: 'Please enter both email and password' };
    }

    // Check dedicated admin login casematrix@gmail.com / casematrix
    if (cleanEmail === 'casematrix@gmail.com' || cleanEmail === 'casematrix') {
      if (cleanPass === 'casematrix') {
        const adminUser = {
          id: 'usr-admin-01',
          name: 'Case Matrix Admin',
          email: 'casematrix@gmail.com',
          role: 'admin',
          phone: '+91 93846 94189',
          createdAt: '2026-01-01T00:00:00.000Z',
          lastLoginAt: new Date().toISOString()
        };
        // Reset failed attempts on success
        setFailedAttempts(0);
        setLockoutUntil(null);

        const allLoaded = loadAllUsersFromStorage();
        const withoutAdmin = allLoaded.filter(u => u.email?.toLowerCase() !== 'casematrix@gmail.com');
        const updatedUsers = [adminUser, ...withoutAdmin];
        setUsers(updatedUsers);
        setCurrentUser(adminUser);
        try {
          localStorage.setItem('casematrix_users', JSON.stringify(updatedUsers));
          localStorage.setItem('casematrix_current_user', JSON.stringify(adminUser));
        } catch (e) {}
        setIsAuthModalOpen(false);
        return { success: true, user: adminUser };
      } else {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        if (newAttempts >= 5) {
          setLockoutUntil(Date.now() + 30000); // 30 second cooldown
          return { success: false, message: 'Too many failed attempts. Security lockout active for 30 seconds.' };
        }
        return { success: false, message: `Incorrect admin password. (${5 - newAttempts} attempts remaining)` };
      }
    }

    // Check if user exists in local storage list
    let matchedUser = users.find(
      (u) => u.email?.toLowerCase() === cleanEmail || u.email?.toLowerCase() === normalizedEmail || u.name?.toLowerCase() === cleanEmail
    );

    if (matchedUser) {
      // Existing user: check password if one was set
      if (matchedUser.password && matchedUser.password !== cleanPass) {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        if (newAttempts >= 5) {
          setLockoutUntil(Date.now() + 30000);
          return { success: false, message: 'Too many failed attempts. Account temporarily locked for 30 seconds.' };
        }
        return { success: false, message: 'Incorrect password. Please try again.' };
      }

      setFailedAttempts(0);
      setLockoutUntil(null);

      matchedUser = {
        ...matchedUser,
        role: matchedUser.email?.toLowerCase() === 'casematrix@gmail.com' ? 'admin' : 'user',
        lastLoginAt: new Date().toISOString()
      };
      const updatedUsers = users.map(u => u.id === matchedUser.id ? matchedUser : u);
      setUsers(updatedUsers);
      setCurrentUser(matchedUser);
      logCustomerActivity(matchedUser);
      persistCustomerPermanently(matchedUser);
      try {
        localStorage.setItem('casematrix_users', JSON.stringify(updatedUsers));
        localStorage.setItem('casematrix_current_user', JSON.stringify(matchedUser));
      } catch (e) {}
      setIsAuthModalOpen(false);
      return { success: true, user: matchedUser };
    } else {
      // New user auto-registered on first sign in
      setFailedAttempts(0);
      setLockoutUntil(null);

      const finalEmail = cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@gmail.com`;
      const namePart = cleanEmail.split('@')[0].replace(/[._-]/g, ' ');
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      
      matchedUser = {
        id: 'usr-' + Date.now(),
        name: formattedName || 'Customer',
        email: finalEmail,
        password: cleanPass,
        phone: '',
        role: finalEmail === 'casematrix@gmail.com' ? 'admin' : 'user',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };
      const updatedUsers = [matchedUser, ...users];
      setUsers(updatedUsers);
      setCurrentUser(matchedUser);
      logCustomerActivity(matchedUser);
      persistCustomerPermanently(matchedUser);
      try {
        localStorage.setItem('casematrix_users', JSON.stringify(updatedUsers));
        localStorage.setItem('casematrix_current_user', JSON.stringify(matchedUser));
      } catch (e) {}
      setIsAuthModalOpen(false);
      return { success: true, user: matchedUser };
    }
  };

  // Sign Up handler with input validation and security checks
  const signup = (userData) => {
    let cleanEmail = userData.email?.trim().toLowerCase() || '';
    if (cleanEmail && !cleanEmail.includes('@')) {
      cleanEmail = `${cleanEmail}@gmail.com`;
    }
    const cleanPass = userData.password?.trim() || '123456';
    const cleanName = userData.name?.trim() || cleanEmail.split('@')[0];
    const cleanPhone = userData.phone?.trim() || '';

    if (!cleanEmail) {
      return { success: false, message: 'Email address is required' };
    }

    const passCheck = validatePassword(cleanPass);
    if (!passCheck.valid) {
      return { success: false, message: passCheck.message };
    }

    // Check if email already exists
    const existing = users.find((u) => u.email?.toLowerCase() === cleanEmail);
    if (existing) {
      const updated = {
        ...existing,
        name: cleanName || existing.name,
        phone: cleanPhone || existing.phone,
        password: cleanPass,
        role: existing.email?.toLowerCase() === 'casematrix@gmail.com' ? 'admin' : 'user',
        lastLoginAt: new Date().toISOString()
      };
      const updatedUsers = users.map(u => u.id === existing.id ? updated : u);
      setUsers(updatedUsers);
      setCurrentUser(updated);
      logCustomerActivity(updated);
      persistCustomerPermanently(updated);
      try {
        localStorage.setItem('casematrix_users', JSON.stringify(updatedUsers));
        localStorage.setItem('casematrix_current_user', JSON.stringify(updated));
      } catch (e) {}
      setIsAuthModalOpen(false);
      return { success: true, user: updated };
    }

    // Strict: Only exact casematrix@gmail.com can ever be assigned admin role
    const isExactAdminEmail = cleanEmail === 'casematrix@gmail.com';

    const newUser = {
      id: 'usr-' + Date.now(),
      name: cleanName || 'Customer',
      email: cleanEmail,
      password: cleanPass,
      phone: cleanPhone,
      role: isExactAdminEmail ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    const updatedUsers = [newUser, ...users.filter(u => u.email?.toLowerCase() !== cleanEmail)];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    logCustomerActivity(newUser);
    persistCustomerPermanently(newUser);
    try {
      localStorage.setItem('casematrix_users', JSON.stringify(updatedUsers));
      localStorage.setItem('casematrix_current_user', JSON.stringify(newUser));
    } catch (e) {}
    setIsAuthModalOpen(false);

    return { success: true, user: newUser };
  };

  // Record customer from checkout
  const recordCustomerFromCheckout = (customerData) => {
    if (!customerData?.email) return;
    const cleanEmail = customerData.email.trim().toLowerCase();
    let customerObj = null;
    setUsers(prev => {
      const existing = prev.find(u => u.email?.toLowerCase() === cleanEmail);
      let updated;
      if (existing) {
        customerObj = {
          ...existing,
          name: customerData.name || existing.name,
          phone: customerData.phone || existing.phone,
          lastActiveAt: new Date().toISOString()
        };
        updated = prev.map(u => u.id === existing.id ? customerObj : u);
      } else {
        customerObj = {
          id: 'usr-' + Date.now(),
          name: customerData.name || 'Customer',
          email: cleanEmail,
          phone: customerData.phone || '',
          role: 'user',
          createdAt: new Date().toISOString(),
          lastActiveAt: new Date().toISOString()
        };
        updated = [customerObj, ...prev];
      }

      try {
        localStorage.setItem('casematrix_users', JSON.stringify(updated));
        localStorage.setItem('casematrix_registered_customers', JSON.stringify(updated.filter(u => u.role !== 'admin')));
      } catch (e) {}

      try {
        window.dispatchEvent(new Event('casematrix_users_updated'));
        window.dispatchEvent(new Event('storage'));
      } catch (e) {}

      return updated;
    });

    if (customerObj) {
      logCustomerActivity(customerObj);
    }
  };

  // Create user (Admin operation)
  const createUser = (userData) => {
    const newUser = {
      id: 'usr-' + Date.now() + Math.random().toString(36).slice(2, 5),
      createdAt: new Date().toISOString(),
      role: userData.role || 'user',
      name: userData.name?.trim() || 'New Customer',
      email: userData.email?.toLowerCase().trim(),
      phone: userData.phone?.trim() || '',
      password: userData.password || 'welcome123'
    };

    setUsers(prev => {
      const filtered = prev.filter(u => u.email?.toLowerCase().trim() !== newUser.email);
      const updated = [newUser, ...filtered];
      try {
        localStorage.setItem('casematrix_users', JSON.stringify(updated));
        localStorage.setItem('casematrix_registered_customers', JSON.stringify(updated.filter(u => u.role !== 'admin')));
      } catch (e) {}
      return updated;
    });

    return newUser;
  };

  // Update user (Admin operation)
  const updateUser = (userId, updatedFields) => {
    setUsers(prev => {
      const updated = prev.map(u => (u.id === userId ? { ...u, ...updatedFields } : u));
      try {
        localStorage.setItem('casematrix_users', JSON.stringify(updated));
        localStorage.setItem('casematrix_registered_customers', JSON.stringify(updated.filter(u => u.role !== 'admin')));
      } catch (e) {}
      return updated;
    });
  };

  // Delete user by ID
  const deleteUser = (userId) => {
    setUsers(prev => {
      const userToDelete = prev.find(u => u.id === userId);
      const updated = prev.filter(u => u.id !== userId);

      try {
        localStorage.setItem('casematrix_users', JSON.stringify(updated));
        localStorage.setItem('casematrix_registered_customers', JSON.stringify(updated.filter(u => u.role !== 'admin')));
        
        if (userToDelete?.email) {
          const email = userToDelete.email.toLowerCase().trim();
          let deleted = [];
          try {
            const raw = localStorage.getItem('casematrix_deleted_user_emails');
            if (raw) deleted = JSON.parse(raw);
          } catch (e) {}
          if (!deleted.includes(email)) {
            deleted.push(email);
            localStorage.setItem('casematrix_deleted_user_emails', JSON.stringify(deleted));
          }
        }
      } catch (e) {}

      return updated;
    });
  };

  // Clear all customers (except default admin)
  const clearAllCustomers = () => {
    setUsers([DEFAULT_ADMIN]);
    try {
      localStorage.setItem('casematrix_users', JSON.stringify([DEFAULT_ADMIN]));
      localStorage.setItem('casematrix_registered_customers', JSON.stringify([]));
      localStorage.removeItem('casematrix_customer_logins');
      localStorage.removeItem('casematrix_last_active_customer');
    } catch (e) {}
  };

  // Clear customer logins log
  const clearCustomerLogins = () => {
    setCustomerLogins([]);
    try {
      localStorage.removeItem('casematrix_customer_logins');
    } catch (e) {}
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('casematrix_current_user');
    } catch (e) {}
  };

  // 1-Click Demo Logins
  const loginAsDemoAdmin = () => {
    const admin = {
      ...DEFAULT_ADMIN,
      lastLoginAt: new Date().toISOString()
    };
    setCurrentUser(admin);
    try {
      localStorage.setItem('casematrix_current_user', JSON.stringify(admin));
    } catch (e) {}
    setIsAuthModalOpen(false);
  };

  const loginAsDemoUser = () => {
    const user = {
      ...DEFAULT_USER,
      lastLoginAt: new Date().toISOString()
    };
    setCurrentUser(user);
    logCustomerActivity(user);
    try {
      localStorage.setItem('casematrix_current_user', JSON.stringify(user));
    } catch (e) {}
    setIsAuthModalOpen(false);
  };

  const openAuthModal = (tab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        customerLogins,
        lastActiveCustomer,
        clearCustomerLogins,
        isAuthenticated,
        isAdmin,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        login,
        signup,
        logout,
        createUser,
        updateUser,
        deleteUser,
        clearAllCustomers,
        syncUsers,
        recordCustomerFromCheckout,
        loginAsDemoAdmin,
        loginAsDemoUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
