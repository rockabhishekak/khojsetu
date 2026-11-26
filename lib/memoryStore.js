// Fallback in-memory store for Vercel if MongoDB Atlas is not yet configured
let memoryItems = [
  {
    _id: '6743b1a20101010101010101',
    title: 'Black HP Laptop 15-inch',
    type: 'LOST',
    category: 'Electronics',
    description: 'HP Pavilion 15 inch laptop, black color, has a sticker of mountains on the lid. Contains important college project files.',
    primaryColor: 'Black',
    state: 'Delhi',
    city: 'New Delhi',
    specificLocation: 'Platform 3, New Delhi Railway Station',
    incidentDate: '2026-11-20T00:00:00.000Z',
    contactName: 'Rahul Sharma',
    contactPhone: '9876543210',
    contactEmail: 'rahul.sharma@email.com',
    status: 'OPEN',
    reward: 'Rs. 2000 reward',
    createdAt: new Date('2026-11-20T10:00:00.000Z'),
  },
  {
    _id: '6743b1a20101010101010102',
    title: 'Blue Leather Wallet',
    type: 'LOST',
    category: 'Wallets & Purses',
    description: 'Blue genuine leather wallet with Aadhar card, PAN card, Rs. 1500 cash and an SBI ATM card inside.',
    primaryColor: 'Blue',
    state: 'Maharashtra',
    city: 'Mumbai',
    specificLocation: 'Dadar Metro Station, Exit Gate 2',
    incidentDate: '2026-11-18T00:00:00.000Z',
    contactName: 'Priya Patel',
    contactPhone: '9123456789',
    contactEmail: 'priya.patel@email.com',
    status: 'OPEN',
    reward: 'Rs. 500 reward',
    createdAt: new Date('2026-11-18T14:30:00.000Z'),
  },
  {
    _id: '6743b1a20101010101010103',
    title: 'College ID Card - LPU',
    type: 'LOST',
    category: 'Documents',
    description: 'Lovely Professional University student ID card of Abhishek Kumar, Registration number 12405841, B.Tech CSE 2024-28 batch.',
    primaryColor: 'White',
    state: 'Punjab',
    city: 'Jalandhar',
    specificLocation: 'LPU Campus, Block 32, Canteen Area',
    incidentDate: '2026-11-22T00:00:00.000Z',
    contactName: 'Abhishek Kumar',
    contactPhone: '8800112233',
    contactEmail: 'abhishek@lpu.in',
    status: 'OPEN',
    reward: '',
    createdAt: new Date('2026-11-22T11:00:00.000Z'),
  },
  {
    _id: '6743b1a20101010101010104',
    title: 'Found: Black Laptop Bag with Laptop inside',
    type: 'FOUND',
    category: 'Electronics',
    description: 'Found a black laptop bag near railway platform. Contains an HP laptop with mountain stickers, some cables, and a college notebook.',
    primaryColor: 'Black',
    state: 'Delhi',
    city: 'New Delhi',
    specificLocation: 'Platform 3-4 area, New Delhi Railway Station',
    incidentDate: '2026-11-20T00:00:00.000Z',
    contactName: 'Station Security Guard',
    contactPhone: '9100000001',
    contactEmail: 'ndelhi.security@railways.in',
    status: 'OPEN',
    reward: '',
    createdAt: new Date('2026-11-20T12:00:00.000Z'),
  },
  {
    _id: '6743b1a20101010101010105',
    title: 'Found: Blue Wallet near Metro Exit',
    type: 'FOUND',
    category: 'Wallets & Purses',
    description: 'Found a blue leather wallet at Dadar station with ID cards and cash.',
    primaryColor: 'Blue',
    state: 'Maharashtra',
    city: 'Mumbai',
    specificLocation: 'Dadar Metro Station, Platform Level',
    incidentDate: '2026-11-18T00:00:00.000Z',
    contactName: 'Vikas Jadhav',
    contactPhone: '9222334455',
    contactEmail: 'vikas.j@gmail.com',
    status: 'OPEN',
    reward: '',
    createdAt: new Date('2026-11-18T16:00:00.000Z'),
  },
  {
    _id: '6743b1a20101010101010106',
    title: 'Found: LPU Student ID Card',
    type: 'FOUND',
    category: 'Documents',
    description: 'Found an LPU student card in cafeteria area. Name on card: Abhishek, B.Tech student.',
    primaryColor: 'White',
    state: 'Punjab',
    city: 'Jalandhar',
    specificLocation: 'LPU Campus, Block 34 Corridor',
    incidentDate: '2026-11-23T00:00:00.000Z',
    contactName: 'Chinmay Dixit',
    contactPhone: '9988112233',
    contactEmail: 'chinmay.lpu@gmail.com',
    status: 'OPEN',
    reward: '',
    createdAt: new Date('2026-11-23T09:30:00.000Z'),
  },
];

export function getMemoryItems(query = {}) {
  let filtered = [...memoryItems];
  if (query.type && query.type !== 'ALL') {
    filtered = filtered.filter((i) => i.type === query.type);
  }
  if (query.category && query.category !== 'ALL') {
    filtered = filtered.filter((i) => i.category === query.category);
  }
  if (query.state && query.state !== 'ALL') {
    filtered = filtered.filter((i) => i.state.toLowerCase() === query.state.toLowerCase());
  }
  if (query.search) {
    const s = query.search.toLowerCase();
    filtered = filtered.filter(
      (i) =>
        i.title.toLowerCase().includes(s) ||
        i.description.toLowerCase().includes(s) ||
        i.city.toLowerCase().includes(s) ||
        i.state.toLowerCase().includes(s)
    );
  }
  return filtered;
}

export function getMemoryItemById(id) {
  return memoryItems.find((i) => String(i._id) === String(id)) || null;
}

export function addMemoryItem(item) {
  const newItem = {
    ...item,
    _id: 'mem_' + Date.now().toString(16),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  memoryItems.unshift(newItem);
  return newItem;
}
