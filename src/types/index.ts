export type ItemCategory = 
  | 'Books & Stationery'
  | 'Electronics & Gadgets'
  | 'Clothing & Uniform'
  | 'Bottles & Lunchboxes'
  | 'Student IDs & Cards'
  | 'Sports Equipment'
  | 'Keys, Bags & Wallets'
  | 'Other Accessories';

export type ItemType = 'found' | 'lost';

export type ItemStatus = 'available' | 'claimed' | 'in_custody' | 'handed_over';

export interface ClaimRequest {
  id: string;
  claimantName: string;
  rollNumber: string;
  grade: string;
  contactEmail: string;
  answerVerification: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  tokenCode: string;
}

export interface LostFoundItem {
  id: string;
  title: string;
  category: ItemCategory;
  type: ItemType;
  status: ItemStatus;
  description: string;
  locationFound: string;
  dateReported: string;
  imageUrl: string;
  reportedBy: {
    name: string;
    rollNumber: string;
    grade: string;
    role: 'student' | 'teacher' | 'security_staff' | 'kiosk_terminal';
  };
  custodyBin?: string; // e.g., "Bin #3B - Library Lost Property Box"
  verificationQuestion?: string; // e.g., "What color is the inside lining or any sticker marks?"
  claims: ClaimRequest[];
  isImportant?: boolean;
}

export type ViewMode = 'portal' | 'kiosk' | 'staff' | 'lms_embed';

export interface StudentInfo {
  id: string;
  name: string;
  admissionNo: string;
  grade: string;
  section: string;
  rollNumber: string;
  house: string;
  attendance: string;
  walletBalance: number;
  avatarUrl: string;
  parentName: string;
}

export interface SchoolZone {

  id: string;
  name: string;
  building: string;
  description: string;
  custodyDesk: string;
  iconName: string;
}

export interface WalletTransaction {
  id: string;
  type: 'topup' | 'purchase';
  title: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
  method?: string; // UPI, NetBanking, Card, RFID Scan
  referenceId: string;
  balanceAfter: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Snacks' | 'Meals' | 'Beverages' | 'Healthy';
  price: number;
  calories: number;
  dietary: 'Veg' | 'Contains Dairy' | 'Gluten Free' | 'Vegan';
  available: boolean;
  image: string;
}

export type LmsNavigationTab = 
  | 'dashboard'
  | 'communications'
  | 'estate'
  | 'events'
  | 'examinations'
  | 'hr'
  | 'library'
  | 'payroll'
  | 'reports'
  | 'gallery'
  | 'students'
  | 'cafeteria_wallet'
  | 'lost_found';

