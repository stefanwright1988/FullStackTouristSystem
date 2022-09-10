import * as dal from "../dal/dal";

const getAreaList = async () => {
    const areaList = await dal.getAreaList();
    return areaList;
}

const getAreaName = async (shortArea:string) => {
    return await dal.getAreaFull(shortArea);
}


export {getAreaList, getAreaName}