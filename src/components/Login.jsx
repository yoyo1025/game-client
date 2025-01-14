import "../Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [playerName, setPlayerName] = useState("");
    const [password, setPassword] = useState("");
    const [statusMessage, setStatusMessage] = useState(null); 
    const navigate = useNavigate();
  
    // ログイン処理
    const handleLogin = async (event) => {
      event.preventDefault(); // デフォルトのフォーム送信を防ぐ
  
      const url = "http://localhost:8080/login"; // サーバーのエンドポイントURL
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName, password: password }),
      };
  
      try {
        const response = await fetch(url, options);
  
        if (!response.ok) {
          const errorData = await response.json();
          setStatusMessage({
            type: "error",
            text: errorData.message || "ログインに失敗しました",
          });
          return;
        }
  
        const data = await response.json();
  
        // トークンを localStorage に保存
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("userId", data.userId);
          setStatusMessage({ type: "success", text: "ログインに成功しました！" });
          // 少し待ってからトップページに遷移
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          setStatusMessage({
            type: "error",
            text: "トークンがありません。ログインに失敗しました。",
          });
        }
      } catch (error) {
        console.error("エラーが発生しました:", error);
        setStatusMessage({
          type: "error",
          text: "ログインに失敗しました。もう一度お試しください。",
        });
      }
    };
  
    // 新規会員登録画面へ遷移
    const handleRegisterRedirect = () => {
      navigate("/signup");
    };
  
    return (
      <div className="formContainer">
        <form onSubmit={handleLogin}>
          <div className="imgContainer">
            <img src="/game-title-image.png" alt="sample" className="sampleImage" />
          </div>
          <h1 className="login-h1">ログイン</h1>
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
                ログイン
                </button>
            </div>
            <div className="registerText">
            アカウントをお持ちでないですか？ サインアップは
            <span className="blueLink" onClick={handleRegisterRedirect}>
                こちら
            </span>
            </div>
          </div>
        </form>
      </div>
    );
  };

export default Login;