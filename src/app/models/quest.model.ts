import { QuestItem } from "./questItem.model";

export interface Quest{
    id: number,
    "title": string,
    "description": string,
    "price": number,
    "imagePath": string,
    "estimatedTime": number,
    "estimatedDistance": number,
    "availableTime": Date,
    "createdDate": Date,
    "updatedDate": Date,
    "status": string,
    "questTypeId": number,
    "questOwnerId": number,
    "areaId": number,
    "countQuestItem": number,
    "address": string,
    "questItems": QuestItem[]
}



