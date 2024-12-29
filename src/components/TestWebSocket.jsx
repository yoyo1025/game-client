import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const TestWebSocket = () => {
  const [messages, setMessages] = useState([]); // サーバーから受信したメッセージを保存
  const [name, setName] = useState(""); // ユーザー名
  const [message, setMessage] = useState(""); // メッセージ内容

  // WebSocket接続のセットアップ
  useEffect(() => {
    // SockJS + STOMP を使ってWebSocket接続
    const stompClient = Stomp.over(() => new SockJS("http://localhost:8080/gs-guide-websocket"));

    // 接続時にヘッダー（userIdなど）を渡す場合
    stompClient.connect(
      { userId: "myUserId" }, // ここを任意のuserIdに
      () => {
        console.log("Connected to WebSocket");

        // /topic/greetingsからのメッセージを購読
        stompClient.subscribe("/topic/greetings", (msg) => {
          const receivedMessage = JSON.parse(msg.body);
          setMessages((prev) => [...prev, receivedMessage.content]);
        });

        // 切断通知を受け取る購読（オプション）
        stompClient.subscribe("/topic/user-disconnected", (msg) => {
          console.log("User disconnected message:", msg.body);
        });
      }
    );

    // アンマウント時に切断
    return () => {
      stompClient.disconnect(() => {
        console.log("Disconnected from WebSocket");
      });
    };
  }, []);

  // メッセージ送信
  const sendMessage = () => {
    if (name && message) {
      // 上のuseEffectで作成した stompClient を再利用するなら
      // ここでは別のstompClientを作らないように注意する
      const stompClient = Stomp.over(() => new SockJS("http://localhost:8080/gs-guide-websocket"));
      stompClient.connect({}, () => {
        stompClient.send("/app/hello", {}, JSON.stringify({ name, message }));
      });
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>WebSocket Connection Test</h1>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>
          Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <button
        onClick={sendMessage}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send Message
      </button>
      <h2>Received Messages:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestWebSocket;
