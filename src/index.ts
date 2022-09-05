import * as dotenv from "dotenv";
import Fastify, { fastify, FastifyInstance, RouteShorthandOptions } from 'fastify'
import routes from "./routing/routes";

dotenv.config();

if(!process.env.PORT){
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string);

const server:FastifyInstance = fastify({logger:true,ajv: {
    plugins: [
      [require('ajv-keywords'), ['transform']]
    ]
  }});

routes(server);

(async () => {
    try {
        await server.listen({ port: PORT })
        console.log(`Listening on port: ${PORT}`);    
      } catch (err) {
        server.log.error(err)
        process.exit(1)
      }
})();