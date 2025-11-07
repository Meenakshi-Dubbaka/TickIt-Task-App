import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MyContext } from "./MyContext.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState("");
  const ProviderValues = {
    user,
    setUser,
  };
  useEffect(() => {
    setUser(""); // clears user every time page reloads
  }, []);
  return (
    <MyContext.Provider value={ProviderValues}>
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          ></Route>
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
