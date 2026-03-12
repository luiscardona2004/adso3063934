import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import BtnBack from "../components/BtnBack";




function GeneralInfo() {
    const listStyle = {
        listStyle: "none",
    };
    return (
        <div>
            <h2>🌎 What is Pokémon?</h2>
            <p>
                Pokémon is a Japanese media franchise created by Nintendo,
                Game Freak, and Creatures. It started in 1996 as a video game
                and became one of the most popular franchises in the world.
            </p>

            <p>
                In the Pokémon world, trainers capture creatures called
                Pokémon and train them to battle.
            </p>

            <h3>🔥 Main Types</h3>
            <ul style={listStyle}>
                <li>Electric ⚡</li>
                <li>Fire 🔥</li>
                <li>Water 💧</li>
                <li>Grass 🌱</li>
            </ul>
        </div>
    );
}

function PokemonList() {

    const listStyle = {
        listStyle: "none",
    };
    const pokemons = [
        { name: "Pikachu", type: "Electric ⚡" },
        { name: "Charmander", type: "Fire 🔥" },
        { name: "Bulbasaur", type: "Grass 🌱" },
        { name: "Squirtle", type: "Water 💧" }
    ];

    return (
        <div>
            <h2>📋 Pokémon List</h2>

            <ul style={listStyle}>
                {pokemons.map((pokemon, index) => (
                    <li key={index}>
                        <strong>{pokemon.name}</strong> - {pokemon.type}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function PokemonDetails() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const name = params.get("name");

    const pokemonData = {
        Pikachu: {
            type: "Electric ⚡",
            ability: "Static",
            description: "Pikachu stores electricity in its cheeks and releases it in powerful attacks."
        },
        Charmander: {
            type: "Fire 🔥",
            ability: "Blaze",
            description: "Charmander has a flame on its tail that burns brighter when it is strong."
        },
        Bulbasaur: {
            type: "Grass 🌱",
            ability: "Overgrow",
            description: "Bulbasaur has a plant bulb on its back that grows as it absorbs sunlight."
        },
        Squirtle: {
            type: "Water 💧",
            ability: "Torrent",
            description: "Squirtle uses its shell as protection and sprays water at high speed."
        }
    };

    const pokemon = pokemonData[name];

    if (!pokemon) {
        return <h2>Pokémon not found</h2>;
    }

    return (
        <div>
            <h2>🔍 {name} Details</h2>
            <p><strong>Type:</strong> {pokemon.type}</p>
            <p><strong>Ability:</strong> {pokemon.ability}</p>
            <p><strong>Description:</strong> {pokemon.description}</p>
        </div>
    );
}

function InternalNavigation() {

    const navStyle = {
        display: "flex",
        gap: "15px",
        margin: "20px 0"
    };

    const linkStyle = {
        textDecoration: "none",
        padding: "10px 18px",
        borderRadius: "12px",
        fontWeight: "600",
        color: "white",
        background: "linear-gradient(145deg, #2b2b2b, #1f1f1f)",
        boxShadow: "4px 4px 8px #141414, -4px -4px 8px #323232",
        transition: "all 0.3s ease"
    };

    const activeStyle = {
        background: "linear-gradient(145deg, #4f46e5, #4338ca)",
        boxShadow: "0 0 12px rgba(79, 70, 229, 0.6)"
    };

    

    return (
        <nav style={navStyle}>
            <NavLink
                to="/Example7"
                style={({ isActive }) =>
                    isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }
            >
                🏠 Home
            </NavLink>

            <NavLink
                to="/Example7/list"
                style={({ isActive }) =>
                    isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }
            >
                📋 List
            </NavLink>

            <NavLink
                to="/Example7/details?name=Pikachu"
                style={({ isActive }) =>
                    isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }
            >
                ⚡ Pikachu
            </NavLink>

            <NavLink
                to="/Example7/details?name=Charmander"
                style={({ isActive }) =>
                    isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }
            >
                🔥 Charmander
            </NavLink>
        </nav>
    );
}

function Example7Routing() {
    const location = useLocation()
    return (
        <div className='container'>
            <BtnBack />
            <h2>Example 7: React Route</h2>
            <p>Navigation between different 'pages' without reloading the browser.</p>
            <InternalNavigation />
            {/* absolute paths */}
            <Routes>
                <Route path='/' element={<GeneralInfo />}></Route>
                <Route path='/list' element={<PokemonList />}></Route>
                <Route path='/details' element={<PokemonDetails />}></Route>
                <Route path='/details' element={<PokemonDetails />}></Route>
            </Routes>
        </div>
    );
}
export default Example7Routing;
