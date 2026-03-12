import './CardPokemon.css';

    function CardPokemon({ name, type, power, image, legendary = false }) {

        const TypePokemon = {
            electric: '#ffd700',
            fire: '#f37735',
            water: '#4a90e2',
            grass: '#66bb6a',
            psychic: '#ff6b9d',   
            normal: '#9e9e9e'
        };

        return (
            <div
                className="pokemon-card"   
                style={{ borderColor: TypePokemon[type?.toLowerCase()] || '#ccc' }}
            >
                {image && <img src={image} alt={name} className="pokemon-image" />}
                <h3>{name}</h3>
                <p className='pokemon-type'>Type: {type}</p>
                <p className='pokemon-type'>Power: {power}</p>
                {legendary && <span className="legendary-badge">⭐Legendary⭐</span>}
            </div>
        );
    }

    export default CardPokemon;