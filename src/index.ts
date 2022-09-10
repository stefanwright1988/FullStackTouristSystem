import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import * as dotenv from "dotenv";
import {fastify, FastifyReply, FastifyRequest } from 'fastify'
import areasController from "./controllers/areasController";
import attractionsController from "./controllers/attractionsController";

dotenv.config();

if (!process.env.PORT) {
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string);

const server = fastify({logger: true}).withTypeProvider<TypeBoxTypeProvider>();

server.register(require('@fastify/swagger'), {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Test swagger',
            description: 'Testing the Fastify swagger API',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: 'localhost:7001',
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'areas', description: 'Areas related end-points' },
            { name: 'attractions', description: 'Attractions related end-points' }
        ],
    },
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
        supportedSubmitMethods: ["get", "head"],
    },
    uiHooks: {
        onRequest: function (request: FastifyRequest, reply: FastifyReply, next: any) { next() },
        preHandler: function (request: FastifyRequest, reply: FastifyReply, next: any) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header: any) => header,
    exposeRoute: true
})

server.register(areasController, { prefix: '/areas' });

server.register(attractionsController, { prefix: '/attractions' });

(async () => {
    try {
        await server.listen({ port: PORT })
        console.log(`Listening on port: ${PORT}`);
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
})();