import "../Game.css";

export default function PlayerStatus() {
  return (
    <div className="player-status-container">
      <div className="player-status">
        <div className="player-upper-row">
          <img className="status-icon" src="player1-status-icon.svg" alt="プレイヤー1アイコン" />
          <div className="player-name">プレイヤー1</div>
        </div>
        <div className="player-lower-row">
          <div className="player-points">4pt</div>
          <img className="is-playing" src="game-controller.svg" alt="操作中アイコン" />
        </div>
      </div>
      <div className="player-status">
        <div className="player-upper-row">
          <img className="status-icon" src="player2-status-icon.svg" alt="プレイヤー2アイコン" />
          <div className="player-name">プレイヤー2</div>
        </div>
        <div className="player-lower-row">
          <div className="player-points">12pt</div>
          {/* <img className="is-playing" src="game-controller.svg" alt="操作中アイコン" /> */}
        </div>
      </div>
      <div className="player-status">
        <div className="player-upper-row">
          <img className="status-icon" src="player3-status-icon.svg" alt="プレイヤー3アイコン" />
          <div className="player-name">プレイヤー3</div>
        </div>
        <div className="player-lower-row">
          <div className="player-points">10pt</div>
          {/* <img className="is-playing" src="game-controller.svg" alt="操作中アイコン" /> */}
        </div>
      </div>
      <div className="player-status">
        <div className="player-upper-row">
          <img className="status-icon" src="demon-status-icon.svg" alt="鬼アイコン" />
          <div className="player-name">プレイヤー4</div>
        </div>
        <div className="player-lower-row">
          {/* <img className="is-playing" src="game-controller.svg" alt="操作中アイコン" /> */}
        </div>
      </div>
    </div>
  );
}
