import React, { useState, useEffect, useRef } from 'react';
import {
  LogOut, MapPin, CheckCircle, XCircle, FileText,
  Camera, ArrowLeft,
} from 'lucide-react';

export default function EmployeeDashboard({ currentUser, onLogout, records, setRecords }) {
  const [time, setTime] = useState(new Date());
  const [absenType, setAbsenType] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [photoData, setPhotoData] = useState(null);
  const [stream, setStream] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Attach stream to video element after render
  useEffect(() => {
    if (cameraActive && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [cameraActive, stream]);

  const myRecords = records
    .filter((r) => r.employeeId === currentUser.id)
    .sort((a, b) => new Date(b.time) - new Date(a.time));

  const handleInitiateAbsen = (type) => {
    setAbsenType(type);
    startCamera();
  };

  const startCamera = async () => {
    setPhotoData(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      setStream(mediaStream);
      setCameraActive(true);
    } catch {
      alert('Izin kamera diperlukan untuk melakukan absensi.');
      cancelAbsenFlow();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.8);
      setPhotoData(dataUrl);
      stopCamera();
    }
  };

  const cancelAbsenFlow = () => {
    stopCamera();
    setAbsenType(null);
    setPhotoData(null);
  };

  const confirmAndSubmit = () => {
    if (!photoData || !absenType) return;
    const newRecord = {
      id: Date.now(),
      employeeId: currentUser.id,
      name: currentUser.name,
      location: currentUser.location,
      type: absenType,
      time: new Date().toISOString(),
      photo: photoData,
    };
    setRecords([newRecord, ...records]);
    alert(
      `✅ BERHASIL!\nAnda telah melakukan ${
        absenType === 'Check In' ? 'Absen Masuk' : 'Absen Pulang'
      } pada pukul ${new Date().toLocaleTimeString('id-ID')}`
    );
    cancelAbsenFlow();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-bold text-slate-800 leading-tight">{currentUser.name}</h1>
            <p className="text-xs text-slate-500 font-medium">{currentUser.position}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2.5 rounded-full transition-all"
          title="Keluar"
        >
          <LogOut size={20} />
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 p-4 md:p-6 max-w-lg mx-auto w-full space-y-6 pb-12">
        {/* Clock card */}
        <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 text-center shadow-xl">
          <div
            style={{
              position: 'absolute', top: 0, right: 0,
              width: '8rem', height: '8rem',
              background: '#6366f1', borderRadius: '50%',
              filter: 'blur(40px)', opacity: 0.5,
              transform: 'translate(50%, -50%)',
            }}
          />
          <div
            style={{
              position: 'absolute', bottom: 0, left: 0,
              width: '8rem', height: '8rem',
              background: '#3b82f6', borderRadius: '50%',
              filter: 'blur(40px)', opacity: 0.5,
              transform: 'translate(-50%, 50%)',
            }}
          />
          <div style={{ position: 'relative', zIndex: 10 }}>
            <p className="text-indigo-200 text-sm font-medium tracking-wide uppercase mb-2">
              {time.toLocaleDateString('id-ID', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
              })}
            </p>
            <h2 className="text-5xl font-mono font-bold tracking-tight text-white mb-3 tabular-nums">
              {time.toLocaleTimeString('id-ID', {
                hour: '2-digit', minute: '2-digit', second: '2-digit',
              })}
            </h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <MapPin size={12} /> {currentUser.location}
            </div>
          </div>
        </div>

        {/* Absen card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-5">
          {!absenType ? (
            <>
              <div className="text-center px-2 mb-2">
                <h3 className="font-bold text-slate-800 text-lg">Pilih Jenis Absen</h3>
                <p className="text-sm text-slate-500">Klik tombol di bawah untuk membuka kamera</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleInitiateAbsen('Check In')}
                  className="flex flex-col justify-center items-center gap-3 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-500 text-emerald-700 py-6 rounded-2xl font-bold transition-transform active:scale-95"
                >
                  <CheckCircle size={32} />
                  <span className="text-lg">MASUK</span>
                </button>
                <button
                  onClick={() => handleInitiateAbsen('Check Out')}
                  className="flex flex-col justify-center items-center gap-3 bg-amber-50 hover:bg-amber-100 border-2 border-amber-500 text-amber-700 py-6 rounded-2xl font-bold transition-transform active:scale-95"
                >
                  <XCircle size={32} />
                  <span className="text-lg">PULANG</span>
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {/* Absen header */}
              <div className="flex items-center justify-between px-1">
                <button
                  onClick={cancelAbsenFlow}
                  className="text-slate-400 hover:text-slate-700 flex items-center gap-1 text-sm font-medium"
                >
                  <ArrowLeft size={16} /> Batal
                </button>
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  {absenType === 'Check In' ? (
                    <CheckCircle size={18} className="text-emerald-500" />
                  ) : (
                    <XCircle size={18} className="text-amber-500" />
                  )}
                  Absen {absenType === 'Check In' ? 'Masuk' : 'Pulang'}
                </h3>
              </div>

              {/* Camera / photo preview */}
              <div
                className="relative bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-slate-200"
                style={{ aspectRatio: '4/3' }}
              >
                {photoData ? (
                  <img src={photoData} alt="Selfie Validasi" className="w-full h-full object-cover" />
                ) : cameraActive ? (
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                ) : (
                  <p className="text-slate-400 text-sm">Memuat kamera...</p>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Take photo button */}
              {!photoData && cameraActive && (
                <button
                  onClick={takePhoto}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95 flex justify-center items-center gap-2"
                >
                  <Camera size={20} /> Jepret Foto
                </button>
              )}

              {/* Confirm / retake */}
              {photoData && (
                <div className="space-y-3">
                  <button
                    onClick={confirmAndSubmit}
                    className={`w-full text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95 flex justify-center items-center gap-2 ${
                      absenType === 'Check In'
                        ? 'bg-emerald-500 hover:bg-emerald-600'
                        : 'bg-amber-500 hover:bg-amber-600'
                    }`}
                  >
                    Kirim Absen {absenType === 'Check In' ? 'Masuk' : 'Pulang'}
                  </button>
                  <button
                    onClick={startCamera}
                    className="w-full text-sm font-semibold text-slate-500 py-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Ulangi Foto
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Riwayat */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-5 px-1">
            <h3 className="font-bold text-slate-800 text-lg">Riwayat Anda</h3>
            <span className="text-xs text-indigo-600 font-medium">Bulan Ini</span>
          </div>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
            {myRecords.length > 0 ? (
              myRecords.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm ${
                        r.type === 'Check In' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    >
                      {r.type === 'Check In' ? <CheckCircle size={24} /> : <XCircle size={24} />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">
                        {r.type === 'Check In' ? 'Absen Masuk' : 'Absen Pulang'}
                      </p>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">
                        {new Date(r.time).toLocaleDateString('id-ID', {
                          weekday: 'short', day: 'numeric', month: 'short',
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-xl font-bold font-mono text-slate-700 tracking-tight">
                    {new Date(r.time).toLocaleTimeString('id-ID', {
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText size={32} className="mx-auto text-slate-300 mb-2" />
                <p className="text-slate-500 font-medium">Belum ada aktivitas bulan ini</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

