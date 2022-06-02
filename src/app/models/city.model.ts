import { Area } from "./area.model";

// export interface City{
//     "message": string;

//     "data":{
//         "id": number,
//         "name": string,
//         "status": string,
//         "areas": Area[]
//     };

//     "pagination": {
//         "totalCount": number,
//         "totalPages": number,
//         "pageSize": number,
//         "currentPage": number,
//         "hasNext": string,
//         "hasPrevious": string
//       };

//     "status": string

// }

export interface City{

    "data":{
        "id": number,
        "name": string,
        "status": string,
        "areas": Area[]
    };


}
