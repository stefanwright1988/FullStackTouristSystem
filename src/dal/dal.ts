import { readFile } from "fs";
import { writeFile } from "fs/promises";
import { TAreaBase } from "../areas/areas.interface";
import { TAttraction, TAttractionBase, TAttractionID } from "../attractions/attractions.interface";

//Return area list
const getAreaList = () => {
    return new Promise((resolve, reject) => {
        readFile(process.env.AREASLOCATION || "", "utf-8", (err: any, fileContent: string) => {
            if (err) return reject(err);
            const areas = JSON.parse(fileContent)
            resolve(areas)
        })
    })
}

const getAreaFull = (shortArea: string) => {
    return new Promise<string>((resolve, reject) => {
        readFile(process.env.AREASLOCATION || "", "utf-8", (err: any, fileContent: string) => {
            if (err) return reject(err);
            const areas = JSON.parse(fileContent)
            const findArea = areas.find((area: TAreaBase) => area.shortName == shortArea);
            resolve(findArea.fullName)
        })
    })
}

//Return attractions by area
const getAttractionByAreaShortcode = (areaCode: string) => {
    return new Promise<TAttraction[]>((resolve, reject) => {
        readFile(process.env.ATTRACTIONSLOCATION || "", "utf-8", (err: any, fileContent: string) => {
            if (err) return reject(err);
            const attractions = JSON.parse(fileContent);
            resolve(attractions.filter((attraction: TAttraction) => {
                return attraction.attractionArea === areaCode
            }))
        })
    })
}

//Get attraction count
const getAttractionIds = () => {
    return new Promise<Array<number>>((resolve, reject) => {
        readFile(process.env.ATTRACTIONSLOCATION || "", "utf-8", (err: any, fileContent: string) => {
            if (err) return reject(err);
            const attractions = JSON.parse(fileContent);
            const ids = attractions.map((i:TAttractionID ) => i.id)
            resolve(ids)
        })
    })
}

//Get all attractions
const getAllAttractions = () => {
    return new Promise<TAttraction[]>((resolve, reject) => {
        readFile(process.env.ATTRACTIONSLOCATION || "", "utf-8", (err: any, fileContent: string) => {
            if (err) return reject(err);
            const attractions = JSON.parse(fileContent);
            resolve(attractions)
        })
    })
}

//Save attraction
const saveAttractions = async (attractions: TAttraction[]) => {
    const newContent = JSON.stringify(attractions, null, 4);
    await writeFile(process.env.ATTRACTIONSLOCATION || "", newContent, "utf-8")
}

//Delete an attraction

export { getAreaList, getAttractionByAreaShortcode, getAttractionIds, getAllAttractions, saveAttractions, getAreaFull }