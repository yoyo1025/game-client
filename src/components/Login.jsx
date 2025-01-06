import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () =>{
    const[userId, setUserId] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) =>{
        e.preventDefault();

        //ログイン処理をここに追加
    };

    const handleRegisterRedirect = () =>{
        navigate('/register')//新規会員登録画面へ遷移
    };


return(
    <div className="login-container">
    <img src="/game-title-image.png" alt="Game Title" className="character" />
    
    <form onSubmit={handleLogin}>
        <div className="form-group">
        <input
        type="text"
        placeholder="ユーザーID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
        />
        </div>
        <div className="form-group">
            <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        <button type="submit">ログイン</button>
    </form>

    <button onClick={handleRegisterRedirect} className="register-button">新規会員登録</button>
   </div> 
)
}

export default Login;
