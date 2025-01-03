import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () =>{
    const[userId, setUserId] = useState('');
    const[password, setPassword] = useState('');

    const handleLogin = (e) =>{
        e.preventDefault();

        //ログイン処理をここに追加
    }

    const habdleRegisterRedirect = () =>{
        //新規会員登録画面へ遷移
    }

    
}

return(
   <div style={styles.container}>
    //ゲームタイトルロゴ
    <img src="" alt="Game Title" style={styles.gameTitleImage}/>

    <form onSubmit={handleLogin} style={styles.form}>
        <label htmlFor="userId">ユーザーID</label>
        <div style={styles.inputContainer}>
        <input
        id="userId"
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
        style={style.input}
        />
        </div>
        <div style={styles.inputContainer}>
            <label htmlFor="password">パスワード</label>
            <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            />
        </div>
        <button type="submit">ログイン</button>
    </form>
    <button onClick={habdleRegisterRedirect} style={styles.registerButton}>新規会員登録</button>
   </div> 
)
