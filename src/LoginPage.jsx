// LoginPage.jsx - 닉네임 기반 로그인 페이지

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import logo from './assets/logo.png';

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

export default function LoginPage() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!nickname || !password) {
      alert('닉네임과 비밀번호를 모두 입력해줘.');
      return;
    }

    const docRef = doc(db, 'users', nickname);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      alert('등록되지 않은 닉네임이야. 먼저 닉네임 정하기를 해줘.');
      return;
    }

    const userData = docSnap.data();
    if (userData.password === password) {
      alert('반가워! 잘 들어왔어.');
      navigate('/select');
    } else {
      alert('비밀번호가 달라. 다시 한 번 확인해줄래?');
    }
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="BOOKTHERAPY 로고" style={styles.logoImage} />
      <input
        type="text"
        placeholder="닉네임을 입력하세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>확인</button>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#fffaf5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Nanum Pen Script, cursive',
  },
  logoImage: {
    width: '180px',
    marginBottom: '30px',
  },
  input: {
    padding: '10px',
    fontSize: '18px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    width: '240px',
    marginBottom: '15px',
    backgroundColor: '#fffefb',
  },
  button: {
    padding: '10px 24px',
    fontSize: '20px',
    backgroundColor: '#ffd4bd',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
  },
};
