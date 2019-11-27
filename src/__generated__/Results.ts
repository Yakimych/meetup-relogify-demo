/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Results
// ====================================================

export interface Results_results_player1 {
  __typename: "players";
  name: string;
}

export interface Results_results_player2 {
  __typename: "players";
  name: string;
}

export interface Results_results {
  __typename: "results";
  id: number;
  player1Points: number;
  player2Points: number;
  /**
   * An object relationship
   */
  player1: Results_results_player1;
  /**
   * An object relationship
   */
  player2: Results_results_player2;
}

export interface Results {
  /**
   * fetch data from the table: "results"
   */
  results: Results_results[];
}
