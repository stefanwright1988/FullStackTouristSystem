import { CS } from '@keplr/typed-ajv';

const AreaBase = CS.Object({
    shortName: CS.String(true),
    fullName: CS.String(false)
}, true)

export type TAreaBase = typeof AreaBase.type;
export const AreasJsonSchema = AreaBase.getJsonSchema();