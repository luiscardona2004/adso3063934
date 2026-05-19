import { useEffect, useState, useRef } from "react";
import api from "../api/api";
import dashboardImg from "../images/Dashboard.png";
import defaultPet from "../images/defect_image.png";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();

 

  const [pets, setPets] = useState([]);

  const getPets = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/pets/list", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPets(response.data.data);

    } catch (error) {

      console.error(error);

    }

  };
  const deletePet = async (id) => {

    const confirm = await Swal.fire({
      title: "Delete pet?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it"
    });

    if (confirm.isConfirmed) {

      try {

        const token = localStorage.getItem("token");

        const response = await api.delete(`/pets/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: response.data.message
        });

        // quitar mascota del estado sin recargar
        setPets(pets.filter(pet => pet.id !== id));

      } catch (error) {

        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Error deleting pet"
        });

      }

    }

  };

  const logout = async () => {

    const confirm = await Swal.fire({
      title: "Logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes"
    });

    if (confirm.isConfirmed) {

      try {

        const token = localStorage.getItem("token");

        await api.post("/logout", {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      } catch (error) {
        console.log("logout error", error);
      }

      localStorage.removeItem("token");

      navigate("/");

    }

  };

  useEffect(() => {
    getPets();
  }, []);

  return (

    <main id="dashboard">

      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <img src={dashboardImg} alt="Dashboard" />
        <button className="btnLogout" onClick={logout}>
          Logout
        </button>

      </header>

      <nav>

        <Link to="/add" className="add btnAdd">
          + Add Pet
        </Link>




        <button className="btnScroll" onClick={scrollToBottom}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="#FED671" viewBox="0 0 256 256"><path d="M231.39,132.94A8,8,0,0,0,224,128H184V104a8,8,0,0,0-8-8H80a8,8,0,0,0-8,8v24H32a8,8,0,0,0-5.66,13.66l96,96a8,8,0,0,0,11.32,0l96-96A8,8,0,0,0,231.39,132.94ZM128,220.69,51.31,144H80a8,8,0,0,0,8-8V112h80v24a8,8,0,0,0,8,8h28.69ZM72,40a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,40Zm0,32a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,72Z">
          </path>
          </svg>
        </button>
      </nav>

      <div className="petlist_title">
        <p>Pet List</p>
      </div>

      <section className="list" id="petList">

        {pets.map((pet) => (

          <div className="pet-card" key={pet.id}>

            <div className="pet-info">

              <img
                src={`http://127.0.0.1:8000/storage/${pet.image}`}
                alt={pet.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultPet;
                }}
              />

              <div className="pet-text">
                <h3>{pet.name}</h3>
                <p>{pet.kind}</p>
              </div>

            </div>

            <div className="pet-actions">

              <Link to={`/show/${pet.id}`} className="btnShow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#411F00" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
              </Link>

              <Link to={`/edit/${pet.id}`} className="btnEdit">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#411F00" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path></svg>
              </Link>

              <button
                className="btnDelete"
                onClick={() => deletePet(pet.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#411F00" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
              </button>


            </div>

          </div>

        ))}
        <div ref={bottomRef}></div>

      </section>

    </main>

  );

}

export default Dashboard;