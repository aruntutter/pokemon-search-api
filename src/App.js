import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const results = response.data.results;

      const detailedPokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return pokemonDetails.data;
        })
      );

      setPokemonData(detailedPokemonData);
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="App">
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="pokemon-container">
        {filteredPokemon.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
