
export interface Quest{
    "id": number,
    "title": string,
    "description": string,
    "price": number,
    "estimatedTime": number,
    "estimatedDistance": number,
    "availableTime": Date,
    "createdDate": Date,
    "updatedDate": Date,
    "status": string,
    "questTypeId": number,
    "questOwnerId": number,
    "areaId": number
}



