import Card from "./card.js";
import SearchMain from "./searchmain.js";
import Filter from "./filter.js";
import DataManager from "./datamanager_v2.js";

async function initPage() {
  try {
    let data = await fetch("./data/recipes.json");
    data = await data.json();
    window.cards = new Card(data);
    window.datamanager = new DataManager(data);
    window.searchmain = new SearchMain(data);

    window.ingredientFilter = new Filter({
      name: "Ingredients",
      recipes: data,
    });
    window.appareilFilter = new Filter({
      name: "Appareil",
      recipes: data,
    });
    window.ustensilesFilter = new Filter({
      name: "Ustensiles",
      recipes: data,
    });
  } catch (err) {
    console.error("Une erreur est survenue", err);
  }
}
window.onload = initPage();
