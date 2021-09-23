import { useState } from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { PokemonContext } from "../../context/pokemonContext";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import StartPage from "./routes/Start";

const GamePage = () => {
  const [selectedPokemons, setSelectedPokemons] = useState({});

  const match = useRouteMatch();
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
        onSelectedPokemons: handlerSelectedPokemons,
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
