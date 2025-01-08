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
    const submitData = (event) => {
      event.preventDefault(); // デフォルトのフォーム送信を防ぐ
     
      const url = "http://localhost:8080/login"; // サーバーのエンドポイントURL
   
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName, password: password }),
      };
   
      console.log(playerName);
   
      // サーバーにデータを送信
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          navigate("/login");
   
        })
        .catch((error) => {
          alert("登録に失敗しました。もう一度お試しください。");
        });
    };
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


