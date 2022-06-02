import { QuestType } from "./questtype.model";

export interface LandingPage{
    "message": string;

    "data": QuestType[];

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
