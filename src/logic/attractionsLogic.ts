import { TAreaBase } from "../areas/areas.interface";
import { TAttraction, TAttractionBase } from "../attractions/attractions.interface";
import * as dal from "../dal/dal";

const getAttractionByAreaShortcode = async (areaShortcode: string) => {
    // Get the attractions by shortcode
    const attractions:TAttraction[] = await dal.getAttractionByAreaShortcode(areaShortcode);
    // Identify the full name from the shortcode
    const areaFullName:string = await dal.getAreaFull(areaShortcode)
    // Update the attractions to display the full area name
    attractions.forEach((el) => {
        el.attractionArea = areaFullName;
    })
    return attractions;
}

const getNextAttractionId = async () => {
    const attractionIds = await dal.getAttractionIds();
    const nextId = Math.max(...attractionIds) + 1;
    return nextId;
}

const putNewAttraction = async (newAttraction: TAttraction) => {
    const attractions:TAttraction[] = await dal.getAllAttractions();
    attractions.push(newAttraction)
    await dal.saveAttractions(attractions);
    return newAttraction;
}

const deleteAttraction = async (idToRemove:number) => {
    const attractions:TAttraction[] = await dal.getAllAttractions();
    const attractionsExcludingId:TAttraction[] = attractions.filter(attraction => attraction.id != idToRemove)
    await dal.saveAttractions(attractionsExcludingId);
    return true;
}

export { getAttractionByAreaShortcode, getNextAttractionId, putNewAttraction, deleteAttraction}