import Dexie from "dexie";
import WordCard from "./WordCard";

//
// Declare Database
//
class Database extends Dexie {
  wordCards: Dexie.Table<WordCard, number>;

  constructor() {
    super("Database");
    this.version(1).stores({
      wordCards:
        "++id,word,translation,createDate,lastMemolizeDate,numberOfRemindTimes",
    });
  }
}

var db = new Database();

window.onload = async () => {
  const wordCards = await db.wordCards.toArray();
  const tableBody = document.querySelector("#word-card-list > tbody");
  if (tableBody !== null) {
    wordCards.forEach(wordCard => {
      const htmlLiteral = `
        <tr>
          <td>${wordCard.word}</td>
          <td>${wordCard.translation}</td>
          <td>${wordCard.createDate}</td>
          <td>${wordCard.lastMemolizedDate}</td>
          <td>${wordCard.numberOfRemindTimes}</td>
        </tr>
      `;
      tableBody.innerHTML += htmlLiteral;
    });
  }
};
