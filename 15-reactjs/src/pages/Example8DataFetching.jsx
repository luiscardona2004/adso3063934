import { useEffect, useState } from 'react';
import BtnBack from "../components/BtnBack";

function Example8DataFetching() {

    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);

    const limit = 25;

    useEffect(() => {

        setLoading(true);

        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            .then(res => res.json())
            .then(async data => {

                const detailedPokemons = await Promise.all(
                    data.results.map(pokemon =>
                        fetch(pokemon.url).then(res => res.json())
                    )
                );

                setPokemons(detailedPokemons);

                // 🔥 Selecciona automáticamente el primero de la nueva página
                setSelectedPokemon(detailedPokemons[0]);

                setLoading(false);
            });

    }, [offset]);

    if (loading) return <h3>Loading Pokédex...</h3>;

    return (
        <div className='container'>
            <BtnBack />
            <h2>Example 8: Pokédex</h2>
            {/* 🔥 PAGINACIÓN */}
            <div style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
                gap: "20px"
            }}>

                <button
                    onClick={() => setOffset(offset - limit)}
                    disabled={offset === 0}
                    style={{
                        padding: "8px 15px",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256"><path d="M232,200a8,8,0,0,1-16,0,88.1,88.1,0,0,0-88-88H51.31l34.35,34.34a8,8,0,0,1-11.32,11.32l-48-48a8,8,0,0,1,0-11.32l48-48A8,8,0,0,1,85.66,61.66L51.31,96H128A104.11,104.11,0,0,1,232,200Z"></path></svg>
                </button>

                <button
                    onClick={() => setOffset(offset + limit)}
                    style={{
                        padding: "8px 15px",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256"><path d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H128a88.1,88.1,0,0,0-88,88,8,8,0,0,1-16,0A104.11,104.11,0,0,1,128,96h76.69L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66Z"></path></svg>
                </button>

            </div>
            <div style={{
                display: "flex",
                gap: "40px",
                marginTop: "20px",
                alignItems: "flex-start"
            }}>


                {/* 🔥 LISTA IZQUIERDA */}
                <div style={{
                    flex: 1,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                    gap: "15px"
                }}>
                    {pokemons.map(pokemon => (
                        <div
                            key={pokemon.id}
                            onClick={() => setSelectedPokemon(pokemon)}
                            style={{
                                background: selectedPokemon?.id === pokemon.id
                                    ? "#4f46e5"
                                    : "#1f1f1f",
                                padding: "10px",
                                borderRadius: "12px",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "0.2s"
                            }}
                        >
                            <img
                                src={pokemon.sprites.front_default}
                                alt={pokemon.name}
                                style={{ width: "70px" }}
                            />
                            <p style={{
                                color: "white",
                                fontSize: "12px",
                                marginTop: "5px"
                            }}>
                                {pokemon.name.toUpperCase()}
                            </p>
                        </div>
                    ))}
                </div>

                {/* 🔥 CARTA DERECHA (MÁS PEQUEÑA) */}
                <div style={{
                    width: "320px",
                    background: "#2b2b2b",
                    padding: "15px",
                    borderRadius: "15px",
                    color: "white",
                    boxShadow: "0 0 15px rgba(0,0,0,0.5)"
                }}>

                    {selectedPokemon && (
                        <>
                            <h3 style={{ textAlign: "center" }}>
                                {selectedPokemon.name.toUpperCase()}
                            </h3>

                            <div style={{ textAlign: "center" }}>
                                <img
                                    src={selectedPokemon.sprites.other["official-artwork"].front_default}
                                    alt={selectedPokemon.name}
                                    style={{ width: "150px" }}
                                />
                            </div>

                            <p><strong>ID:</strong> {selectedPokemon.id}</p>
                            <p><strong>Height:</strong> {selectedPokemon.height}</p>
                            <p><strong>Weight:</strong> {selectedPokemon.weight}</p>

                            <h4>Types:</h4>
                            <ul style={{ paddingLeft: "18px", listStyle: "none" }}>
                                {selectedPokemon.types.map((type, index) => (
                                    <li key={index}>{type.type.name}</li>
                                ))}
                            </ul>

                            <h4>Abilities:</h4>
                            <ul style={{ paddingLeft: "18px", listStyle: "none" }}>
                                {selectedPokemon.abilities.map((ability, index) => (
                                    <li key={index}>{ability.ability.name}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Example8DataFetching;