import { Type, Static} from '@sinclair/typebox';

export const AreaShortSchema = Type.Object({
    shortName: Type.String()
})
export type TShortArea = Static<typeof AreaShortSchema>

export const AreaFullSchema = Type.Object({
    fullName: Type.String()
})
export type TFullArea = Static<typeof AreaFullSchema>

export const AreaSchema = Type.Intersect([
AreaShortSchema,
AreaFullSchema
]);
export type TArea = Static<typeof AreaSchema>;

export const AreaGetResponseSchema = Type.Union([
    AreaSchema,
    Type.Array(AreaSchema),
    Type.Object({
        message: Type.String()
    })
]);
export type TAreaGetResponse = Static<typeof AreaGetResponseSchema>;