import { React } from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct/AddProduct";
import Edit from "./pages/Edit/Edit";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import "./App.scss";

function App() {
  let token = localStorage.getItem("token");
  // if (!token) {
  //   window.location = "/login";
  // }

  return (
    <>
      <div className="contayner">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<Edit token={token} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
