// AdminWorryList.jsx - 고민 클릭 시 처방 입력 화면으로 이동 + 처방 여부 표시

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
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

export default function AdminWorryList() {
  const [worries, setWorries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'worries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const worryList = await Promise.all(
        snapshot.docs.map(async (docSnap, index) => {
          const data = docSnap.data();
          const prescriptionRef = doc(db, 'prescriptions', data.nickname);
          const prescriptionSnap = await getDoc(prescriptionRef);
          return {
            id: docSnap.id,
            number: snapshot.size - index,
            prescribed: prescriptionSnap.exists(),
            ...data,
          };
        })
      );
      setWorries(worryList);
    });
    return () => unsubscribe();
  }, []);

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

  const goToPrescriptionInput = (nickname) => {
    navigate(`/admin/prescribe/${nickname}`);
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="logo" style={styles.logo} />
      <h2 style={styles.title}>📋 아이들의 고민 목록</h2>
      <div style={styles.list}>
        {worries.map((worry) => (
          <div key={worry.id} style={styles.item} onClick={() => goToPrescriptionInput(worry.nickname)}>
            <strong>{worry.number}. {worry.nickname}</strong>
            <p style={styles.content}>{worry.content}</p>
            {worry.prescribed && <p style={styles.prescribed}>✅ 처방 완료</p>}
          </div>
        ))}
        {worries.length === 0 && <p style={styles.empty}>등록된 고민이 아직 없어요.</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#fffaf5',
    fontFamily: 'Nanum Pen Script, cursive',
    minHeight: '100vh',
  },
  logo: {
    width: '160px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '26px',
    marginBottom: '20px',
  },
  list: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  item: {
    backgroundColor: '#fffefb',
    borderRadius: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '20px',
    marginBottom: '16px',
    cursor: 'pointer',
  },
  content: {
    fontSize: '18px',
    marginTop: '10px',
  },
  prescribed: {
    marginTop: '8px',
    color: '#28a745',
    fontSize: '18px',
  },
  empty: {
    fontSize: '20px',
    textAlign: 'center',
    marginTop: '40px',
    color: '#777',
  },
};
