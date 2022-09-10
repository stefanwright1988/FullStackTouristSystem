
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AreaShortSchema, TShortArea } from "../interfaces/areas.interface";
import { AttractionBaseSchema, AttractionDeleteResponseSchema, AttractionIdSchema, AttractionPutResponseSchema, AttractionSchema, TAttraction, TAttractionBase, TAttractionDeleteResponse, TAttractionId } from "../interfaces/attractions.interface";
import { DefaultErrorResponseSchema } from "../interfaces/defaultError.interface";
import * as logic from "../logic/attractionsLogic";

export default async (fastify: FastifyInstance) => {

    const getByCodeOptions = {
        schema: {
            tags: ['attractions'],
            params: AreaShortSchema,
            response: {
                201: {
                    data: {
                        type: "object",
                    },
                },
                "4xx": DefaultErrorResponseSchema,
                "5xx": DefaultErrorResponseSchema,
            },
            attachValidation: true
        }
    }

    fastify.get<{ Params: TShortArea }>("/:shortName([a-zA-Z]{3})", getByCodeOptions, async (req, res) => {
        if (req.validationError) {
            res.status(400).send(req.validationError)
            return;
        }
        try {
            const attractions = await logic.getAttractionByAreaShortcode(req.params.shortName)
            res.send(attractions);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message)
        }
    })

    const postOptions = {
        schema: {
            tags: ['attractions'],
            body: AttractionBaseSchema,
            response: {
                201: AttractionPutResponseSchema,
                "4xx": DefaultErrorResponseSchema,
                "5xx": DefaultErrorResponseSchema,
            },
        },
        attachValidation: true
    };

    fastify.post<{ Body: TAttractionBase }>("/", postOptions, async (req, res) => {
        if (req.validationError) {
            res.status(400).send(req.validationError)
            return;
        }
        const nextId: number = await logic.getNextAttractionId();
        const attractionToPut: TAttraction = {
            "id": nextId,
            ...req.body
        }

        try {
            await logic.putNewAttraction(attractionToPut)
            res.status(201).send(attractionToPut)
        } catch (err) {
            res.status(500).send(err)
        }
    })

    const deleteOptions = {
        schema: {
            tags: ['attractions'],
            params: AttractionIdSchema,
            response: {
                200: {
                    description: "Success Response",
                    ...AttractionDeleteResponseSchema
                },
                "4xx": {
                    description: "Error Response",
                    ...DefaultErrorResponseSchema
                },
                "5xx": {
                    description: "Server Error Response",
                    ...DefaultErrorResponseSchema
                },
            },
        },
        attachValidation: true
    };

    fastify.delete<{ Params: TAttractionId, Reply: TAttractionDeleteResponse }>("/:id([0-9])", deleteOptions, async (req, res) => {
        try {
            await logic.deleteAttraction(req.params.id)
                .then(delRes => {
                    if (delRes) {
                        res.status(200).send({ message: `Attraction ${req.params.id} deleted` })
                    } else {
                        res.status(404).send({ message: `AttractionId ${req.params.id} not found` })
                    }
                })
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send({ message: err.message })
        }
    })

    const attractionsWildcardsOptions = {
        schema: {
            description: "A description for the wildcard router within /attractions",
            tags: ['attractions'],
            response: {
                "4xx": DefaultErrorResponseSchema
            },
        },
    };
    fastify.get("*", attractionsWildcardsOptions, async function (request: FastifyRequest, res: FastifyReply) {
        const error = { status: 404, message: "Route not found in attractions" }
        res.status(404).send(error);
    });
}