import { createContext, useContext } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";


// 1001～1004の間で乱数を生成し、Contextに格納
const randomId = Math.floor(Math.random() * 4) + 1000;
export const user = {
  userId: randomId,
  userName: `ランダムユーザー${randomId}`,
};

export const UserContext = createContext(user);

export default function Home() {

  const navigate = useNavigate();
  const user = useContext(UserContext);
  const handleRoomMake = () => {
    navigate('/room-make')
  }
  const handleRoomJoin = () => {
    navigate('/room-join')
  }

  return (
    <div>
      <div className="menu">
        <div className="menu-item">
          <button className="menu-botton">
            <img src="rule-icon.png" className="menu-icon" alt="Rule Icon" />
          </button>
          <div className="menu-description">ルール</div>
        </div>
        <div className="menu-item">
          <button className="menu-botton">
            <img src="battle-record-icon.png" className="menu-icon" alt="Battle Record Icon" />
          </button>
          <div className="menu-description">戦績</div>
        </div>
        <div className="menu-item">
          <button className="menu-botton">
            <img src="logout-icon.png" className="menu-icon" alt="Logout Icon" />
          </button>
          <div className="menu-description">ログアウト</div>
        </div>
      </div>
      <div className="make-or-join-room">
        <div className="make-room-gourp">
          <button className="make-room-button" onClick={handleRoomMake}>
            <img src="make-room-icon.png" />
          </button>
          <div>
            ルーム作成
          </div>
        </div>
        <div className="join-room-gourp">
          <button className="join-room-button" onClick={handleRoomJoin}>
            <img src="join-room-icon.png" />
          </button>
          <div>
            ルーム参加
          </div>
        </div>
      </div>
      <div className="player-info">
        <div>
          <p>ID: {user.userId}</p>
          <p>Name: {user.userName}</p>
        </div>
      </div>
    </div>
  );
}
