import "../Room.css";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RoomPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const password = location.state?.password || "パスワード不明";

  return (
    <div className="formContainer">
      <form>
        <h1>ルーム作成完了</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <p className="successMessage">パスワードは「{password}」です。</p>
          </div>
          <div className="buttonGroup">
            <button className="room-button" onClick={() => navigate("/")}>
              ホームに戻る
            </button>
            <button className="room-button" onClick={() => navigate("/room-join")}>
              ルーム参加
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
