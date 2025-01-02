// EventModal.jsx
import React, { useContext } from "react";
import "../Game.css";
import { UserContext } from "./Home";

export default function EventModal({ 
  onClose, 
  onSelectPoint, 
  onSelectEvent, 
  currentPlayerIndex
}) {

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>ポイント取得  or  イベント実行</h1>
        <div className="modal-buttons">
          {currentPlayerIndex !== 4 && (
              <button onClick={onSelectPoint} className="modal-button">
                ポイント取得
              </button>
            )}
          <button onClick={onSelectEvent}>イベント実行</button>
        </div>
        <button className="modal-close" onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}
