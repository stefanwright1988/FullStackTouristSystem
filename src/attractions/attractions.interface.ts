import { CS } from '@keplr/typed-ajv';

const AttractionCost = CS.Object({
    adult: CS.Number(true),
    child: CS.Number(true)
}, true)

const AttractionID = CS.Object({
    id: CS.Number(true)
}, true)

const AttractionBase = CS.Object({
    attractionName: CS.String(true),
    attractionDescription: CS.String(true),
    attractionArea: CS.String(true),
    attractionCost: AttractionCost
},true);

const Attraction = CS.MergeObjects(AttractionBase, AttractionID, true)

export type TAttractionBase = typeof AttractionBase.type; 
export const AttractionJsonSchema = AttractionBase.getJsonSchema();
export type TAttractionID = typeof AttractionID.type;
export type TAttraction = typeof Attraction.type;