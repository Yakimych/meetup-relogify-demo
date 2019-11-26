import React from "react";
import "./App.css";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Results } from "./__generated__/Results";

const RESULTS = gql`
  query Results {
    results(order_by: { id: desc }) {
      id
      player1 {
        name
      }
      player1Points
      player2 {
        name
      }
      player2Points
    }
  }
`;

const ADD_RESULT = gql`
  mutation AddResult(
    $player1Name: String!
    $player1Points: Int!
    $player2Name: String!
    $player2Points: Int!
  ) {
    insert_results(
      objects: {
        player1: {
          data: { name: $player1Name }
          on_conflict: { constraint: players_name_key, update_columns: name }
        }
        player2: {
          data: { name: $player2Name }
          on_conflict: { constraint: players_name_key, update_columns: name }
        }
        player1Points: $player1Points
        player2Points: $player2Points
      }
    ) {
      affected_rows
    }
  }
`;

const App: React.FC = () => {
  const { loading, error, data } = useQuery<Results>(RESULTS);
  const [addResultMutation] = useMutation(ADD_RESULT);

  const [player1Name, setPlayer1Name] = React.useState<string>("");
  const [player2Name, setPlayer2Name] = React.useState<string>("");
  const [player1Points, setPlayer1Points] = React.useState<number>(0);
  const [player2Points, setPlayer2Points] = React.useState<number>(0);

  const addResult = () => {
    addResultMutation({
      variables: {
        player1Name,
        player2Name,
        player1Points,
        player2Points
      },
      refetchQueries: [{ query: RESULTS }]
    });
  };

  if (loading || data === undefined) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error!</span>;
  }

  return (
    <div className="App">
      <header className="App-header">Relogify Clone</header>
      <div className="result-row">
        <input
          className="player1-name"
          type="text"
          value={player1Name}
          onChange={e => setPlayer1Name(e.target.value)}
        />
        <input
          className="player-points"
          type="number"
          value={player1Points}
          onChange={e => setPlayer1Points(Number(e.target.value))}
        />
        <input
          className="player-points"
          type="number"
          value={player2Points}
          onChange={e => setPlayer2Points(Number(e.target.value))}
        />
        <input
          className="player2-name"
          type="text"
          value={player2Name}
          onChange={e => setPlayer2Name(e.target.value)}
        />
      </div>
      <button onClick={addResult}>Add</button>
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
