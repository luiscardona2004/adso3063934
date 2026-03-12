import { useState } from "react";
import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";

function Example6Props() {

    const [selectedType, setSelectedType] = useState("all");
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    // ==========================
    // Data
    // ==========================
    const [pokemon, setPokemon] = useState([
        {
            id: 1,
            name: "Zapdos",
            type: "electric",
            power: "Static",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png",
            legendary: true,
        },
        {
            id: 2,
            name: "Squirtle",
            type: "water",
            power: "Torrent",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
            legendary: false,
        },
        {
            id: 3,
            name: "Bulbasaur",
            type: "grass/poison",
            power: "Overgrow",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
            legendary: false,
        },
        {
            id: 4,
            name: "Charizard",
            type: "fire/flying",
            power: "Blaze",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
            legendary: false,
        },
        {
            id: 5,
            name: "Pikachu",
            type: "electric",
            power: "Static",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
            legendary: false,
        },
    ]);

    const possiblePokemon = [
        {
            name: "Dragonite",
            type: "dragon/flying",
            power: "Inner Focus",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
            legendary: false,
        },
        {
            name: "Mew",
            type: "psychic",
            power: "Synchronize",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
            legendary: true,
        },
        {
            name: "Gyarados",
            type: "water/flying",
            power: "Intimidate",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png",
            legendary: false,
        }
    ];

    const addPokemon = () => {

        const randomIndex = Math.floor(Math.random() * possiblePokemon.length);

        const randomPokemon = possiblePokemon[randomIndex];

        const newPokemon = {
            id: pokemon.length + 1,
            ...randomPokemon
        };

        setPokemon([...pokemon, newPokemon]);
    };

 
    const filteredPokemon =
        selectedType === "all"
            ? pokemon
            : pokemon.filter(p =>
                p.type.toLowerCase().includes(selectedType)
            );

    // ==========================
    // Stiles
    // ==========================
    const styles = {
        cards: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
        },
        filterButtons: {
            marginBottom: "20px",
        },
        modalOverlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        modal: {
            color: 'black',
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            minWidth: "300px",
        }
    };

    // ==========================
    // RETURN
    // ==========================
    return (
        <div className="container">

            <BtnBack />

            <h2>Example 6</h2>

            <button onClick={addPokemon}>
                Add Pokemon
            </button>

            {/* FILTER BUTTONS */}
            <div style={styles.filterButtons}>
                <button onClick={() => setSelectedType("all")}>All</button>
                <button onClick={() => setSelectedType("electric")}>Electric</button>
                <button onClick={() => setSelectedType("water")}>Water</button>
                <button onClick={() => setSelectedType("grass")}>Grass</button>
                <button onClick={() => setSelectedType("fire")}>Fire</button>
            </div>

            {/* CARDS */}
            <div style={styles.cards}>
                {filteredPokemon.map((poke) => (
                    <div key={poke.id} onClick={() => setSelectedPokemon(poke)}>
                        <CardPokemon
                            name={poke.name}
                            type={poke.type}
                            power={poke.power}
                            image={poke.image}
                            legendary={poke.legendary}
                        />
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {selectedPokemon && (
                <div
                    style={styles.modalOverlay}
                    onClick={() => setSelectedPokemon(null)}
                >
                    <div
                        style={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>{selectedPokemon.name}</h2>
                        <img src={selectedPokemon.image} alt="" width="200" />
                        <p><strong>Type:</strong> {selectedPokemon.type}</p>
                        <p><strong>Power:</strong> {selectedPokemon.power}</p>
                        <p>
                            <strong>Legendary:</strong>{" "}
                            {selectedPokemon.legendary ? "Yes" : "No"}
                        </p>
                        <button onClick={() => setSelectedPokemon(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Example6Props;