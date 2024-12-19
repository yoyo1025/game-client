import Square from './Square';
import "../Game.css";

export default function Field() {
  const gridSize = 9; // 9×9 のマス目サイズ
  const totalSquares = gridSize * gridSize; // 合計セル数
  
  // マス目を生成
  const squares = Array.from({ length: totalSquares });

  return (
      <div className="field-container">
        {squares.map((_, index) => (
          <Square key={index} />
        ))}
      </div>
  );
}
