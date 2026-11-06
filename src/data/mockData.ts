import { LostFoundItem, SchoolZone } from '../types';

export const SCHOOL_ZONES: SchoolZone[] = [
  {
    id: 'library',
    name: 'Library & Media Center',
    building: 'Main Academic Wing - 1st Floor',
    description: 'Study desks, computer terminals, reading tables',
    custodyDesk: 'Librarian Circulation Counter (Bin #1A to #1E)',
    iconName: 'BookOpen'
  },
  {
    id: 'cafeteria',
    name: 'Central Cafeteria & Dining Hall',
    building: 'Student Center - Ground Floor',
    description: 'Lunch tables, wash stations, tray return points',
    custodyDesk: 'Cafeteria Manager Office (Bin #2A to #2C)',
    iconName: 'Utensils'
  },
  {
    id: 'science_wing',
    name: 'Science & Computer Labs',
    building: 'Science Complex - 2nd Floor',
    description: 'Physics, Chemistry, Biology & Coding Labs',
    custodyDesk: 'Lab Assistant Cabin Room 204 (Bin #3A)',
    iconName: 'FlaskConical'
  },
  {
    id: 'gym_ground',
    name: 'Sports Complex & Football Turf',
    building: 'Athletic Pavilion',
    description: 'Changing rooms, basketball court, athletic tracks',
    custodyDesk: 'Physical Education Office (Bin #4A to #4D)',
    iconName: 'Trophy'
  },
  {
    id: 'hallways',
    name: 'Classrooms & Lockers (Grades 6-12)',
    building: 'North & South Corridors',
    description: 'Classrooms, locker rows, water coolers',
    custodyDesk: 'Floor Supervisor Desk (Bin #5A)',
    iconName: 'Layers'
  },
  {
    id: 'auditorium',
    name: 'Main Auditorium & Music Room',
    building: 'Performing Arts Block',
    description: 'Seating rows, backstage, practice rooms',
    custodyDesk: 'Arts Faculty Room (Bin #6A)',
    iconName: 'Mic'
  },
  {
    id: 'bus_bay',
    name: 'Bus Bay & Parking Gate',
    building: 'School Main Gate',
    description: 'Bus boarding lines, cycle stand, guard post',
    custodyDesk: 'Main Security Office (Gate 1)',
    iconName: 'Bus'
  }
];

export const INITIAL_ITEMS: LostFoundItem[] = [
  {
    id: 'ITEM-1001',
    title: 'Casio fx-991EX Scientific Calculator',
    category: 'Electronics & Gadgets',
    type: 'found',
    status: 'in_custody',
    description: 'Found under desk #14 in Physics Lab 2 after the 4th period. Has a small solar strip and faint initials on the hard cover.',
    locationFound: 'Science & Computer Labs',
    dateReported: '2026-10-06T11:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80',
    reportedBy: {
      name: 'Lab Assistant Verma',
      rollNumber: 'STAFF-88',
      grade: 'Faculty',
      role: 'teacher'
    },
    custodyBin: 'Bin #3A (Science Lab Assistant Cabin)',
    verificationQuestion: 'What are the two letters scratched onto the inside of the black sliding cover?',
    isImportant: true,
    claims: []
  },
  {
    id: 'ITEM-1002',
    title: 'Navy Blue School Uniform Blazer (Size 38)',
    category: 'Clothing & Uniform',
    type: 'found',
    status: 'available',
    description: 'Left on the wooden bench outside the Library entrance. Embroidered with school crest. Name tag is partially scratched.',
    locationFound: 'Library & Media Center',
    dateReported: '2026-10-06T14:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80',
    reportedBy: {
      name: 'Rohan Sharma',
      rollNumber: '10-B-24',
      grade: 'Grade 10-B',
      role: 'student'
    },
    custodyBin: 'Bin #1B (Library Front Desk)',
    verificationQuestion: 'What is inside the right inner pocket, and what grade number is written on the tag?',
    claims: [
      {
        id: 'CLM-501',
        claimantName: 'Kavya Sen',
        rollNumber: '10-B-11',
        grade: 'Grade 10-B',
        contactEmail: 'kavya.sen@student.school.edu',
        answerVerification: 'Has my spare house key and my library card inside the inner pocket.',
        status: 'pending',
        submittedAt: '2026-10-06T16:00:00Z',
        tokenCode: 'VERIFY-8472'
      }
    ]
  },
  {
    id: 'ITEM-1003',
    title: 'Stainless Steel Insulated Water Bottle (Olive Green)',
    category: 'Bottles & Lunchboxes',
    type: 'found',
    status: 'in_custody',
    description: 'Olive green 750ml flask with stickers (NASA logo and an anime sticker). Found on the steps of the basketball court.',
    locationFound: 'Sports Complex & Football Turf',
    dateReported: '2026-10-05T16:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
    reportedBy: {
      name: 'Coach David',
      rollNumber: 'STAFF-PE-03',
      grade: 'Faculty',
      role: 'teacher'
    },
    custodyBin: 'Bin #4B (Physical Education Office)',
    verificationQuestion: 'Which anime character is on the second sticker next to the NASA logo?',
    claims: []
  },
  {
    id: 'ITEM-1004',
    title: 'Student Smart ID Card & Lanyard',
    category: 'Student IDs & Cards',
    type: 'found',
    status: 'in_custody',
    description: 'Official school barcode smart ID card attached to blue school lanyard. Found near the cafeteria juice counter.',
    locationFound: 'Central Cafeteria & Dining Hall',
    dateReported: '2026-10-07T08:10:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    reportedBy: {
      name: 'Cafeteria Desk',
      rollNumber: 'STAFF-CAF-01',
      grade: 'Staff',
      role: 'security_staff'
    },
    custodyBin: 'Bin #2A (Cafeteria Manager Office)',
    verificationQuestion: 'Confirm student name and admission roll number on the card.',
    isImportant: true,
    claims: []
  },
  {
    id: 'ITEM-1005',
    title: 'Parker Jotter Ballpoint Pen & Metal Geometry Box',
    category: 'Books & Stationery',
    type: 'found',
    status: 'available',
    description: 'Silver metallic pencil box with divider, compass, and an engraved steel Parker pen left behind in Hall 301.',
    locationFound: 'Classrooms & Lockers (Grades 6-12)',
    dateReported: '2026-10-04T13:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80',
    reportedBy: {
      name: 'Terminal Kiosk #2',
      rollNumber: 'KIOSK-02',
      grade: 'Student Self-Service',
      role: 'kiosk_terminal'
    },
    custodyBin: 'Bin #5A (Floor 3 Supervisor)',
    verificationQuestion: 'What color ink does the Parker pen write in, and is the ruler plastic or metal?',
    claims: []
  },
  {
    id: 'ITEM-1006',
    title: 'Lost: Wireframe Spectacles in Matte Black Case',
    category: 'Other Accessories',
    type: 'lost',
    status: 'available',
    description: 'Looking for my prescription reading glasses with thin silver wireframe. Probably dropped between Room 102 and the Art Room.',
    locationFound: 'Main Auditorium & Music Room',
    dateReported: '2026-10-06T09:10:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&auto=format&fit=crop&q=80',
    reportedBy: {
      name: 'Aarav Patel',
      rollNumber: '09-C-18',
      grade: 'Grade 9-C',
      role: 'student'
    },
    claims: []
  },
  {
    id: 'ITEM-1007',
    title: 'House Keyring with Red Swiss Army Knife & Sonic Keychain',
    category: 'Keys, Bags & Wallets',
    type: 'found',
    status: 'in_custody',
    description: 'Three brass keys on a ring with a small blue character rubber keychain and a mini multitool. Found near Bus #12 bay.',
    locationFound: 'Bus Bay & Parking Gate',
    dateReported: '2026-10-05T15:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&auto=format&fit=crop&q=80',
    reportedBy: {
      name: 'Gate 1 Security Officer',
      rollNumber: 'SEC-04',
      grade: 'Security Team',
      role: 'security_staff'
    },
    custodyBin: 'Bin #7 (Main Gate Security Booth)',
    verificationQuestion: 'Describe the third smaller silver key shape or any markings.',
    claims: []
  },
  {
    id: 'ITEM-1008',
    title: 'Nike Black Gym Drawstring Bag with Cleats',
    category: 'Sports Equipment',
    type: 'found',
    status: 'handed_over',
    description: 'Black bag containing size 9 football boots and shin guards left in the visiting team locker room.',
    locationFound: 'Sports Complex & Football Turf',
    dateReported: '2026-10-03T17:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    reportedBy: {
      name: 'Coach David',
      rollNumber: 'STAFF-PE-03',
      grade: 'Faculty',
      role: 'teacher'
    },
    custodyBin: 'Claimed and handed over to owner',
    verificationQuestion: 'What brand are the shin guards?',
    claims: [
      {
        id: 'CLM-492',
        claimantName: 'Sameer Khan',
        rollNumber: '11-A-07',
        grade: 'Grade 11-A',
        contactEmail: 'sameer.k@student.school.edu',
        answerVerification: 'Shin guards are Adidas ghost club edition, cleats have blue laces.',
        status: 'approved',
        submittedAt: '2026-10-04T09:30:00Z',
        tokenCode: 'VERIFY-1903'
      }
    ]
  }
];

export const STUDENTS_LIST: import('../types').StudentInfo[] = [
  {
    id: 'STU-1001',
    name: 'SHASHANK JANGID',
    admissionNo: 'DPSI/2026/4102',
    grade: 'Class X',
    section: 'B',
    rollNumber: '24',
    house: 'Ganga House',
    attendance: '96.4%',
    walletBalance: 1450,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    parentName: 'Mr. Rajesh Jangid'
  },
  {
    id: 'STU-1002',
    name: 'AARAV SHARMA',
    admissionNo: 'DPSI/2026/4089',
    grade: 'Class X',
    section: 'B',
    rollNumber: '03',
    house: 'Yamuna House',
    attendance: '94.2%',
    walletBalance: 820,
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    parentName: 'Dr. Vivek Sharma'
  },
  {
    id: 'STU-1003',
    name: 'ANANYA VERMA',
    admissionNo: 'DPSI/2026/4105',
    grade: 'Class X',
    section: 'B',
    rollNumber: '08',
    house: 'Kaveri House',
    attendance: '98.0%',
    walletBalance: 1200,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    parentName: 'Mrs. Neha Verma'
  },
  {
    id: 'STU-1004',
    name: 'ROHAN KULKARNI',
    admissionNo: 'DPSI/2026/4112',
    grade: 'Class X',
    section: 'B',
    rollNumber: '15',
    house: 'Jhelum House',
    attendance: '91.8%',
    walletBalance: 650,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    parentName: 'Mr. Amit Kulkarni'
  },
  {
    id: 'STU-1005',
    name: 'KAVYA SEN',
    admissionNo: 'DPSI/2026/4118',
    grade: 'Class X',
    section: 'B',
    rollNumber: '18',
    house: 'Ganga House',
    attendance: '95.6%',
    walletBalance: 1850,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    parentName: 'Mr. Sourav Sen'
  },
  {
    id: 'STU-1006',
    name: 'ISHAN MALHOTRA',
    admissionNo: 'DPSI/2026/4125',
    grade: 'Class X',
    section: 'B',
    rollNumber: '22',
    house: 'Chenab House',
    attendance: '93.5%',
    walletBalance: 940,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    parentName: 'Col. R. Malhotra'
  },
  {
    id: 'STU-1007',
    name: 'RIYA DESHMUKH',
    admissionNo: 'DPSI/2026/4130',
    grade: 'Class X',
    section: 'B',
    rollNumber: '27',
    house: 'Yamuna House',
    attendance: '97.1%',
    walletBalance: 1100,
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    parentName: 'Mrs. Priya Deshmukh'
  }
];

export const INITIAL_WALLET_TRANSACTIONS: import('../types').WalletTransaction[] = [

  {
    id: 'TXN-9021',
    type: 'purchase',
    title: 'Veg Club Sandwich & Fresh Lime Water',
    amount: 65,
    date: '2026-10-08T13:10:00Z',
    status: 'completed',
    method: 'Student Smart ID RFID Tap',
    referenceId: 'POS-CAF-04-88',
    balanceAfter: 1450
  },
  {
    id: 'TXN-9020',
    type: 'topup',
    title: 'Parent Wallet Recharge (Google Pay UPI)',
    amount: 1000,
    date: '2026-10-07T09:24:00Z',
    status: 'completed',
    method: 'UPI / HDFC-***4920',
    referenceId: 'UPI-938201948',
    balanceAfter: 1515
  },
  {
    id: 'TXN-9019',
    type: 'purchase',
    title: 'Warm Milk & Multigrain Digestive Snack',
    amount: 45,
    date: '2026-10-06T10:45:00Z',
    status: 'completed',
    method: 'Student Smart ID RFID Tap',
    referenceId: 'POS-CAF-01-12',
    balanceAfter: 515
  },
  {
    id: 'TXN-9018',
    type: 'topup',
    title: 'Parent Wallet Recharge (NetBanking)',
    amount: 500,
    date: '2026-10-01T14:15:00Z',
    status: 'completed',
    method: 'SBI NetBanking',
    referenceId: 'NETB-8839201',
    balanceAfter: 560
  }
];

export const CAFETERIA_MENU: import('../types').MenuItem[] = [
  {
    id: 'MENU-1',
    name: 'Grilled Whole Wheat Veg Sandwich',
    category: 'Snacks',
    price: 55,
    calories: 220,
    dietary: 'Veg',
    available: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'MENU-2',
    name: 'Steamed Mini Idlis with Sambar & Chutney',
    category: 'Meals',
    price: 50,
    calories: 180,
    dietary: 'Veg',
    available: true,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'MENU-3',
    name: 'Rajma Chawal Nutri-Bowl (Protein Rich)',
    category: 'Meals',
    price: 80,
    calories: 340,
    dietary: 'Veg',
    available: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'MENU-4',
    name: 'Seasonal Fresh Fruit Salad Bowl',
    category: 'Healthy',
    price: 45,
    calories: 110,
    dietary: 'Vegan',
    available: true,
    image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'MENU-5',
    name: 'Amul Kesar Badam Milk (Cold)',
    category: 'Beverages',
    price: 35,
    calories: 140,
    dietary: 'Contains Dairy',
    available: true,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'MENU-6',
    name: 'Freshly Squeezed Sweet Lime (Mosambi)',
    category: 'Beverages',
    price: 40,
    calories: 90,
    dietary: 'Vegan',
    available: true,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=80'
  }
];

