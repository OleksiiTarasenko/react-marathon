import { useEffect, useState } from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { PokemonContext } from "../../context/pokemonContext";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import StartPage from "./routes/Start";

const GamePage = () => {
  const [selectedPokemons, setSelectedPokemons] = useState({});
  const [selectedPokemons2, setSelectedPokemons2] = useState({});
  const [isWinner, setWinner] = useState("false");
 
  const clearSelectedPokemons = () => {
    setSelectedPokemons({});
    setSelectedPokemons([]);
    setWinner(false)
    
  };
  const match = useRouteMatch();

  useEffect(async () => {
    const player2Response = await fetch(
      "https://reactmarathon-api.netlify.app/api/create-player"
    );
    const player2Request = await player2Response.json();

    setSelectedPokemons2(() => {
      return player2Request.data.map((item) => ({
        ...item,
        possession: "red",
      }));
    });
  }, []);

 const  onWin = (result) => {
   setWinner((prevState) => prevState = result)
 }

  const handlerSelectedPokemons = (key, pokemon) => {
    setSelectedPokemons((prevState) => {
      if (prevState[key]) {
        const copyState = { ...prevState };
        delete copyState[key];

        return copyState;
      }
      return {
        ...prevState,
        [key]: pokemon,
      };
    });
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons: selectedPokemons,
        pokemons2: selectedPokemons2,
        winner: isWinner,
        onSelectedPokemons: handlerSelectedPokemons,
        clear: clearSelectedPokemons,
        onWin: onWin,
        
      }}
    >
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>
  );
};

export default GamePage;
