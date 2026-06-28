import React, { useState } from 'react';
import { LogOut, FileText, Users } from 'lucide-react';
import AdminKaryawan from './AdminKaryawan';
import AdminLaporan from './AdminLaporan';

export default function AdminDashboard({ onLogout, employees, setEmployees, records }) {
  const [activeTab, setActiveTab] = useState('laporan');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0">
        <div className="p-6 md:p-8 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <Users size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Admin Portal</h2>
            <p className="text-xs text-slate-400">HR Management System</p>
          </div>
        </div>

        <nav className="p-4 md:p-6 flex-1 flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4">
            Menu Utama
          </p>

          <button
            onClick={() => setActiveTab('laporan')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
              activeTab === 'laporan'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText size={20} />
            <span className="font-medium">Laporan Absensi</span>
          </button>

          <button
            onClick={() => setActiveTab('karyawan')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
              activeTab === 'karyawan'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users size={20} />
            <span className="font-medium">Data Karyawan</span>
          </button>

          <div className="mt-auto pt-8">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-slate-800"
            >
              <LogOut size={18} />
              <span>Keluar Sistem</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto min-h-screen">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'karyawan' ? (
            <AdminKaryawan employees={employees} setEmployees={setEmployees} />
          ) : (
            <AdminLaporan records={records} />
          )}
        </div>
      </main>
    </div>
  );
}
