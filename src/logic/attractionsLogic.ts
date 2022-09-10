import { TAttraction } from "../interfaces/attractions.interface";
import * as dal from "../dal/dal";
import { TArea } from "../interfaces/areas.interface";

const getAttractionByAreaShortcode = async (areaShortcode: string) => {
    // Get the attractions by shortcode
    const attractions = await dal.getAttractionByAreaShortcode(areaShortcode);
    // Identify the full name from the shortcode
    const areaFullName = await dal.getAreaFull(areaShortcode)
    // Update the attractions to display the full area name
    attractions.forEach((el) => {
        el.attractionArea = areaFullName.fullName;
    })
    return attractions;
}

const getNextAttractionId = async () => {
    const attractionIds = await dal.getAttractionIds();
    const findMaxId = attractionIds.reduce((max, current) => current.id > max ? current.id : max, 0)
    const nextId = findMaxId + 1;
    return nextId;
}

const putNewAttraction = async (newAttraction: TAttraction) => {
    const attractions = await dal.getAllAttractions();
    attractions.push(newAttraction)
    await dal.saveAttractions(attractions);
    return newAttraction;
}

const deleteAttraction = async (idToRemove: number) => {
    const attractions = await dal.getAllAttractions();
    const doesExist = attractions.find(attraction => attraction.id === idToRemove) || false;
    if (!doesExist) {
        return false;
    }
    const attractionsExcludingId = attractions.filter(attraction => attraction.id != idToRemove)
    await dal.saveAttractions(attractionsExcludingId);
    return true;
}

export { getAttractionByAreaShortcode, getNextAttractionId, putNewAttraction, deleteAttraction }