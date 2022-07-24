export interface CustomerQuest{
    "id": number,
    "beginPoint": string,
    "endPoint": string,
    "createdDate": Date,
    "rating": number,
    "feedBack": string,
    "customerId": string,
    "isFinished": boolean,
    "questId": number,
    "status": string,
    "paymentMethod": string
}

// Belowing code is use for get comment by questID

export interface CustomerQuestComment{
    "message": string,
    "data" : CustomerComment[],
    "pagination": {
        "totalCount": number,
        "totalPages": number,
        "pageSize": number,
        "currentPage": number,
        "hasNext": string,
        "hasPrevious": string
      },
    "status": string
}

export interface CustomerComment{
    "id": number,
    "customerId": string,
    "name": string,
    "imagePath": string,
    "feedBack": string,
    "rating": number,
    "createdDate": Date
}
