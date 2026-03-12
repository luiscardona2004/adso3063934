import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";

function Example3Props() {
  // data
  const pokemon = [
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
    {
      id: 6,
      name: "Squirtle",
      type: "water",
      power: "Torrent",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
      legendary: false,
    },

    {
      id: 7,
      name: "Onix",
      type: "rock/ground",
      power: "Rock Head",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png",
      legendary: false,
    },
    {
      id: 8,
      name: "Gengar",
      type: "ghost/poison",
      power: "Cursed Body",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
      legendary: false,
    },
    {
      id: 9,
      name: "Chikorita",
      type: "grass",
      power: "Overgrow",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png",
      legendary: false,
    },
    {
      id: 10,
      name: "Venusaur",
      type: "grass/poison",
      power: "Overgrow",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      legendary: false,
    },
    {
      id: 11,
      name: "Mewtwo",
      type: "psychic",
      power: "Pressure",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
      legendary: true,
    },
    {
      id: 12,
      name: "Snorlax",
      type: "normal",
      power: "Thick Fat",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png",
      legendary: false,
    },

  ];

  // styles
  const style = {
    cards: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
  };

  return (
    <div className="container">
        <BtnBack />
      <h2>Example 3: Props</h2>
      <p>Pass data from parent to children (like function arguments)</p>
      <div style={style.cards}>
        {/* We pass different props to each card */}
        
        {
          pokemon.map((pokemon) => (
            <CardPokemon
             key={pokemon.id} 
             name={pokemon.name} 
             type={pokemon.type} 
             power={pokemon.power} 
             image={pokemon.image}
             legendary={pokemon.legendary} />
          ))
        }

      </div>
    </div>
  );
}

export default Example3Props;