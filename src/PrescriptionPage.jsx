// PrescriptionPage.jsx - 감성 처방 확인 화면

import React, { useEffect, useState } from 'react';
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

export default function PrescriptionPage() {
  const [bookTitle, setBookTitle] = useState('');
  const [quote, setQuote] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    if (!nickname) {
      setMessage('닉네임 정보를 불러올 수 없어요.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const docRef = doc(db, 'prescriptions', nickname);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBookTitle(data.book || '');
          setQuote(data.quote || '');
          setMessage(data.message || '');
        } else {
          setBookTitle('');
          setQuote('');
          setMessage('아직 등록된 처방이 없어요.');
        }
      } catch (error) {
        setBookTitle('');
        setQuote('');
        setMessage('데이터를 불러오는 중 오류가 발생했어요.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <img src={logo} alt="logo" style={styles.logo} />
      {loading ? (
        <p style={styles.loading}>처방을 불러오고 있어요...</p>
      ) : (
        <div style={styles.card}>
          {bookTitle ? (
            <>
              <h2 style={styles.title}>📖 추천하는 책</h2>
              <p style={styles.content}>{bookTitle}</p>

              <h2 style={styles.title}>📌 추천하는 구절</h2>
              <p style={styles.content}>&ldquo;{quote}&rdquo;</p>

              <h2 style={styles.title}>🩵 위로의 말</h2>
              <p style={styles.content}>{message}</p>
            </>
          ) : (
            <p style={styles.content}>{message}</p>
          )}
        </div>
      )}
      <audio autoPlay loop>
        <source src="https://cdn.pixabay.com/download/audio/2022/11/03/audio_8d94f6cd0f.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
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
    padding: '20px',
  },
  logo: {
    width: '160px',
    marginBottom: '30px',
  },
  card: {
    backgroundColor: '#fffefb',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    margin: '20px 0 10px',
  },
  content: {
    fontSize: '20px',
    color: '#444',
  },
  loading: {
    fontSize: '20px',
    color: '#777',
  },
};
