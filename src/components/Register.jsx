import "../App.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // デフォルトのフォーム送信を防ぐ
  
    const url = "http://localhost:8080/signup"; // サーバーのエンドポイントURL
  
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: playerName, password: password }),
    };
  
    console.log("プレイヤー名:", playerName, "パスワード:", password);
  
    try {
      // サーバーにデータを送信
      const response = await fetch(url, options);
  
      if (!response.ok) {
        // サーバーからエラーレスポンスが返された場合
        const errorData = await response.json();
        console.error("サーバーエラー:", errorData);
        alert("登録に失敗しました: " + errorData.message);
        return;
      }
  
      const data = await response.json();
      alert(data.message);
      navigate("/login");
    } catch (error) {
      // ネットワークエラーなどの処理
      console.error("エラーが発生しました:", error);
      alert("登録に失敗しました。もう一度お試しください。");
    }
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
        <button className="register-button" type="submit">
          登録
        </button>
      </form>
      <button
        className="back-button"
        onClick={() => navigate("/login")}
      >
        ログイン画面に戻る
      </button>
    </div>
  );
}
