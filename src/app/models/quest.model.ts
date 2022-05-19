
export interface Quests{
    "message": string;

    "data": {
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
    };

    "pagination": {
        "totalCount": number,
        "totalPages": number,
        "pageSize": number,
        "currentPage": number,
        "hasNext": string,
        "hasPrevious": string
    };

    "status": string
}


