import { useEffect, useState } from "react";
import api from "../api/api";
import dashboardImg from "../images/Dashboard.png";
import defaultPet from "../images/defect_image.png";

import { Link } from "react-router-dom";

function Dashboard() {

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

      </header>

      <nav>

        <Link to="/add" className="add btnAdd">
          + Add Pet
        </Link>

        <a href="#" className="btnLogout">
          Logout
        </a>

      </nav>

      <div className="petlist">
        Pet List
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
              </Link>

              <Link to={`/edit/${pet.id}`} className="btnEdit">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path></svg>
              </Link>

              <Link to={`/delete/${pet.id}`} className="btnDelete">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
              </Link>



            </div>

          </div>

        ))}

      </section>

    </main>

  );

}

export default Dashboard;