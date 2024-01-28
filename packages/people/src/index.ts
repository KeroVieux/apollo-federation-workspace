import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';

const typeDefs = gql`
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])
type People {
    id: ID!
    name: String
}

type Query {
    people: [People]
}
`;

const people = [
    {
        id: 1,
        name: 'Alice',
    },
    {
        id: 2,
        name: 'Carl',
    },
];

const resolvers = {
    Query: {
        people: () => people,
    },
};

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4003 },
});

console.log(`🚀 People Server ready at: ${url}`);
