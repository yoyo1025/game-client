import "../App.css"
import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Success() {
  const navigate = useNavigate();

  // ホーム画面に戻る
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="success-container">
      <h1>登録が完了しました！</h1>
      <p>アカウントが正常に作成されました。</p>
      <button className="back-home-button" onClick={handleBackToHome}>
        ホームに戻る
      </button>
    </div>
  );
}
