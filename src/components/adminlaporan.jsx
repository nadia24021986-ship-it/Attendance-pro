import React, { useState } from 'react';
import { Printer, Search, FileText } from 'lucide-react';

export default function AdminLaporan({ records }) {
  const [filterPeriod, setFilterPeriod] = useState('Semua Waktu');
  const [filterLocation, setFilterLocation] = useState('');

  const filteredRecords = records.filter((r) => {
    const matchLocation =
      filterLocation === '' ||
      r.location.toLowerCase().includes(filterLocation.toLowerCase());

    let matchPeriod = true;
    const recordDate = new Date(r.time);
    const now = new Date();

    if (filterPeriod === 'Hari Ini') {
      matchPeriod = recordDate.toDateString() === now.toDateString();
    } else if (filterPeriod === 'Minggu Ini') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchPeriod = recordDate >= weekAgo;
    } else if (filterPeriod === 'Bulan Ini') {
      matchPeriod =
        recordDate.getMonth() === now.getMonth() &&
        recordDate.getFullYear() === now.getFullYear();
    }

    return matchLocation && matchPeriod;
  });

  const handlePrint = () => window.print();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="no-print flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Laporan Kehadiran</h1>
          <p className="text-slate-500 mt-1">Pantau absensi karyawan secara real-time</p>
        </div>
        <button
          onClick={handlePrint}
          className="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl font-medium shadow-sm flex items-center gap-2 transition-all"
        >
          <Printer size={18} /> Ekspor PDF
        </button>
      </div>

      {/* Filter */}
      <div className="no-print bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
          <Search size={18} className="text-slate-400" />
          <h3 className="font-semibold text-slate-700">Filter Data</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">
              Periode
            </label>
            <select
              className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
            >
              <option>Semua Waktu</option>
              <option>Hari Ini</option>
              <option>Minggu Ini</option>
              <option>Bulan Ini</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">
              Wilayah Kerja
            </label>
            <input
              type="text"
              placeholder="Cari lokasi (cth: Gudang)..."
              className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Print header (hanya muncul saat print) */}
        <div className="hidden print-only text-center py-6 px-8 border-b-2 border-slate-800">
          <h1 className="text-2xl font-bold uppercase tracking-wider text-slate-900">
            Laporan Kehadiran Karyawan
          </h1>
          <p className="text-slate-600 mt-1">
            Periode: {filterPeriod} | Lokasi: {filterLocation || 'Semua Lokasi'}
          </p>
          <p className="text-slate-400 text-sm mt-1">
            Dicetak: {new Date().toLocaleString('id-ID')}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 md:p-5 font-semibold text-slate-600">Tanggal & Waktu</th>
                <th className="p-4 md:p-5 font-semibold text-slate-600">Informasi Karyawan</th>
                <th className="p-4 md:p-5 font-semibold text-slate-600">Lokasi Absen</th>
                <th className="p-4 md:p-5 font-semibold text-slate-600">Status</th>
                <th className="p-4 md:p-5 font-semibold text-slate-600 text-center no-print">
                  Bukti Foto
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 md:p-5 align-middle">
                      <div className="text-sm font-medium text-slate-800">
                        {new Date(r.time).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="text-sm font-bold text-indigo-600 mt-1">
                        {new Date(r.time).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        WIB
                      </div>
                    </td>
                    <td className="p-4 md:p-5 align-middle">
                      <div className="font-semibold text-slate-800">{r.name}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{r.employeeId}</div>
                    </td>
                    <td className="p-4 md:p-5 align-middle text-slate-600 text-sm">
                      {r.location}
                    </td>
                    <td className="p-4 md:p-5 align-middle">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                          r.type === 'Check In'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {r.type === 'Check In' ? 'Masuk' : 'Pulang'}
                      </span>
                    </td>
                    <td className="p-4 md:p-5 align-middle text-center no-print">
                      <div className="w-12 h-12 rounded-lg border border-slate-200 overflow-hidden mx-auto shadow-sm">
                        <img src={r.photo} alt="selfie" className="w-full h-full object-cover" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <FileText size={40} className="mb-3 opacity-20" />
                      <p className="font-medium">Tidak ada data ditemukan</p>
                      <p className="text-sm mt-1">Coba sesuaikan filter pencarian Anda.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
