import { Area } from "./area.model";

export interface City{
    "id": number,
    "name": string,
    "status": string,
    "areas": Area[]

}
