import { GraphQLClient } from 'graphql-request';

const graphqlEndpoint = 'https://sse-frontend-assessment-api-823449bb66ac.herokuapp.com/graphql';  

export const client = new GraphQLClient(graphqlEndpoint, {
  headers: {
  },
});
