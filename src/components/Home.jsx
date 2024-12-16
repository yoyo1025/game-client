import "../App.css";

export default function Home() {
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
          <button className="make-room-button">
            <img src="make-room-icon.png" />
          </button>
          <div>
            ルーム作成
          </div>
        </div>
        <div className="join-room-gourp">
          <button className="join-room-button">
            <img src="join-room-icon.png" />
          </button>
          <div>
            ルーム参加
          </div>
        </div>
      </div>
    </div>
  );
}
