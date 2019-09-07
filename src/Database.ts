import Dexie from "dexie";
import WordCard from "./WordCard";

//
// Declare Database
//
export class Database extends Dexie {
  wordCards: Dexie.Table<WordCard, number>;

  constructor() {
    super("Database");
    this.version(1).stores({
      wordCards:
        "++id,word,translation,createDate,lastMemolizeDate,numberOfRemindTimes",
    });
  }
}
