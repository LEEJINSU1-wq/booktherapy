// ConcernInputPage.jsx - 고민 입력 후 이메일 전송

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import logo from './assets/logo.png';

export default function ConcernInputPage() {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    if (!nickname || !message) {
      setStatus('닉네임과 고민을 모두 입력해 주세요.');
      return;
    }

    emailjs.send(
      'service_pt5frrf',
      'template_n6rgsix',
      {
        name: nickname,
        message: message,
      },
      'gdTw6xrIJkLlCFjmW'
    ).then(
      (result) => {
        setStatus('고민이 성공적으로 전달되었어요.');
        setMessage('');
      },
      (error) => {
        setStatus('전송 중 오류가 발생했어요. 다시 시도해 주세요.');
      }
    );
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="logo" style={styles.logo} />
      <h2 style={styles.title}>마음 속 고민을 적어줘...</h2>
      <form onSubmit={sendEmail} style={styles.form}>
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="당신의 고민을 적어주세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>고민 전하기</button>
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
    height: '150px',
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
