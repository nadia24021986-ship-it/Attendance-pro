export const ADMIN_ID = 'admin456231';

export const initialEmployees = [
  { id: 'KRY-001', name: 'Budi Santoso', position: 'Staff IT', location: 'Kantor Pusat' },
  { id: 'KRY-002', name: 'Siti Aminah', position: 'Admin Gudang', location: 'Gudang Sektor 4' },
  { id: 'KRY-003', name: 'Rudi Hartono', position: 'Security', location: 'Kantor Pusat' },
];

export const initialRecords = [
  {
    id: 1,
    employeeId: 'KRY-001',
    name: 'Budi Santoso',
    location: 'Kantor Pusat',
    type: 'Check In',
    time: new Date().toISOString(),
    photo: 'https://placehold.co/150x150/e0e7ff/4f46e5?text=BS',
  },
  {
    id: 2,
    employeeId: 'KRY-002',
    name: 'Siti Aminah',
    location: 'Gudang Sektor 4',
    type: 'Check In',
    time: new Date(Date.now() - 3600000).toISOString(),
    photo: 'https://placehold.co/150x150/fce7f3/be185d?text=SA',
  },
];

