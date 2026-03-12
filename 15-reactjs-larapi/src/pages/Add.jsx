import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/api";

import btnBack from "../images/btn_back.png";
import addPet from "../images/add_pet.png";
import defaultImage from "../images/defect_image.png";

function Add() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    breed: "",
    kind: "",
    weight: "",
    age: "",
    location: "",
    description: "",
    image: null
  });

  const [preview, setPreview] = useState(defaultImage);
  const [loading, setLoading] = useState(false);

  // manejar cambios
  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "image") {

      const file = files[0];

      if (file) {
        setForm({
          ...form,
          image: file
        });

        setPreview(URL.createObjectURL(file));
      }

    } else {

      setForm({
        ...form,
        [name]: value
      });

    }

  };

  // enviar formulario
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("breed", form.breed);
      formData.append("kind", form.kind);
      formData.append("weight", form.weight);
      formData.append("age", form.age);
      formData.append("location", form.location);
      formData.append("description", form.description);

      if (form.image) {
        formData.append("image", form.image);
      }

      const response = await api.post("/pets/store", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
        confirmButtonColor: "#D98105"
      });

      navigate("/dashboard");

    } catch (error) {

      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong"
      });

    }

  };

  return (

    <main id="add">

      <header>

        <button className="btnBack" onClick={() => navigate(-1)}>
          <img src={btnBack} alt="back" />
        </button>

        <img src={addPet} alt="add pet" />

      </header>

      <form id="addForm" onSubmit={handleSubmit}>

        {/* PREVIEW IMAGEN */}

        <div className="preview-container">
          <img
            src={preview}
            alt="preview"
            className="pet-preview"
          />
        </div>

        <label>
          Image
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </label>

        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="Firulais"
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Breed
          <input
            type="text"
            name="breed"
            placeholder="Cocker"
            onChange={handleChange}
          />
        </label>

        <label className="lkind">
          Kind
          <select
            name="kind"
            required
            className="inputSelect"
            onChange={handleChange}
          >
            <option value="">Select Kind</option>
            <option value="Dog">🐶 Dog</option>
            <option value="Cat">🐱 Cat</option>
            <option value="Other">🐾 Other</option>
          </select>
        </label>

        <label>
          Weight
          <input
            type="number"
            name="weight"
            placeholder="14.5"
            onChange={handleChange}
          />
        </label>

        <label>
          Age
          <input
            type="number"
            name="age"
            placeholder="10"
            onChange={handleChange}
          />
        </label>

        <label>
          Location
          <input
            type="text"
            name="location"
            placeholder="Bogota"
            onChange={handleChange}
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            placeholder="Nice dog so charming lovely"
            onChange={handleChange}
          ></textarea>
        </label>

        <div className="actions">

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
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

    </main>

  );

}

export default Add;