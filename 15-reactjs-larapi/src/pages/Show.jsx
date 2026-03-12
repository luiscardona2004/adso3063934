import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

import btnBack from "../images/btn_back.png";
import showPet from "../images/show.png";
import defaultPet from "../images/defect_image.png";

function Show() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [pet, setPet] = useState(null);

    const getPet = async () => {    

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(`/pets/show/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setPet(response.data.data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {
        getPet();
    }, []);

    if (!pet) {
        return <p>Loading...</p>;
    }

    return (

        <main id="show">

            <header>

                    <img className="btnBack"
                    onClick={() => navigate("/dashboard")}
                    src={btnBack} alt="Back" />
                
                <img src={showPet} alt="show" />

            </header>

            <section className="pet-detail">

                <img className="pet-image"
                    src={
                        pet.image
                            ? `http://127.0.0.1:8000/storage/${pet.image}`
                            : defaultPet
                    }
                    alt={pet.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultPet;
                    }}
                />
                <div class="card">

                    <h2>{pet.name}</h2>

                    <div className="item"><span>Kind:         </span> <p>  {pet.kind}</p></div>

                    <div className="item"><span>Breed:        </span> <p> {pet.breed}</p></div>

                    <div className="item"><span>Age:          </span> <p> {pet.age}</p></div>

                    <div className="item"><span>Weight:      </span> <p> {pet.weight} kg</p></div>

                    <div className="item"><span>Location:     </span><p> {pet.location}</p></div>

                    <div className="item"><span>Description:  </span><p> {pet.description}</p></div>
                </div>
            </section>

        </main>

    );

}

export default Show;