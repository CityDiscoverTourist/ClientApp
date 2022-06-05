import { Quest } from "./quest.model"
export interface QuestPage{
  "message": string,
  "data": Quest[],
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
