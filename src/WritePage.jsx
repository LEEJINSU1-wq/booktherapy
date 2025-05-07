// WritePage.jsx - 고민 입력 페이지

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';

export default function WritePage() {
  const [content, setContent] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!content.trim()) {
      alert('마음속 고민을 적어줘.');
      return;
    }
    setShowMsg(true);
    setTimeout(() => navigate('/select'), 3000); // 잠시 후 다시 선택화면으로 이동
  };

  return (
    <div className="container">
      <img src={logo} alt="logo" style={styles.logo} />
      {!showMsg ? (
        <>
          <p style={styles.prompt}>마음속 고민을 적어줘..</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="지금 어떤 고민이 있어?"
            style={styles.textarea}
          />
          <button onClick={handleSubmit} style={styles.button}>고민 전하기</button>
        </>
      ) : (
        <p style={styles.message}>잠시만 기다려 주세요. 당신에게 꼭 맞는 위로의 책을 찾아드릴게요.</p>
      )}
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
    marginBottom: '30px',
  },
  prompt: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  textarea: {
    width: '300px',
    height: '150px',
    fontSize: '18px',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#fffefb',
    marginBottom: '20px',
    resize: 'none',
  },
  button: {
    padding: '10px 24px',
    fontSize: '20px',
    borderRadius: '30px',
    border: 'none',
    backgroundColor: '#ffd4bd',
    cursor: 'pointer',
  },
  message: {
    fontSize: '22px',
    color: '#555',
    textAlign: 'center',
    padding: '20px',
  },
};
