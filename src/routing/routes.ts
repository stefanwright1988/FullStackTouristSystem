import * as fastify from 'fastify';
import areasController from '../controllers/areasController';
import attractionsController from '../controllers/attractionsController';

export default (app: fastify.FastifyInstance) => {
    //areas
    app.register(areasController, { prefix: '/areas' });        
    //attractions
    app.register(attractionsController, { prefix: '/attractions' });                                                                                                                                                                                                                                                                                 
};