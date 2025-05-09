import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

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

export default function SignupPage() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const checkDuplicate = async () => {
    if (!nickname) return alert('닉네임을 입력하세요.');
    const docRef = doc(db, 'users', nickname);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      alert('이미 사용 중인 닉네임이에요.');
    } else {
      alert('사용 가능한 닉네임이에요!');
      setIsChecked(true);
    }
  };

  const handleSubmit = async () => {
    if (!isChecked) return alert('닉네임 중복검사를 먼저 해주세요.');
    if (!password) return alert('비밀번호를 입력해주세요.');
    try {
      await setDoc(doc(db, 'users', nickname), { password });
      localStorage.setItem('nickname', nickname); // 닉네임 저장
      alert(`'${nickname}' 닉네임으로 회원가입이 완료되었어요!`);
      navigate('/write');
    } catch (err) {
      console.error(err);
      alert('오류가 발생했어요.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>BOOKTHERAPY</h1>
      <div style={styles.inputRow}>
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={styles.input}
        />
        <button onClick={checkDuplicate} style={styles.smallButton}>중복검사</button>
      </div>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSubmit} style={styles.button}>확인</button>
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
  logo: {
    fontSize: '48px',
    marginBottom: '40px',
  },
  inputRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '18px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    width: '240px',
    backgroundColor: '#fffefb',
  },
  smallButton: {
    fontSize: '16px',
    padding: '10px 16px',
    backgroundColor: '#ffd4bd',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  button: {
    marginTop: '20px',
    padding: '10px 24px',
    fontSize: '20px',
    backgroundColor: '#ffd4bd',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
  },
};
