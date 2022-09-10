import { Type, Static } from '@sinclair/typebox';

export const AttractionIdSchema = Type.Object({
    id: Type.Number(),
})
export type TAttractionId = Static<typeof AttractionIdSchema>;

export const AttractionBaseSchema = Type.Object({
    attractionName: Type.String(),
    attractionDescription: Type.String(),
    attractionArea: Type.String(),
    attractionCost: Type.Object({
        adult: Type.Number(),
        child: Type.Number()
    })
});
export type TAttractionBase = Static<typeof AttractionBaseSchema>;

export const AttractionSchema = Type.Intersect([
    AttractionIdSchema,
    AttractionBaseSchema
]);
export type TAttraction = Static<typeof AttractionSchema>;

export const AttractionGetResponseSchema = Type.Union([
    Type.Array(AttractionSchema),
    Type.Object({
        message: Type.String()
    })
]);
export type TAttractionGetResponse = Static<typeof AttractionGetResponseSchema>;

export const AttractionPutResponseSchema = Type.Union([
    AttractionSchema,
    Type.Object({
        message: Type.String()
    })
]);
export type TAttractionPutResponse = Static<typeof AttractionPutResponseSchema>

export const AttractionDeleteResponseSchema = Type.Object({
    message: Type.String()
});
export type TAttractionDeleteResponse = Static<typeof AttractionDeleteResponseSchema>;