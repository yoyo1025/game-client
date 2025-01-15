import "../Login.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState(null); 

  const handleSubmit = async (event) => {
    event.preventDefault(); // デフォルトのフォーム送信を防ぐ
  
    const url = "http://172.31.110.75:8080/signup"; // サーバーのエンドポイントURL
  
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

  const handleLoginRedirect = () => {
    navigate("/login");
  };
  

  return (
    <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="imgContainer">
            <img src="/game-title-image.png" alt="sample" className="sampleImage" />
          </div>
          <h1 className="login-h1">サインアップ</h1>
          <hr />
          <div className="uiForm">
            <div className="formField">
              <label>ユーザー名</label>
              <input
                type="text"
                placeholder="ユーザー名"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                required
              />
            </div>
            <div className="formField">
              <label>パスワード</label>
              <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {statusMessage && (
              <div
                className={`statusMessage ${
                  statusMessage.type === "success" ? "success" : "error"
                }`}
              >
                {statusMessage.text}
              </div>
            )}
            <div className="buttonGroup">
                <button type="submit" className="loginButton">
                  サインアップ
                </button>
            </div>
            <div className="registerText">
            既にアカウントをお持ちですか？ ログインは
            <span className="blueLink" onClick={handleLoginRedirect}>
                こちら
            </span>
            </div>
          </div>
        </form>
      </div>
  );
}
