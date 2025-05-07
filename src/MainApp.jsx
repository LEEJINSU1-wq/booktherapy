// MainApp.jsx - BOOKTHERAPY 감성 메인화면 완성본

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import './App.css';

export default function MainApp() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const goToSignup = () => navigate('/signup');
  const goToLogin = () => navigate('/login');

  return (
    <div style={styles.container}>
      <img
        src={logo}
        alt="BOOKTHERAPY 로고"
        style={{
          ...styles.logoImage,
          opacity: visible ? 1 : 0,
          transition: 'opacity 2s ease-in',
        }}
      />
      <p
        style={{
          ...styles.description,
          opacity: visible ? 1 : 0,
          transition: 'opacity 2s ease-in 1s',
        }}
      >
        이 앱은 세상 속에서 지친 당신을 위해 만들어졌어요.
        <br />
        지금의 힘든 마음이 책을 통해 위로받을 수 있길 바랄게요.
      </p>
      <div
        style={{
          ...styles.buttonContainer,
          opacity: visible ? 1 : 0,
          transition: 'opacity 2s ease-in 2s',
        }}
      >
        <button style={styles.button} onClick={goToSignup}>
          닉네임 정하기
        </button>
        <button style={styles.button} onClick={goToLogin}>
          들어가기
        </button>
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
  logoImage: {
    width: '180px',
    marginBottom: '30px',
  },
  description: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '40px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '20px',
    borderRadius: '30px',
    border: 'none',
    backgroundColor: '#ffd4bd',
    cursor: 'pointer',
    fontFamily: 'Nanum Pen Script, cursive',
  },
};
