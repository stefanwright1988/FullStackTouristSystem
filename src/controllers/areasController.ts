
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import * as logic from "../logic/areasLogic";

export default async (fastify: FastifyInstance) => {
    
    fastify.get("/", async (req: FastifyRequest, res: FastifyReply) => {
        try {
            const areas = await logic.getAreaList();

            res.send(areas);
        } catch (err) {
                res.status(500).send(err)
        }
    })    

    fastify.delete("/:shortName([a-zA-Z]{3})", async (req: FastifyRequest<{ Params: { shortName: string } }>, res: FastifyReply) => {
        try {
            const area = await logic.getAreaName(req.params.shortName);

            res.send(area);
        } catch (err) {
                res.status(500).send(err)
        }
    })

    fastify.get("*", async function (request:FastifyRequest, res:FastifyReply) {
        const error = {status: 404,message: "Route not found"}
        res.status(404).send(error);
      });
}