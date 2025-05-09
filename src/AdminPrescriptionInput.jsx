// AdminPrescriptionInput.jsx - 닉네임 기반 처방 입력 화면

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
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

export default function AdminPrescriptionInput() {
  const { nickname } = useParams();
  const [book, setBook] = useState('');
  const [quote, setQuote] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!book || !quote || !message) {
      setStatus('모든 항목을 입력해 주세요.');
      return;
    }

    try {
      await setDoc(doc(db, 'prescriptions', nickname), {
        book,
        quote,
        message,
      });
      setStatus('🎉 처방이 저장되었어요!');
    } catch (error) {
      setStatus('오류가 발생했어요. 다시 시도해 주세요.');
    }
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="logo" style={styles.logo} />
      <h2 style={styles.title}>📮 {nickname} 님에게 보낼 처방</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="추천할 책 제목"
          value={book}
          onChange={(e) => setBook(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="추천 구절"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          style={styles.textarea}
        />
        <textarea
          placeholder="위로 메시지"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>처방 저장하기</button>
        {status && <p style={styles.status}>{status}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fffaf5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Nanum Pen Script, cursive',
    padding: '20px',
  },
  logo: {
    width: '160px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    fontSize: '18px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontFamily: 'inherit',
  },
  textarea: {
    padding: '10px',
    height: '100px',
    fontSize: '18px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontFamily: 'inherit',
    marginBottom: '10px',
  },
  button: {
    padding: '12px',
    fontSize: '18px',
    borderRadius: '10px',
    backgroundColor: '#ffd6c4',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  status: {
    marginTop: '10px',
    color: '#d66',
    fontSize: '16px',
  },
};
