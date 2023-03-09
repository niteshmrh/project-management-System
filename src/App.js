import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import PersonDetails from "./pages/PersonDetails";
import CameraOn from "./components/CameraOn";
import Camera from "./components/Camera";
// import AddNewPerson from "./pages/AddNewPerson";

function App() {
  return (
    <div>
      <Header />
      {/* <Home /> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:id" element={<PersonDetails />}></Route>
        {/* <Route path="addnewperson" element={<AddNewPerson />}></Route>
        <Route path="camera" element={<CameraOn />}></Route> */}
        <Route path="camera/:id" element={<CameraOn />}></Route>
      </Routes>
      {/* <Camera /> */}
    </div>
  );
}

export default App;
