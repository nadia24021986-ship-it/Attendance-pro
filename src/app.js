import React, { useState } from 'react';
import { initialEmployees, initialRecords } from './data/initialData';
import LoginScreen from './components/LoginScreen';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [employees, setEmployees] = useState(initialEmployees);
  const [records, setRecords] = useState(initialRecords);

  const handleLogin = (user) => setCurrentUser(user);
  const handleLogout = () => setCurrentUser(null);

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} employees={employees} />;
  }

  if (currentUser === 'admin') {
    return (
      <AdminDashboard
        onLogout={handleLogout}
        employees={employees}
        setEmployees={setEmployees}
        records={records}
      />
    );
  }

  return (
    <EmployeeDashboard
      currentUser={currentUser}
      onLogout={handleLogout}
      records={records}
      setRecords={setRecords}
    />
  );
}

