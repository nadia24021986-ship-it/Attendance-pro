import React, { useState } from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { ADMIN_ID } from '../data/initialData';

export default function LoginScreen({ onLogin, employees }) {
  const [inputId, setInputId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (inputId === ADMIN_ID) {
        onLogin('admin');
      } else {
        const emp = employees.find((emp) => emp.id === inputId);
        if (emp) {
          onLogin(emp);
        } else {
          setError('Kredensial tidak valid. Silakan periksa kembali ID Anda.');
        }
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-indigo-600 rounded-b-3xl shadow-lg z-0" />

      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full z-10 border border-slate-100 relative">
        <div className="text-center mb-10">
          <div className="bg-indigo-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Clock size={40} className="text-indigo-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Portal Kehadiran</h1>
          <p className="text-slate-500 mt-2">Masuk untuk mengelola absensi Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              ID Karyawan / Admin
            </label>
            <input
              type="password"
              placeholder="Masukkan ID Anda"
              className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium tracking-widest text-center"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-md shadow-indigo-200 flex justify-center items-center gap-2 group disabled:opacity-70"
          >
            {isLoading ? 'Memverifikasi...' : 'Masuk ke Sistem'}
            {!isLoading && (
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Enterprise HR System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
