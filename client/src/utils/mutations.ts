import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($input: ProfileInput!) {
    addProfile(input: $input) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_SCORE = gql`
   mutation removeScore($profileId: ID!, $score: Int!) {
    removeScore(score: $score){
        _id
        name
        score
        }
      }
    `;

export const UPDATE_SCORE = gql`
    mutation updateScore($profileId: ID!, $score: Int!) {
        updateScore(profileId: $profileId, score: $newScore){
            _id
            score
        }
      }
    `;

