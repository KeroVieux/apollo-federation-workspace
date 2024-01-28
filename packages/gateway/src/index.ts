import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway } from '@apollo/gateway';
import { watch } from 'fs';
import { readFile } from 'fs/promises';

const server = new ApolloServer({
    gateway: new ApolloGateway({
        async supergraphSdl({ update, healthCheck }) {
            const watcher = watch('./supergraph.graphql');
            watcher.on('change', async () => {
                try {
                    const updatedSupergraph = await readFile('./supergraph.graphql', 'utf-8');
                    await healthCheck(updatedSupergraph);
                    update(updatedSupergraph);
                } catch (e) {
                    console.error(e);
                }
            });

            return {
                supergraphSdl: await readFile('./supergraph.graphql', 'utf-8'),
                async cleanup() {
                    watcher.close();
                },
            };
        },
    }),
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀 Gateway Server ready at: ${url}`);
