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

return