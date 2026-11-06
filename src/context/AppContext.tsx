import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  LostFoundItem, 
  ClaimRequest, 
  SchoolZone, 
  ViewMode, 
  ItemStatus, 
  WalletTransaction, 
  MenuItem, 
  LmsNavigationTab 
} from '../types';
import { INITIAL_ITEMS, SCHOOL_ZONES, INITIAL_WALLET_TRANSACTIONS } from '../data/mockData';

interface FilterState {
  search: string;
  category: string;
  type: 'all' | 'found' | 'lost';
  status: 'all' | 'available' | 'in_custody' | 'handed_over';
  location: string;
}

interface AppContextType {
  // Lost & Found items & zones
  items: LostFoundItem[];
  zones: SchoolZone[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  addItem: (itemData: Omit<LostFoundItem, 'id' | 'dateReported' | 'claims' | 'status'> & { status?: ItemStatus }) => LostFoundItem;
  submitClaim: (itemId: string, claim: { claimantName: string; rollNumber: string; grade: string; contactEmail: string; answerVerification: string }) => ClaimRequest;
  updateClaimStatus: (itemId: string, claimId: string, status: 'approved' | 'rejected') => void;
  updateItemCustody: (itemId: string, bin: string, status: ItemStatus) => void;
  deleteItem: (itemId: string) => void;
  resetToDefaults: () => void;
  selectedItem: LostFoundItem | null;
  setSelectedItem: (item: LostFoundItem | null) => void;
  activeClaimPass: { claim: ClaimRequest; item: LostFoundItem } | null;
  setActiveClaimPass: (pass: { claim: ClaimRequest; item: LostFoundItem } | null) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  isMapModalOpen: boolean;
  setIsMapModalOpen: (open: boolean) => void;
  defaultReportType: 'found' | 'lost';
  setDefaultReportType: (t: 'found' | 'lost') => void;

  // DPSI LMS Navigation & Student Login State
  currentLmsTab: LmsNavigationTab;
  setCurrentLmsTab: (tab: LmsNavigationTab) => void;
  userRole: 'student' | 'coordinator';
  setUserRole: (role: 'student' | 'coordinator') => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;

  // Cafeteria & Parent Wallet Top-up
  walletBalance: number;
  walletTransactions: WalletTransaction[];
  dailySpendingLimit: number;
  setDailySpendingLimit: (limit: number) => void;
  topUpWallet: (amount: number, method: string, note?: string) => void;
  purchaseMeal: (item: MenuItem) => boolean;
  isParentTopUpModalOpen: boolean;
  setIsParentTopUpModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'campusfound_items_v2';
const WALLET_KEY = 'dpsi_wallet_balance_v1';
const TXN_KEY = 'dpsi_wallet_txns_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<LostFoundItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse cached items', e);
    }
    return INITIAL_ITEMS;
  });

  const [viewMode, setViewMode] = useState<ViewMode>('portal');
  const [selectedItem, setSelectedItem] = useState<LostFoundItem | null>(null);
  const [activeClaimPass, setActiveClaimPass] = useState<{ claim: ClaimRequest; item: LostFoundItem } | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [defaultReportType, setDefaultReportType] = useState<'found' | 'lost'>('found');

  // LMS DPSI State
  const [currentLmsTab, setCurrentLmsTab] = useState<LmsNavigationTab>('dashboard');
  const [userRole, setUserRole] = useState<'student' | 'coordinator'>('student');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Cafeteria Wallet State
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(WALLET_KEY);
      if (saved) return parseFloat(saved);
    } catch (e) {
      console.error(e);
    }
    return 1450;
  });

  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(TXN_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_WALLET_TRANSACTIONS;
  });

  const [dailySpendingLimit, setDailySpendingLimit] = useState(200);
  const [isParentTopUpModalOpen, setIsParentTopUpModalOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    type: 'all',
    status: 'all',
    location: 'all'
  });

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(WALLET_KEY, walletBalance.toString());
      localStorage.setItem(TXN_KEY, JSON.stringify(walletTransactions));
    } catch (e) {
      console.error(e);
    }
  }, [walletBalance, walletTransactions]);

  const topUpWallet = (amount: number, method: string, note?: string) => {
    const newBalance = walletBalance + amount;
    const newTxn: WalletTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'topup',
      title: note || `Parent Online Top-Up (${method})`,
      amount,
      date: new Date().toISOString(),
      status: 'completed',
      method,
      referenceId: `REF-${Math.floor(10000000 + Math.random() * 90000000)}`,
      balanceAfter: newBalance
    };

    setWalletBalance(newBalance);
    setWalletTransactions(prev => [newTxn, ...prev]);
  };

  const purchaseMeal = (item: MenuItem): boolean => {
    if (walletBalance < item.price) {
      alert(`Insufficient cafeteria wallet balance! Current balance: ₹${walletBalance}. Please request parents to top up.`);
      return false;
    }

    const newBalance = walletBalance - item.price;
    const newTxn: WalletTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'purchase',
      title: `${item.name} (${item.category})`,
      amount: item.price,
      date: new Date().toISOString(),
      status: 'completed',
      method: 'Student Smart ID RFID Tap',
      referenceId: `POS-CAF-COUNTER-${Math.floor(10 + Math.random() * 90)}`,
      balanceAfter: newBalance
    };

    setWalletBalance(newBalance);
    setWalletTransactions(prev => [newTxn, ...prev]);
    return true;
  };

  const addItem = (itemData: Omit<LostFoundItem, 'id' | 'dateReported' | 'claims' | 'status'> & { status?: ItemStatus }): LostFoundItem => {
    const newItem: LostFoundItem = {
      ...itemData,
      id: `ITEM-${Math.floor(1000 + Math.random() * 9000)}`,
      dateReported: new Date().toISOString(),
      status: itemData.status || (itemData.type === 'found' ? 'in_custody' : 'available'),
      claims: []
    };

    setItems(prev => [newItem, ...prev]);
    return newItem;
  };

  const submitClaim = (itemId: string, claimData: { claimantName: string; rollNumber: string; grade: string; contactEmail: string; answerVerification: string }): ClaimRequest => {
    const newClaim: ClaimRequest = {
      id: `CLM-${Math.floor(100 + Math.random() * 900)}`,
      ...claimData,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      tokenCode: `VERIFY-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const updated = {
          ...item,
          claims: [newClaim, ...item.claims]
        };
        if (selectedItem?.id === itemId) {
          setSelectedItem(updated);
        }
        return updated;
      }
      return item;
    }));

    return newClaim;
  };

  const updateClaimStatus = (itemId: string, claimId: string, status: 'approved' | 'rejected') => {
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const updatedClaims = item.claims.map(c => c.id === claimId ? { ...c, status } : c);
        const itemStatus: ItemStatus = status === 'approved' ? 'handed_over' : item.status;
        const updated = {
          ...item,
          status: itemStatus,
          claims: updatedClaims
        };
        if (selectedItem?.id === itemId) {
          setSelectedItem(updated);
        }
        return updated;
      }
      return item;
    }));
  };

  const updateItemCustody = (itemId: string, bin: string, status: ItemStatus) => {
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const updated = {
          ...item,
          custodyBin: bin,
          status
        };
        if (selectedItem?.id === itemId) {
          setSelectedItem(updated);
        }
        return updated;
      }
      return item;
    }));
  };

  const deleteItem = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
    if (selectedItem?.id === itemId) {
      setSelectedItem(null);
    }
  };

  const resetToDefaults = () => {
    setItems(INITIAL_ITEMS);
    setWalletBalance(1450);
    setWalletTransactions(INITIAL_WALLET_TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(WALLET_KEY);
    localStorage.removeItem(TXN_KEY);
    if (selectedItem) setSelectedItem(null);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        zones: SCHOOL_ZONES,
        viewMode,
        setViewMode,
        filters,
        setFilters,
        addItem,
        submitClaim,
        updateClaimStatus,
        updateItemCustody,
        deleteItem,
        resetToDefaults,
        selectedItem,
        setSelectedItem,
        activeClaimPass,
        setActiveClaimPass,
        isReportModalOpen,
        setIsReportModalOpen,
        isMapModalOpen,
        setIsMapModalOpen,
        defaultReportType,
        setDefaultReportType,

        currentLmsTab,
        setCurrentLmsTab,
        userRole,
        setUserRole,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isProfileModalOpen,
        setIsProfileModalOpen,

        walletBalance,
        walletTransactions,
        dailySpendingLimit,
        setDailySpendingLimit,
        topUpWallet,
        purchaseMeal,
        isParentTopUpModalOpen,
        setIsParentTopUpModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
