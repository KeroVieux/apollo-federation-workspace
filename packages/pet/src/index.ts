import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';

const typeDefs = gql`
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])
type Pet {
    id: ID!
    name: String
}

type Query {
    pets: [Pet]
}
`;

const pets = [
    {
        id: 1,
        name: 'Kitty',
    },
    {
        id: 2,
        name: 'Micky',
    },
];

const resolvers = {
    Query: {
        pets: () => pets,
    },
};

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4004 },
});

console.log(`🚀 Pet Server ready at: ${url}`);
