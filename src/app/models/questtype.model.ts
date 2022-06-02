import { Quest } from "./quest.model";

export interface QuestType{

      "id": number,
      "name": string,
      "status": string,
      "durationMode": number,
      "distanceMode": number,
      "imagePath": string,
      "quests": Quest[]

}
