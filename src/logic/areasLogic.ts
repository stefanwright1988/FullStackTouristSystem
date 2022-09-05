import * as dal from "../dal/dal";

const getAreaList = async () => {
    return await dal.getAreaList();
}

const getAreaName = async (shortArea:string) => {
    await dal.getAreaFull(shortArea);
}


export {getAreaList, getAreaName}