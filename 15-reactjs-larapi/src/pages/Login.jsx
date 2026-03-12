import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/api";
import loginImg from "../images/LOGIN.png";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post("/login", {
        email: email,
        password: password
      });

      const token = response.data.token;

      // guardar token
      localStorage.setItem("token", token);

      // guardar usuario
      localStorage.setItem("user", JSON.stringify(response.data.user));

      Swal.fire({
        icon: "success",
        title: response.data.message,
        timer: 1500,
        showConfirmButton: false
      });

      // redireccionar
      navigate("/dashboard");

    } catch (error) {

      if (error.response) {
         Swal.fire({
          icon: "error",
          title: error.response.data.message
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error conectando con el servidor"
        });

      }

    }

  };

  return (

    <main id="login">

      <header>
        <img src={loginImg} alt="Login" />
      </header>

      <form id="loginForm" onSubmit={handleLogin}>

        <label>
          Email
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="Secret"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit" className="btnLogin">
          Login
        </button>

      </form>

    </main>

  );

}

export default Login;