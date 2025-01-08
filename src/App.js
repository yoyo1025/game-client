import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RoomMake from "./components/RoomMake";
import RoomJoin from "./components/RoomJoin";
import Register from "./components/Register";
import Battle from "./components/Battle";
import PlayerStatus from "./components/PlayerStatus";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/room-make" element={<RoomMake />}/>
        <Route path="/room-join" element={<RoomJoin />}/>
        <Route path="/battle" element={<Battle/>}/>
        <Route path="/player-status" element={<PlayerStatus/>}/>
      </Routes>
    </div>
  )
}