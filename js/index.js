import Card from "./card.js";
import SearchMain from "./searchmain.js";
import SearchOption from "./searchoption.js";

async function initPage() {
  try {
    let data = await fetch("./data/recipes.json");
    data = await data.json();

    new SearchMain(data);
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
    new Card(data);


  } catch (err) {
    console.error("Une erreur est survenue", err);
  }
}
initPage();
