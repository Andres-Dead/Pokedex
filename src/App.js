import React, { useState } from "react";
import pokemonLogo from "./images/logo-pokemon.png";
import axios from "axios";
import "./App.css";

const App = () => {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [pokemonAbility, setPokemonAbility] = useState("");
  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonAbility(res.data.abilities[0].ability.name);
      setPokemonData(toArray);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

 

  const handleOnInputChange = (e) => {
  	setPokemon(e.target.value.toLowerCase());
	getPokemon();
  }

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };

  return (
    <div className="App">
      <div className="App">
        <img id="logo" alt="logo" src={pokemonLogo} />
        <form onSubmit={handleSubmit}>
          <div className="wrap">
            <div id="search">
              <i className="fa fa-search searchIcon"></i>
              <input
                id="searchBox"
                type="text"
                onChange={handleOnInputChange}
                placeholder="  Try searching any pokemon..."
              />
            </div>
          </div>
        </form>
        <br />
        {pokemonData.map((data) => {
          return (
            <div className="pokeContainer">
              <div className="container">
                <img src={data.sprites["front_default"]} alt="POKEMON.png" />
                <div className="divTable">
                  <div className="divTableBody">
                    <div className="divTableRow">
                      <div className="divTableCell">{data.name}</div>
                    </div>
                    <div className="divTableRow">
                      <div className="divTableCellId">#{data.id}</div>
                    </div>
                    {/*<div className="divTableRow">
                <div className="divTableCell">Height</div>
                <div className="divTableCell">{" "}{data.height * 10} cm</div>
                </div>
                <div className="divTableRow">
                <div className="divTableCell">Weight</div>
                <div className="divTableCell">{" "}{data.weight/10} kg</div>
                </div>
                <div className="divTableRow">
                <div className="divTableCell">Hability</div>
                <div className="divTableCell">{pokemonAbility}</div>
                </div> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
