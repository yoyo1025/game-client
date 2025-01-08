import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {

  const navigate = useNavigate();
  const [isRulePopupVisible, setIsRulePopupVisible] = useState(false);
  const handleRoomMake = () => {
    navigate('/room-make')
  }
  const handleRoomJoin = () => {
    navigate('/room-join')
  }

  const toggleRulePopup = () => {
    setIsRulePopupVisible(!isRulePopupVisible);
  }

  return (
    <div>
      <div className="menu">
        {/* ルールボタン */}
        <div className="menu-item">
          <button className="menu-botton" onClick={toggleRulePopup}>
            <img src="rule-icon.png" className="menu-icon" alt="Rule Icon" />
          </button>
          <div className="menu-description">ルール</div>
        </div>

        {/* ポップアップ表示 */}
      {isRulePopupVisible &&(
        <div className="popup-overlay" onClick={toggleRulePopup}>
          <div className={`anim-box popup ${isRulePopupVisible ? "is-animated" : ""}`}
          onClick={(e)=>e.stopPropagation()}>
            <h2>ルール</h2>
            <p>ゲームルール詳細</p>
            <button onClick={toggleRulePopup} className="close-button">閉じる</button>
          </div>
        </div>
      )}

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
            <img src="make-room-icon.png" alt="Make Room"/>
          </button>
          <div>
            ルーム作成
          </div>
        </div>
        <div className="join-room-gourp">
          <button className="join-room-button" onClick={handleRoomJoin}>
            <img src="join-room-icon.png" alt="Join Room"/>
          </button>
          <div>
            ルーム参加
          </div>
        </div>
      </div>

      <div className="player-info">
        <div>
          <p>ID: BP12345</p>
          <p>Name: シバウラ太郎</p>
        </div>
      </div>
    </div>
  );
}
