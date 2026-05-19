import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import Swal from "sweetalert2";
import './App.css';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Show from './pages/Show';

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {

  const navigate = useNavigate();

  useEffect(() => {

    const checkLogout = (event) => {

      if (event.key === "token" && event.newValue === null) {

        Swal.fire({
          icon: "warning",
          title: "Session expired",
          text: "Your session has expired. Please login again."
        }).then(() => {

          navigate("/");

        });

      }

    };

    window.addEventListener("storage", checkLogout);

    return () => {
      window.removeEventListener("storage", checkLogout);
    };

  }, []);

  useEffect(() => {

  const token = localStorage.getItem("token");

  if (!token) {

    Swal.fire({
      icon: "warning",
      title: "Session expired",
      text: "Please login again"
    }).then(() => {

      navigate("/");

    });

  }

}, []);

  return (

    <div className="App">

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add" element={<Add />} />

        <Route path="/edit/:id" element={<Edit />} />

        <Route path="/show/:id" element={<Show />} />

      </Routes>

    </div>

  );

}

export default AppWrapper;