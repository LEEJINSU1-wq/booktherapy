// SelectPage.jsx - 고민쓰기/처방받기 선택화면

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';

export default function SelectPage() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
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
