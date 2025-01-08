import "../App.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function RoomCreate() {
  const navigate = useNavigate();

  // 部屋番号とメンバーリストの状態を管理
  const [roomNumber, setRoomNumber] = useState("");
  const [members] = useState(["ホスト"]); // 初期状態に部屋作成者を追加

  useEffect(() => {
    // ランダムな部屋番号を生成
    const generateRoomNumber = () => {
      return Math.floor(1000 + Math.random() * 9000).toString(); // 4桁のランダムな数字
    };
    setRoomNumber(generateRoomNumber());
  }, []);

  const handleExit = () => {
    // 退出処理をここに記述
    console.log("退出しました");
    navigate("/"); // トップ画面へ遷移
  };

  const handleStartGame = () => {
    // ゲーム開始処理をここに記述
    console.log("ゲームを開始します");
    alert("ゲームが開始されました！");
  };

  return (
    <div className="make-or-join-room">
      <div className="make-room-gourp">
        {/* 部屋番号を表示 */}
        <p>部屋番号: {roomNumber}</p>
        <p>参加メンバー:</p>
        {/* メンバーリストを表示 */}
        <ul>
          {members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>

        <div className="button-group">
          <button className="make-room-button" onClick={handleExit}>
            退出
          </button>
          <button className="make-room-button" onClick={handleStartGame}>
            ゲームスタート
          </button>
        </div>
      </div>
    </div>
  );
}
