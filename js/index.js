import Card from "./card.js";
import SearchMain from "./searchmain.js";
import SearchOption from "./searchoption.js"

async function initPage() {
  try {
    let data = await fetch("../data/recipes.json");
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

    // console.log(data)
// for(var i = 0; i < data.length; i++)
// {
//     console.log(data[i].name); 
//     console.log(data[i].ingredients); 
//     console.log(data[i].appliance); 
//     console.log(data[i].ustensils); 
// }

  } catch (err) {
    console.error("Une erreur est survenue", err);
  }
}
initPage();
