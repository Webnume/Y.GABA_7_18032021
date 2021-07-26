/* global main */

export default class DataManager {
  constructor(data) {
    this.recipes = data;
  }

  search(text) {
    console.log(text);
    console.log(typeof text);
    console.log(this.recipes);
    // this.filters = filters.list;
    const result = [];
    const searchStr = text.toLowerCase();
    //on appelle notre méthode de tri

    const filteredData = this.recipes.filter((recipe) => {
      const nameMatches = recipe.name.toLowerCase().includes(searchStr);
      const descriptionMatches = recipe.description
        .toString()
        .includes(searchStr);
      const ingredientMatches = recipe.ingredients.some((item) => {
        item.ingredient.toString().toLowerCase().includes(searchStr);
      });

      const filtersMatches = recipe.ingredients.some((item) => {
        item.ingredient.toString().toLowerCase().includes(searchStr);
      });

      return (
        nameMatches || descriptionMatches || ingredientMatches || filtersMatches
        // xwc<w
        // <wx<

        
      );
    });
    cards.update(filteredData);
    console.log("it works");
    // main.update(result);
  }

  filtersHandle(tab){    
    let intersection = tab.filter(t => this.recipes.includes(t)); 
    console.log(intersection.length === this.recipes.length);
    return intersection.length === this.recipes.length;
  }

}
