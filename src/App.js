import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RoomMake from "./components/RoomMake";
import RoomJoin from "./components/RoomJoin";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/room-make" element={<RoomMake />}/>
        <Route path="/room-join" element={<RoomJoin />}/>
      </Routes>
    </div>
  )
}