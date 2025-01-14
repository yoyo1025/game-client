import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () =>{
    const[playerName, setPlayerName] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();

    // 修正点: ログイン処理にトークン保存を追加
    const handleLogin = async (event) => {
        event.preventDefault(); // デフォルトのフォーム送信を防ぐ

        const url = "http://localhost:8080/login"; // サーバーのエンドポイントURL

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: playerName, password: password }),
        };

        try {
            // サーバーにデータを送信
            const response = await fetch(url, options);

            if (!response.ok) {
                // サーバーからエラーレスポンスが返された場合
                const errorData = await response.json();
                console.error("サーバーエラー:", errorData);
                alert("ログインに失敗しました: " + errorData.message);
                return;
            }

            const data = await response.json();
            
            // トークンを localStorage に保存
            if (data.token) {
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("userId", data.userId);
                alert("ログインに成功しました!");
                navigate("/"); // ログイン成功後にホーム画面に遷移
            } else {
                alert("ログインに失敗しました: トークンがありません。");
            }
        } catch (error) {
            
            console.error("エラーが発生しました:", error);
            alert("ログインに失敗しました。もう一度お試しください。");
        }
    };

    const handleRegisterRedirect = () =>{
        navigate('/register')//新規会員登録画面へ遷移
    };


return(
    <div className="login-page">
      <div className="login-container">
        <img src="/game-title-image.png" alt="Game Title" className="character" />
        <form onSubmit={handleLogin}>
             <div className="loginform-group">
                <input
                type="text"
                 placeholder="プレイヤー名"
                 value={playerName}
                 onChange={(e) => setPlayerName(e.target.value)}
                 required
                  />
                  </div>
            <div className="loginform-group">
                <input
                 type="password"
                 placeholder="パスワード"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required/>
                 </div>
        <button type="submit" className="login-button">ログイン</button>
        </form>
    <h2>アカウントを持っていない方はこちら</h2>
    <button onClick={handleRegisterRedirect} className="register-button">新規会員登録</button>
    </div> 
   </div>
)
}

export default Login;