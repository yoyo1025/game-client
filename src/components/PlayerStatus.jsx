import "../Game.css";

export default function PlayerStatus() {
  return (
    <div className="player-status-container">
      <div className="player-status">
        <div className="player-info">
          <div style={{ display: "flex" }}>
            <img className="status-icon" src="player1-status-icon.svg" alt="" />
            <div className="player-name">プレイヤー1</div>
          </div>
          <div className="player-points">10pt</div>
        </div>
        <div className="player-turn-indicator">
          {/* <img className="is-playing" src="game-controller.svg"/> */}
        </div>
      </div>
      <div className="player-status">
        <div className="player-info">
          <div style={{ display: "flex" }}>
            <img className="status-icon" src="player2-status-icon.svg" alt="" />
            <div className="player-name">プレイヤー2</div>
          </div>
          <div className="player-points">12pt</div>
        </div>
        <div className="player-turn-indicator">
          <img className="is-playing" src="game-controller.svg"/>
        </div>
      </div>
      <div className="player-status">
        <div className="player-info">
          <div style={{ display: "flex" }}>
            <img className="status-icon" src="player3-status-icon.svg" alt="" />
            <div className="player-name">プレイヤー3</div>
          </div>
          <div className="player-points">8pt</div>
        </div>
        <div className="player-turn-indicator">
          {/* <img className="is-playing" src="game-controller.svg"/> */}
        </div>
      </div>
      <div className="player-status">
        <div className="player-info">
          <div style={{ display: "flex" }}>
            <img className="status-icon" src="demon-status-icon.svg" alt="" />
            <div className="player-name">プレイヤー4</div>
          </div>
        </div>
        <div className="player-turn-indicator">
          {/* <img className="is-playing" src="game-controller.svg"/> */}
        </div>
      </div>
    </div>
  );
}
