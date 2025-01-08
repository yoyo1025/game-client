import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RoomMake from "./components/RoomMake";
import RoomJoin from "./components/RoomJoin";
import Logout from "./components/Logout";
import Result from "./components/Result";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/room-make" element={<RoomMake />}/>
        <Route path="/room-join" element={<RoomJoin />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/battleresult" element={<Result />}/>
      </Routes>
    </div>
  )
}