/* global main */

export default class DataManager {
  constructor(data) {
    this.recipes = data;
  }

  /**
   * [search description]
   *
   * @param   {string}  text  [input text from mainsearch]
   *
   * @return  {object}        [return array of selected recipes]
   */
  search(text) {
    const searchStr = text.toLowerCase();
    //on appelle notre méthode de tri
    const filteredData = this.recipes.filter((recipe) => {
      const nameMatches = recipe.name.toLowerCase().includes(searchStr);
      const descriptionMatches = recipe.description
        .toString()
        .includes(searchStr);
      const ingredientMatches = recipe.ingredients.some((item) => {
        return item.ingredient.toString().toLowerCase().includes(searchStr);
      });
      return nameMatches || descriptionMatches || ingredientMatches;
    });

    console.log(filteredData);
    if (filteredData.length > 0) {
      cards.update(filteredData);
    } else {
      cards.update();
    }
    // this.activeIngredients = this.getFiltersData("Ingredients", searchStr);
    // ingredientFilter.render(this.activeIngredients);

    // this.activeAppareils = this.getFiltersData("Appareil", searchStr);
    // appareilFilter.render(this.activeAppareils);

    // this.activeUstensiles = this.getFiltersData("Ustensiles", searchStr);
    // ustensilesFilter.render(this.activeUstensiles);
  }

  /**
   * [getData description]
   *
   * @param   {string}  type  [nom du composant]
   *
   * @param {string} text [input mainsearch & filters]
   *
   * @return  {Array}        [renvoi un tabeau]
   */
  getFiltersData(type, text) {
    if (type === "Ingredients") {
      console.log(text);
      const ingredients = [];
      for (var i = 0; i < this.recipes.length; i++) {
        for (let j = 0; j < this.recipes[i].ingredients.length; j++) {
          if (
            ingredients.indexOf(this.recipes[i].ingredients[j].ingredient) ===
            -1
          ) {
            ingredients.push(this.recipes[i].ingredients[j].ingredient);
          }
        }
      }
      if (text) {
        let inputIngredientResult = [];
        inputIngredientResult = ingredients.filter((ingredient) =>
          ingredient.toString().toLowerCase().includes(text)
        );
        console.log(inputIngredientResult);
        return inputIngredientResult;
      }
      // console.log(ingredients);
      return ingredients;
    }
    if (type === "Appareil") {
      const appliances = [];
      for (var i = 0; i < this.recipes.length; i++) {
        if (appliances.indexOf(this.recipes[i].appliance) === -1) {
          appliances.push(this.recipes[i].appliance);
        }
      }
      if (text) {
        let inputAppareilResult = [];
        inputAppareilResult = appliances.filter((appliance) =>
          appliance.toString().toLowerCase().includes(text)
        );
        console.log(inputAppareilResult);
        return inputAppareilResult;
      }
      return appliances;
    }
    if (type === "Ustensiles") {
      const ustensiles = [];
      for (var i = 0; i < this.recipes.length; i++) {
        for (let j = 0; j < this.recipes[i].ustensils.length; j++) {
          if (ustensiles.indexOf(this.recipes[i].ustensils[j]) === -1) {
            ustensiles.push(this.recipes[i].ustensils[j]);
          }
        }
      }
      if (text) {
        let inputUstensilesResult = [];
        inputUstensilesResult = ustensiles.filter((ustensile) =>
          ustensile.toString().toLowerCase().includes(text)
        );
        console.log(inputUstensilesResult);
        return inputUstensilesResult;
      }
      return ustensiles;
    }
  }
}
