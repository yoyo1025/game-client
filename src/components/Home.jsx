import "../App.css";

export default function Home() {
  const handleClick = (message) => {
    alert(message);
  };

  return (
    <div>
      <div className="menu">
        <button
          className="menu-botton"
          onClick={() => handleClick("ルールアイコンがクリックされました")}
        >
          <img src="rule-icon.png" className="menu-icon" alt="Rule Icon" />
        </button>
        <button
          className="menu-botton"
          onClick={() => handleClick("戦績アイコンがクリックされました")}
        >
          <img src="battle-record-icon.png" className="menu-icon" alt="Battle Record Icon" />
        </button>
        <button
          className="menu-botton"
          onClick={() => handleClick("ログアウトアイコンがクリックされました")}
        >
          <img src="logout-icon.png" className="menu-icon" alt="Logout Icon" />
        </button>
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
