import "../App.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function RoomJoin() {
  const navigate = useNavigate();
  const [roomNumber, setRoomNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomNumber.trim() !== "") {
      console.log("部屋番号:", roomNumber);
      navigate(`/room/${roomNumber}`); // 部屋番号をパスに渡して次の画面へ遷移
    } else {
      alert("部屋番号を入力してください！");
    }
  };

  return (
    <div className="make-or-join-room">
      <div className="join-room-gourp">
        <h2>ルーム参加</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="roomNumber">部屋番号</label>
            <input
              type="text"
              id="roomNumber"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="部屋番号を入力"
            />
          </div>
          <button className="join-room-button">参加</button>
        </form>
        <button
          className="back-button"
          onClick={() => console.log("トップ画面に戻る")}
        >
          トップ画面に戻る
        </button>
      </div>
    </div>
  );
}
