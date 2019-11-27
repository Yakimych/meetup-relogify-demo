import React from "react";
import "./App.css";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Results } from "./__generated__/Results";

const RESULTS = gql`
  query Results {
    results {
      id
      player1Points
      player2Points
      player1 {
        name
      }
      player2 {
        name
      }
    }
  }
`;

const App: React.FC = () => {
  const { loading, error, data } = useQuery<Results>(RESULTS);

  if (loading || data === undefined) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error!</span>;
  }

  return (
    <div className="App">
      <header className="App-header">Relogify Clone</header>
      {data.results.map(r => (
        <div className="result-row" key={r.id}>
          <span className="player-name">{r.player1.name}</span>
          <span className="player-points">{r.player1Points}</span>
          <span>:</span>
          <span className="player-points">{r.player2Points}</span>
          <span className="player-name">{r.player2.name}</span>
        </div>
      ))}
    </div>
  );
};

export default App;
