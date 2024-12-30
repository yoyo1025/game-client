import "../Game.css";

export default function PlayerStatus({ players }) {
  const playerIcons = [
    "player1-status-icon.svg",
    "player2-status-icon.svg",
    "player3-status-icon.svg",
    "demon-status-icon.svg",
  ];

  return (
    <div className="player-status-container">
      {playerIcons.map((icon, index) => (
        <div className="player-status" key={index}>
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
                {index < 3 && (
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
  );
}