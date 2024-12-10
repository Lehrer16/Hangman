import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        email
        password
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
      }
    }
  }
`;

export const REMOVE_SCORE = gql`
   mutation removeScore($profileId: ID!, $score: Int!) {
    removeScore(score: $score){
        _id
        email
        score
        }
      }
    `;

export const UPDATE_SCORE = gql`
    mutation updateScore($userId: ID!, $score: Int!) {
        updateScore(userId: $userId, score: $newScore){
            _id
            score
        }
      }
    `;

