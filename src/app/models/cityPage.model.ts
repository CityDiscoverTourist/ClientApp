import { City } from "./city.model";

export interface CityPage{
    "message": string;

    "data": City[];

    "pagination": {
        "totalCount": number,
        "totalPages": number,
        "pageSize": number,
        "currentPage": number,
        "hasNext": string,
        "hasPrevious": string
      };

    "status": string

    // id: number
}
