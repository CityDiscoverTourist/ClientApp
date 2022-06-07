import { CustomerQuest } from "./customerQuest.model"

export interface CustomerQuestPage{
    "message": string,
    "data": CustomerQuest[],
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
