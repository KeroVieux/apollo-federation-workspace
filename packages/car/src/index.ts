import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';

const typeDefs = gql`
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])
type Car {
    id: ID!
    name: String
}

type Query {
    cars: [Car]
}
`;

const cars = [
    {
        id: 1,
        name: 'toyota',
    },
    {
        id: 2,
        name: 'honda',
    },
];

const resolvers = {
    Query: {
        cars: () => cars,
    },
};

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4002 },
});

console.log(`🚀 Car Server ready at: ${url}`);
