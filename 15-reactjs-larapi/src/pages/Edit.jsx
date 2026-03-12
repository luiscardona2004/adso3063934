import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/api";

import btnBack from "../images/btn_back.png";
import editPet from "../images/edit.png";
import defect_image from "../images/defect_image.png";

function Edit() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [pet, setPet] = useState({
        name: "",
        breed: "",
        kind: "",
        weight: "",
        age: "",
        location: ""
    });

    const token = localStorage.getItem("token");

    // TRAER MASCOTA
    useEffect(() => {

        const fetchPet = async () => {

            try {

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

        fetchPet();

    }, [id, token]);

    // ACTUALIZAR INPUTS
    const handleChange = (e) => {

        setPet({
            ...pet,
            [e.target.name]: e.target.value
        });

    };

    // ENVIAR FORMULARIO
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.put(`/pets/edit/${id}`, pet, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            Swal.fire({
                icon: "success",
                title: "Updated!",
                text: response.data.message,
                confirmButtonText: "Aceptar"
            });

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

        <main id="edit">

            <header>

                <img className="btnBack"
                    onClick={() => navigate("/dashboard")}
                    src={btnBack} alt="Back" />

                <img src={editPet} alt="edit" />

            </header>

            <section className="edit-container">

                <img className="pet-image-edit"
                    src={
                        pet.image
                            ? `http://127.0.0.1:8000/storage/${pet.image}`
                            : defect_image
                    }
                    alt={pet.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defect_image;
                    }}
                />

                <form id="editForm" onSubmit={handleSubmit}>

                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            value={pet.name}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Breed
                        <input
                            type="text"
                            name="breed"
                            value={pet.breed}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Kind
                        <input
                            type="text"
                            name="kind"
                            value={pet.kind}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Weight
                        <input
                            type="text"
                            name="weight"
                            value={pet.weight}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Age
                        <input
                            type="text"
                            name="age"
                            value={pet.age}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Location
                        <input
                            type="text"
                            name="location"
                            value={pet.location}
                            onChange={handleChange}
                        />
                    </label>

                    <div className="actions">

                        <button type="submit">
                            Save
                        </button>

                        <button
                            type="button"
                            className="btnCancel"
                            onClick={() => navigate("/dashboard")}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </section>

        </main>

    );

}

export default Edit;