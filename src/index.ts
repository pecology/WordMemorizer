import { Database } from "./Database";

var db = new Database();

const loadWordCardList = async () => {
  const wordCards = await db.wordCards.orderBy("word").toArray();
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
    await db.wordCards.add({
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

  const exportButton = document.querySelector("#export-button");
  exportButton!.addEventListener("click", async () => {
    const wordCards = await db.wordCards.toArray();
    var json = JSON.stringify(wordCards, null, "   ");
    var downLoadLink = document.createElement("a");
    downLoadLink.download = "sordCards";
    downLoadLink.href = URL.createObjectURL(new Blob([json]));
    downLoadLink.click();
  });

  const importButton = document.querySelector("#import-button");
  importButton!.addEventListener("click", async () => {
    const fileTag = <HTMLInputElement>document.querySelector("#import-file");
    const file = fileTag!.files![0];

    const fileReader = new FileReader();
    fileReader.readAsText(file, "utf-8");
    fileReader.onloadend = async () => {
      const importJson = <string>fileReader.result;
      const wordLikeList = JSON.parse(importJson);
      for (const wordLike of wordLikeList) {
        await db.wordCards.add({
          word: wordLike.word,
          translation: wordLike.translation,
          createDate: new Date(wordLike.createDate),
          numberOfRemindTimes: 0,
        });
        await loadWordCardList();
      }
    };
  });
};
