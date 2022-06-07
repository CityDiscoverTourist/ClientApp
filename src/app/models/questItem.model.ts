export interface QuestItem{
    "id": number,
    "questItemTypeId": number,
    "locationId": number,
    "questId": number,
    "content": string,
    "description": string,
    "duration": number,
    "createdDate": Date,
    "updatedDate": Date,
    "qrCode": string,
    "triggerMode": number,
    "rightAnswer": string,
    "answerImageUrl": string,
    "status": string,
    "itemId": number
}
