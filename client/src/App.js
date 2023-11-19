import "./App.scss";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";

function App() {
  const {user} = useContext(AuthContext);
  return (
    <Routes>
      {user ? (
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home type="movies"/>} />
          <Route path="/movies" element={<Home type="movies" />} />
          <Route path="/series" element={<Home type="series" />} />
          <Route path="/watch" element={<Watch />} />
        </Route>
      ) : (
        <Route path="/" element={<Navigate to="/login" replace />} />
      )}
      <Route path="login" element={!user ? <Login /> : <Navigate to="/" replace />} />
      {/* <Route path="register" element={!user ? <Register /> : <Navigate to="/" replace />} /> */}
    </Routes>
  );
}

export default App;
