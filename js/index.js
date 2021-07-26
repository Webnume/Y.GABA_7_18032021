import Card from "./card.js";
import SearchMain from "./searchmain.js";
import SearchOption from "./searchoption.js";
import DataManager from "./datamanager.js";

async function initPage() {
  try {
    let data = await fetch("./data/recipes.json");
    data = await data.json();

    window.cards = new Card(data);
    window.datamanager = new DataManager(data);
    const searchmain = new SearchMain(data);

    new SearchOption(document.querySelector(".option-search"), {
      name: "Ingredients",
      recipes: data,
    });
    new SearchOption(document.querySelector(".option-search"), {
      name: "Appareil",
      recipes: data,
    });
    new SearchOption(document.querySelector(".option-search"), {
      name: "Ustensiles",
      recipes: data,
    });
  } catch (err) {
    console.error("Une erreur est survenue", err);
  }
}
initPage();
