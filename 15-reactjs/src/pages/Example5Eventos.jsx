import { useState } from "react";
import BtnBack from "../components/BtnBack";

function Example5Events() {
  const [chosenPokemon, setChosenPokemon] = useState(null);
  const [hoveredPokemon, setHoveredPokemon] = useState(null);
  const [inputRange, setInputRange] = useState(0);

  const handleChoice = (name) => {
    setChosenPokemon(name);
  };

  const handleMouseEnter = (name) => {
    setHoveredPokemon(name);
  };

  const handleMouseLeave = () => {
    setHoveredPokemon(null);
  };

  const handleInput = (e) => {
    setInputRange(e.target.value);
  };

  /* =========================
        Estilos 
     ========================= */

  const containerStyle = {
    maxWidth: "1100px",
    margin: "auto",
    padding: "30px",
    textAlign: "center",
    fontFamily: "system-ui, sans-serif",
    background: "#0007",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgb(51, 78, 231)",
  };

  const h2Style = {
    fontSize: "50px",
    marginBottom: "10px",
    WebkitTextStroke: "1px rgba(0, 225, 255, 0.979)",
    textShadow: "0 4px 10px rgba(0,0,0,.4)",
    color: "rgb(7, 102, 245)",
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
    fontStyle: "italic",
    letterSpacing: "1px",
  };

  const h3Style = {
    marginTop: "20px",
    fontSize: "22px",
    color: "#ffffff",
    fontStyle: "oblique",
  };

  const choosePok = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  };

  const buttonStyle = {
    marginTop: "15px",
    padding: "14px 28px",
    border: "none",
    borderRadius: "14px",
    fontSize: "20px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Times New Roman', Times, serif",
    color: "white",
    letterSpacing: "3px",
    background: "linear-gradient(135deg,#243fb8,#0592f0)",
    boxShadow:
      "0 8px 18px rgba(1, 174, 243, 0.2), inset 0 -3px 0 rgba(0,0,0,0.25)",
    transition: "all .25s ease",
  };

  const pokemonCard = {
    backgroundColor: "#2b2b2b",
    border: "2px solid",
    borderRadius: "0.8rem",
    padding: "1rem",
    position: "relative",
    margin: "0.8rem",
    textAlign: "center",
    transition: "transform 0.3s",
    width: "240px",
    color: "white",
  };

  const pokemonImage = {
    height: "120px",
    width: "120px",
    objectFit: "cover",
  };

  const sectionBox = {
    background: "white",
    padding: "20px",
    borderRadius: "18px",
    marginTop: "25px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  };

  const legendaryBadge = {
    display: "inline-block",
    backgroundColor: "gold",
    color: "#333",
    padding: "0.4rem 0.8rem",
    borderRadius: "0.2rem",
    fontSize: "0.8rem",
    fontWeight: "bold",
    position: "absolute",
    top: "-10px",
    right: "-10px",
    transform: "rotate(5deg)",
  };

  const rangeStyle = {
    width: "300px",
    appearance: "none",
    height: "8px",
    borderRadius: "10px",
    background: "linear-gradient(to right, red, white)",
    outline: "none",
  };

  /* ========================= */

  return (
    <div style={containerStyle}>
      <BtnBack />

      <h2 style={h2Style}>Example 5: Event Handling</h2>

      {/* CLICK SECTION */}
      <h3 style={h3Style}>Click Event</h3>

      <div style={choosePok}>
        {["Bulbasaur", "Charmander", "Squirtle"].map((poke) => (
          <button
            key={poke}
            onClick={() => handleChoice(poke)}
            style={{
              ...buttonStyle,
              transform:
                chosenPokemon === poke ? "scale(1.08)" : "scale(1)",
              background:
                chosenPokemon === poke
                  ? "#fff6"
                  : buttonStyle.background,
            }}
          >
            {poke}
          </button>
        ))}
      </div>

      <div style={sectionBox}>
        {chosenPokemon
          ? `🔥 You chose ${chosenPokemon}!`
          : "Please choose your starter Pokémon."}
      </div>

      {/* HOVER SECTION */}
      <h3 style={h3Style}>Hover Event</h3>

      <div style={choosePok}>
        {/* Pikachu */}
        <div
          style={{
            ...pokemonCard,
            transform:
              hoveredPokemon === "Pikachu"
                ? "scale(1.05)"
                : "scale(1)",
          }}
          onMouseEnter={() => handleMouseEnter("Pikachu")}
          onMouseLeave={handleMouseLeave}
        >
          {hoveredPokemon === "Pikachu" && (
            <span style={legendaryBadge}>⚡ Electric</span>
          )}
          <img
            style={pokemonImage}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            alt="Pikachu"
          />
          <h4>Pikachu</h4>
        </div>

        {/* Eevee */}
        <div
          style={{
            ...pokemonCard,
            transform:
              hoveredPokemon === "Eevee"
                ? "scale(1.05)"
                : "scale(1)",
          }}
          onMouseEnter={() => handleMouseEnter("Eevee")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            style={pokemonImage}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png"
            alt="Eevee"
          />
          <h4>Eevee</h4>
        </div>
      </div>

      {hoveredPokemon && (
        <div style={sectionBox}>
          👀 Estás viendo a: <strong>{hoveredPokemon}</strong>
        </div>
      )}

      {/* INPUT SECTION */}
      <h3 style={h3Style}>Input Event</h3>

      <input
        style={rangeStyle}
        type="range"
        min="0"
        max="100"
        step="2"
        onInput={handleInput}
      />

      <div style={sectionBox}>
        ⚡ Power: {inputRange}
      </div>
    </div>
  );
}

export default Example5Events;