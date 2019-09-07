import { Database } from "./Database";

var db = new Database();

const loadWordCardList = async () => {
  const wordCards = await db.wordCards.toArray();
  const tableBody = document.querySelector("#word-card-list > tbody");
  tableBody!.innerHTML = "";
  wordCards.forEach(wordCard => {
    const htmlLiteral = `
        <tr>
          <td>${wordCard.word}</td>
          <td>${wordCard.translation}</td>
          <td>${wordCard.createDate.getFullYear()}/${wordCard.createDate.getMonth() +
      1}/
          ${wordCard.createDate.getDate()}</td>
          <td>${wordCard.lastMemolizedDate}</td>
          <td>${wordCard.numberOfRemindTimes}</td>
        </tr>
      `;
    tableBody!.innerHTML += htmlLiteral;
  });
};

window.onload = async () => {
  await loadWordCardList();

  const addButton = document.querySelector("#add-button");
  addButton!.addEventListener("click", async () => {
    const word = (<HTMLInputElement>document.querySelector("#word-field"))
      .value;
    const translation = (<HTMLInputElement>(
      document.querySelector("#translation-field")
    )).value;
    const id = await db.wordCards.add({
      word: word,
      translation: translation,
      createDate: new Date(),
      numberOfRemindTimes: 0,
    });
    await loadWordCardList();
    const addDialog = document.querySelector("#overlay");
    addDialog!.setAttribute("style", "display:none");
  });

  const addLink = document.getElementById("add-link");
  addLink!.addEventListener("click", () => {
    const addDialog = document.querySelector("#overlay");
    addDialog!.setAttribute("style", "display:inline");
  });

  const addDialog = document.querySelector("#overlay");
  addDialog!.addEventListener("click", event => {
    if ((<HTMLElement>event.target).id !== "overlay") {
      return false;
    }
    addDialog!.setAttribute("style", "display:none");
  });
};
