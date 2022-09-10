
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AreaGetResponseSchema, AreaShortSchema, TAreaGetResponse, TShortArea } from "../interfaces/areas.interface";
import * as logic from "../logic/areasLogic";
import { DefaultErrorResponseSchema } from "../interfaces/defaultError.interface";

export default async (fastify: FastifyInstance) => {

    const getAreaOptions = {
        schema: {
            description: "A description for getArea",
            tags: ['areas'],
            response: {
                200: {
                    description: "A description for the getArea success response",
                    ...AreaGetResponseSchema
                },
                "4xx": {
                    description: "A description for the getArea error response",
                    ...DefaultErrorResponseSchema
                },
                "5xx": {
                    description: "A description for the getArea error response",
                    ...DefaultErrorResponseSchema
                }
            },
        },
    };

    fastify.get<{ Reply: TAreaGetResponse }>("/", getAreaOptions, async (req, res) => {
        try {
            const areas = await logic.getAreaList();

            res.status(200).send(areas);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err)
        }
    })

    const getAreaByShortCodeOptions = {
        schema: {
            description: "A description for getAreaByShortCode",
            tags: ['areas'],
            params: AreaShortSchema,
            200: {
                description: "A description for the getAreaByShortCode success response",
                ...AreaGetResponseSchema
            },
            "4xx": {
                description: "A description for the getAreaByShortCode error response",
                ...DefaultErrorResponseSchema
            },
            "5xx": {
                description: "A description for the getAreaByShortCode error response",
                ...DefaultErrorResponseSchema
            }
        },
    };

    fastify.get<{ Params: TShortArea, Reply: TAreaGetResponse }>("/:shortName([a-zA-Z]{3})", getAreaByShortCodeOptions, async (req, res) => {
        try {
            const area = await logic.getAreaName(req.params.shortName);
            if (area) {
                res.status(200).send(area);
            } else {
                res.status(400).send({ message: "Area not found" })
            }
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err)
        }
    })

    const areasWildcardsOptions = {
        schema: {
            description: "A description for getAreaByShortCode",
            tags: ['areas'],
            response: {
                "4xx": DefaultErrorResponseSchema
            },
        },
    };

    fastify.get("*", areasWildcardsOptions, async function (request: FastifyRequest, res: FastifyReply) {
        const error = { status: 404, message: "Route not found" }
        res.status(404).send(error);
    });
}