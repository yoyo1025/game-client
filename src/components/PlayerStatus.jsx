import "../Game.css";

export default function PlayerStatus({ players, turn, userId }) {
  const playerIcons = [
    "player1-status-icon.svg",
    "player2-status-icon.svg",
    "player3-status-icon.svg",
    "demon-status-icon.svg",
  ];

  return (
    <>
      <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
        <div style={{fontSize:"x-large", fontWeight: "bolder"}}>
          {turn.currentTurn} / {turn.maxTurn} ターン目
        </div>
        <div className="player-status-container">
          {playerIcons.map((icon, index) => (
            <div
              className="player-status"
              key={index}
              style={{
                backgroundColor:
                  players.length > index && players[index].userId === userId ? "#82e8a6" : "transparent",
              }}
            >
              <div className="player-upper-row">
                <img className="status-icon" src={icon} alt={`プレイヤー${index + 1}アイコン`} />
                <div className="player-name">
                  {players.length > index ? players[index].name : "Loading..."}
                </div>
              </div>
              <div className="player-lower-row">
                {players.length > index && players[index].points !== undefined ? (
                  <>
                    <div className="player-points">{players[index].points}pt</div>
                    {turn.currentPlayerIndex === index + 1 && (
                      <img
                        className="is-playing"
                        src="game-controller.svg"
                        alt="操作中アイコン"
                      />
                    )}
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}