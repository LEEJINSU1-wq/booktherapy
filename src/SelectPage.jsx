// SelectPage.jsx - 고민쓰기/처방받기 선택화면

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCpG2j6U6WTUrURFuESbNi0YR8cNZzSdy0",
  authDomain: "booktherapy-app.firebaseapp.com",
  projectId: "booktherapy-app",
  storageBucket: "booktherapy-app.appspot.com",
  messagingSenderId: "968256740810",
  appId: "1:968256740810:web:73a6647c79b0339170333",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function SelectPage() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // 🔔 처방 도착 알림
  useEffect(() => {
    const checkPrescription = async () => {
      const nickname = localStorage.getItem('nickname');
      if (!nickname) return;
      const docRef = doc(db, 'prescriptions', nickname);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        alert('📮 처방이 도착했어요!');
      }
    };
    checkPrescription();
  }, []);

  const goToWrite = () => navigate('/write');
  const goToRead = () => navigate('/prescription');

  return (
    <div style={styles.container}>
      <img
        src={logo}
        alt="로고"
        style={{ ...styles.logo, opacity: visible ? 1 : 0, transition: 'opacity 2s ease-in' }}
      />
      <div style={{ ...styles.buttonWrap, opacity: visible ? 1 : 0, transition: 'opacity 2s ease-in 1.5s' }}>
        <button style={styles.button} onClick={goToWrite}>고민 얘기하러 가기</button>
        <button style={styles.button} onClick={goToRead}>처방 받으러 가기</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#fffaf5',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Nanum Pen Script, cursive',
  },
  logo: {
    width: '180px',
    marginBottom: '40px',
  },
  buttonWrap: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    fontSize: '20px',
    padding: '12px 24px',
    borderRadius: '30px',
    border: 'none',
    backgroundColor: '#ffd4bd',
    cursor: 'pointer',
  },
};
