import "../Game.css";
import { useContext, useState } from "react";
import EventModal from "./EventModal"; // 先ほど作成したモーダルコンポーネントをインポート
import { UserContext } from "./Home";

export default function Square({ 
  x, 
  y, 
  occupant,
  icon,
  isRed, 
  isYellow, 
  isGreen, 
  isBlue, 
  isEventSquare,
  isMovable,
  isAlive,
  isDemon,
  onClickMove,
  currentPlayerIndex,
  setPlayers,
  setTurn,
  setPlayerPositions,
  setPrepareEvent
}) {
  // モーダル表示を管理するためのステート
  const [showModal, setShowModal] = useState(false);
  
  const user = useContext(UserContext);

  const fetchPoint = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/get-point', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "userId": user.userId,
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error from server:", errorData.error);
        alert(errorData.error)
        return;
      }

      const data = await res.json();
      console.log("point added");

      setPlayers(data.players || []);
      setTurn({
        maxTurn: data.turn.maxTurn || 0,
        currentTurn: data.turn.currentTurn || 0,
        currentPlayerIndex: data.turn.currentPlayerIndex || 0,
        maxPlayerIndex: data.turn.maxPlayerIndex || 0,
        maxTurnReached: data.turn.maxTurnReached || false,
      });
      setPlayerPositions(data.playerPositions || {});


    } catch (error) {
      console.error('Error fetching point:', error);
    }
  };

  // イベントマスかつ移動可能な場合に呼ばれる関数
  const handleEventSquare = () => {
    setShowModal(true);
  };

  // モーダル内で「ポイント取得」を選んだときの処理
  const handleSelectPoint = () => {
    fetchPoint();
    console.log("ポイント取得が選択されました");
    setShowModal(false);
    onClickMove(x, y);
  };

  // モーダル内で「イベント実行」を選んだときの処理
  const handleSelectEvent = () => {
    console.log("イベント実行が選択されました");
    setShowModal(false);
    onClickMove(x, y);
    setPrepareEvent(true);
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    console.log(`Clicked square at (${x}, ${y})`);
    if (occupant) {
      console.log(`Occupied by: ${occupant.id}`);
    }
    // イベントマスかつ移動可能な場合はモーダルを表示
    if (isEventSquare && isMovable) {
      handleEventSquare();
    } 
    // 通常マスで移動可能な場合、モーダルを出さずにそのまま移動
    else if (isMovable) {
      onClickMove(x, y);
    } else {
      console.log(`Square at (${x}, ${y}) is not movable.`);
    }
  };

  return (
    <>
      <button
        className={`
          square
          ${isRed ? "square-red" : ""} 
          ${isYellow ? "square-yellow" : ""} 
          ${isGreen ? "square-green" : ""} 
          ${isBlue ? "square-blue" : ""} 
          ${isMovable ? "square-movable" : ""}
        `}
        title={`(${x}, ${y})`}
        onClick={handleClick}
      >
        {(occupant || (isAlive || isDemon )) && <img src={icon} alt={icon} />}
      </button>

      {/* showModal が true のときにモーダルを表示 */}
      {showModal && (
        <EventModal 
          onClose={handleCloseModal} 
          onSelectPoint={handleSelectPoint}
          onSelectEvent={handleSelectEvent}
          currentPlayerIndex={currentPlayerIndex}
        />
      )}
    </>
  );
}
