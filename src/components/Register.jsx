import "../App.css";
import { useNavigate, useNevigate } from 'react-router-dom';
import React, { useState } from 'react';


export default function Register() {

  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 登録ボタンが押されたときの処理をここに書きます。
    console.log("プレイヤー名:", playerName, "パスワード:", password);
  };

  return (
    <div className="register-form">
      <h2>新規アカウント登録</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="playerName">プレイヤー名</label>
          <input 
            type="text" 
            id="playerName" 
            value={playerName} 
            onChange={(e) => setPlayerName(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">パスワード</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button className="register-button">登録</button>
      </form>
      <button className="back-button" onClick={() => console.log("ログイン画面に戻る")}>
        ログイン画面に戻る
      </button>
    </div>
  );
}


