import React, { useState } from 'react';
import { UserPlus, XCircle, Briefcase, MapPin } from 'lucide-react';

export default function AdminKaryawan({ employees, setEmployees }) {
  const [newEmp, setNewEmp] = useState({ name: '', position: '', location: '' });
  const [showForm, setShowForm] = useState(false);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newId = `KRY-${String(employees.length + 1).padStart(3, '0')}`;
    const added = { id: newId, ...newEmp };
    setEmployees([...employees, added]);
    setNewEmp({ name: '', position: '', location: '' });
    setShowForm(false);
    alert(
      `✅ BERHASIL DITAMBAHKAN\n\nNama: ${newEmp.name}\nID Karyawan: ${newId}\n\nSilakan berikan ID ini kepada karyawan yang bersangkutan untuk login.`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Data Karyawan</h1>
          <p className="text-slate-500 mt-1">Kelola informasi dan akses karyawan</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm flex items-center gap-2 transition-all"
        >
          {showForm ? <XCircle size={18} /> : <UserPlus size={18} />}
          {showForm ? 'Batal' : 'Tambah Karyawan'}
        </button>
      </div>

      {/* Form tambah karyawan */}
      {showForm && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-4">
            Registrasi Karyawan Baru
          </h3>
          <form onSubmit={handleAddEmployee} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
              <input
                type="text"
                required
                value={newEmp.name}
                onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Masukkan nama lengkap..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Jabatan</label>
              <input
                type="text"
                required
                value={newEmp.position}
                onChange={(e) => setNewEmp({ ...newEmp, position: e.target.value })}
                className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Cth: Staff IT, Manager..."
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">Wilayah / Lokasi Penempatan</label>
              <input
                type="text"
                required
                value={newEmp.location}
                onChange={(e) => setNewEmp({ ...newEmp, location: e.target.value })}
                className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Cth: Gudang Area 1, Kantor Jakarta Pusat..."
              />
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full bg-slate-900 text-white font-medium py-3.5 rounded-xl hover:bg-slate-800 transition shadow-md"
              >
                Simpan & Hasilkan ID Karyawan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabel karyawan */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-600 text-sm border-b border-slate-200">
              <tr>
                <th className="p-5 font-semibold">ID Karyawan</th>
                <th className="p-5 font-semibold">Profil</th>
                <th className="p-5 font-semibold">Wilayah Kerja</th>
                <th className="p-5 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-mono font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {emp.id}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">{emp.name}</span>
                      <span className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                        <Briefcase size={14} /> {emp.position}
                      </span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="text-slate-600 flex items-center gap-1.5">
                      <MapPin size={16} className="text-slate-400" />
                      {emp.location}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

