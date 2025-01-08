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
      navigate(`/room/${roomNumber}`);
    } else {
      alert("部屋番号を入力してください！");
    }
  };

  return (
    <div className="make-or-join-room">
      <div className="join-room-gourp">
        <h2>ルーム参加</h2>
        <form onSubmit={handleSubmit} className="form-inline">
          <label htmlFor="roomNumber"></label>
          <input
            type="text"
            id="roomNumber"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            placeholder="部屋番号を入力"
          />
          <button className="join-room-button">参加</button>
        </form>
        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          トップ画面に戻る
        </button>
      </div>
    </div>
  );
}
