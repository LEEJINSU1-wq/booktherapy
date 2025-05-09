// App.js - 전체 라우팅 연결

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainApp from './MainApp';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import SelectPage from './SelectPage';
import WritePage from './WritePage';
import PrescriptionPage from './PrescriptionPage';
import AdminInputPage from './AdminInputPage';
import AdminWorryList from './AdminWorryList';
import AdminPrescriptionInput from './AdminPrescriptionInput';

function App() {
  return (
    <Router>
      <div className="background-image"></div>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/admin/worries" element={<AdminWorryList />} />
        <Route path="/prescription" element={<PrescriptionPage />} />
        <Route path="/admin" element={<AdminInputPage />} />
        <Route path="/admin/prescribe/:nickname" element={<AdminPrescriptionInput />} />
      </Routes>
    </Router>
  );
}

export default App; 
