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
            <h2>ゲームの遊び方</h2>
            <p>さいころを振ってマス目を移動する鬼ごっこゲーム！１０ターンの間にゲームを進めよう。</p>
            <h3>村人</h3>
            <p>さいころを振って鬼から逃げよう！イベントマスに止まったら、ポイント獲得かイベントの発生を選択しよう。<br/>
              全ターン終了までに逃げ切った人の中で、最も多くのポイントを獲得した村人が勝利！<br/>
              注意！！他の村人と同じマスには止まれないよ。</p>
            <h3>鬼</h3>
            <p>さいころを振って村人を捕まえよう！村人と同じマスに止まると捕まえられるよ。イベントマスに止まると、イベントが発生！？ゲームを有利に進めよう。<br/>
              全てのターンが終了するまでに村人を全員捕まえたら鬼の勝利！</p>
            <button onClick={toggleRulePopup} className="close-button">閉じる</button>
          </div>
        </div>
      )}

      {/*戦績確認*/}
        <div className="menu-item">
          <button className="menu-botton">
            <img src="battle-record-icon.png" className="menu-icon" alt="Battle Record Icon" />
          </button>
          <div className="menu-description">戦績</div>
        </div>

        {/*ログアウト*/}
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
