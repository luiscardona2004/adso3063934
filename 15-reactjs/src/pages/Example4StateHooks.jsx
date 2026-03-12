import { useState } from "react";
import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";


function Example4StateHooks() {

  const pokemons = [
    {
      id: 1, name: "Zapdos", type: "electric", power: "Static",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png", legendary: true
    },
    {
      id: 2, name: "Squirtle", type: "water", power: "Torrent",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png", legendary: false
    },
    {
      id: 3, name: "Bulbasaur", type: "grass", power: "Overgrow",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png", legendary: false
    },
    {
      id: 4, name: "Charizard", type: "fire", power: "Blaze",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png", legendary: false
    },
    {
      id: 5, name: "Pikachu", type: "electric", power: "Static",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png", legendary: false
    },
  ];

  // ultimo capturado
  const [pokemonCap, setPokemonCap] = useState(null);

  // lista de capturados
  const [capturados, setCapturados] = useState([]);

  function capturarPokemon() {

    const randomIndex = Math.floor(Math.random() * pokemons.length);
    const elegido = pokemons[randomIndex];

    setPokemonCap(elegido);

    // agregar al array (FORMA CORRECTA REACT)
    setCapturados(prev => [...prev, elegido]);

  }

  return (
    <div className="container">

      <BtnBack />

      <h2>Example 4: State Hooks</h2>

      <button onClick={capturarPokemon}>
        Yo te elijo
      </button>

      {/* CONTADOR */}
      <h3>Pokemones capturados: {capturados.length}</h3>


      {/* ULTIMO CAPTURADO */}
      {pokemonCap && (
        <div style={{ marginTop: "20px" }}>
          <h4>Último capturado</h4>

          <CardPokemon
            name={pokemonCap.name}
            type={pokemonCap.type}
            power={pokemonCap.power}
            image={pokemonCap.image}
            legendary={pokemonCap.legendary}
          />

        </div>
      )}


      {/* TODOS LOS CAPTURADOS */}
      {capturados.length > 0 && (

        <div style={{ marginTop: "30px" }}>

          <h4>Mi colección</h4>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
          }}>

            {capturados.map((p, index) => (
              <CardPokemon
                key={index}
                name={p.name}
                type={p.type}
                power={p.power}
                image={p.image}
                legendary={p.legendary}
              />
            ))}

          </div>

        </div>

      )}

    </div>
  );

}

export default Example4StateHooks;