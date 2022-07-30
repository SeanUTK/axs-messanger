import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthContext } from "./context/auth";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="../" /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="../" /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
