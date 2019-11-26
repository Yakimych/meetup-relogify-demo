/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddResult
// ====================================================

export interface AddResult_insert_results {
  __typename: "results_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface AddResult {
  /**
   * insert data into the table: "results"
   */
  insert_results: AddResult_insert_results | null;
}

export interface AddResultVariables {
  player1Name: string;
  player1Points: number;
  player2Name: string;
  player2Points: number;
}
