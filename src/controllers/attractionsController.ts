
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AreasJsonSchema, TAreaBase } from "../areas/areas.interface";
import { AttractionJsonSchema, TAttraction, TAttractionBase } from "../attractions/attractions.interface";
import { getAreaName } from "../logic/areasLogic";
import {deleteAttraction, getAttractionByAreaShortcode, getNextAttractionId, putNewAttraction} from "../logic/attractionsLogic";

export default async (fastify: FastifyInstance) => {

    const getByCodeOptions = {
        schema: {
            params: AreasJsonSchema,
            response: {
                201: {
                    data: {
                        type: "object",
                    },
                },
            },
            attachValidation: true
        }
    }

    fastify.get("/:shortName([a-zA-Z]{3})", getByCodeOptions, async (req: FastifyRequest<{ Params: { shortName: string } }>, res: FastifyReply) => {
        if (req.validationError) {
            res.status(400).send(req.validationError)
            return;
        }
        try {
            const attractions = await getAttractionByAreaShortcode(req.params.shortName)             
            res.send(attractions);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message)
        }
    })

    const postOptions = {
        schema: {
            body: AttractionJsonSchema,
            response: {
                201: {
                    data: {
                        type: "object",
                    },
                },
            },
        },
        attachValidation: true
    };

    fastify.post("/", postOptions, async (req: FastifyRequest<{ Body: TAttractionBase }>, res: FastifyReply) => {
        if (req.validationError) {
            res.status(400).send(req.validationError)
            return;
        }
        const nextId: number = await getNextAttractionId();
        const attractionToPut: TAttraction = {
            "id": nextId,
            ...req.body
        }

        try {
            await putNewAttraction(attractionToPut)
            res.status(200).send({ attractionToPut })
        } catch (err) {
            res.status(500).send(err)
        }
    })

    fastify.delete("/:id([0-9])", async (req: FastifyRequest<{ Params: {id:number} }>, res: FastifyReply) => {
        try {
            await deleteAttraction(req.params.id)
        } catch (err){
            res.status(500).send(err)
        }
    })

    fastify.get("*", async function (request: FastifyRequest, res: FastifyReply) {
        const error = { status: 404, message: "Route not found in attractions" }
        res.status(404).send(error);
    });
}