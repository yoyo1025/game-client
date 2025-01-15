import { createContext, useContext } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

// ローカルストレージにある userId の値を取得
const randomId = Number(localStorage.getItem("userId"));

// デモ用ユーザーオブジェクト
export const user = {
  userId: randomId,
  userName: `ユーザー${randomId}`,
};

// Context を作成して export
export const UserContext = createContext(user);

export default function Home() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  // ルーム作成画面へ遷移
  const handleRoomMake = () => {
    navigate("/room-make");
  };

  // ルーム参加画面へ遷移
  const handleRoomJoin = () => {
    navigate("/room-join");
  };

  return (
    <div className="homeContainer">
      {/* 画面上部エリア */}
      <div className="header">
        <div className="player-info">
          <div className="user-info">
            {/* 任意のユーザー情報表示 */}
            <div className="user-text">ID: {user.userId}</div>
            <div className="user-text">Name: {user.userName}</div>
          </div>
        </div>

        {/* メニューエリア */}
        <div className="menu">
          <div className="menu-item">
            <button className="menu-button">
              <img src="rule-icon.png" className="menu-icon" alt="Rule Icon" />
            </button>
            <div className="menu-description">ルール</div>
          </div>
          <div className="menu-item">
            <button className="menu-button">
              <img
                src="battle-record-icon.png"
                className="menu-icon"
                alt="Battle Record Icon"
              />
            </button>
            <div className="menu-description">戦績</div>
          </div>
          <div className="menu-item">
            <button className="menu-button">
              <img
                src="logout-icon.png"
                className="menu-icon"
                alt="Logout Icon"
              />
            </button>
            <div className="menu-description">ログアウト</div>
          </div>
        </div>
      </div>

      {/* ルーム作成/参加ボタンエリア */}
      <div className="make-or-join-room">
        <div className="make-room-group">
          <button className="make-room-button" onClick={handleRoomMake}>
            <img src="make-room-icon.png" className="make-room-icon" alt="Make room icon" />
          </button>
          <div>ルーム作成</div>
        </div>
        <div className="join-room-group">
          <button className="join-room-button" onClick={handleRoomJoin}>
            <img src="join-room-icon.png" className="room-join-icon" alt="Join room icon" />
          </button>
          <div>ルーム参加</div>
        </div>
      </div>
    </div>
  );
}
