export default class DataManager {
  constructor(data) {
    this.recipes = data;
    this.allRecipesSafe = data;
    activeFilters.ustensils = [];
    activeFilters.ingredients = [];
    this.globalSearch = [];
    // console.log(this.filtered({appliance:"four",ustensils: [ 'rouleau à patisserie']}));
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

    // console.log(filteredData);

    if (filteredData.length > 0) {
      cards.update(filteredData);
      // this.recipes = filteredData;
      // this.globalSearch = filteredData;
    } else {
      cards.update();
    }
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
      const ingredients = [];
      for (var i = 0; i < this.recipes.length; i++) {
        for (let j = 0; j < this.recipes[i].ingredients.length; j++) {
          if (
            ingredients.indexOf(this.recipes[i].ingredients[j].ingredient) ===
              -1 &&
            !activeFilters.ingredients.includes(
              this.recipes[i].ingredients[j].ingredient.toLowerCase()
            )
          ) {
            ingredients.push(this.recipes[i].ingredients[j].ingredient);
          }
        }
      }
      if (text) {
        // console.log(text);
        let inputIngredientResult = [];
        inputIngredientResult = ingredients.filter((ingredient) =>
          ingredient.toString().toLowerCase().includes(text)
        );
        return inputIngredientResult;
      }
      return ingredients;
    }
    if (type === "Appareil") {
      const appliances = [];
      for (var i = 0; i < this.recipes.length; i++) {
        if (
          appliances.indexOf(this.recipes[i].appliance) === -1 &&
          activeFilters.appliance !== this.recipes[i].appliance.toLowerCase()
        ) {
          appliances.push(this.recipes[i].appliance);
        }
      }
      if (text) {
        let inputAppareilResult = [];
        inputAppareilResult = appliances.filter((appliance) =>
          appliance.toString().toLowerCase().includes(text)
        );
        return inputAppareilResult;
      }
      return appliances;
    }
    if (type === "Ustensiles") {
      const ustensiles = [];
      for (var i = 0; i < this.recipes.length; i++) {
        for (let j = 0; j < this.recipes[i].ustensils.length; j++) {
          if (
            ustensiles.indexOf(this.recipes[i].ustensils[j]) === -1 &&
            !activeFilters.ustensils.includes(
              this.recipes[i].ustensils[j].toLowerCase()
            )
          ) {
            ustensiles.push(this.recipes[i].ustensils[j]);
          }
        }
      }
      if (text) {
        let inputUstensilesResult = [];
        inputUstensilesResult = ustensiles.filter((ustensile) =>
          ustensile.toString().toLowerCase().includes(text)
        );
        return inputUstensilesResult;
      }
      return ustensiles;
    }
  }

  activeFiltersToObject(dropdownName, elementName) {
    if (dropdownName === "Ingredients") {
      activeFilters.ingredients.push(elementName);
    }

    if (dropdownName === "Appareil") {
      activeFilters.appliance = elementName;
    }
    if (dropdownName === "Ustensiles") {
      activeFilters.ustensils.push(elementName);
    }
    this.filtered(activeFilters);
    console.log(activeFilters);
  }

  removeselectedFilter(elementName) {
    const indexIngredients = activeFilters.ingredients.indexOf(elementName);
    if (activeFilters.appliance === elementName) {
      delete activeFilters.appliance;
      this.search("coco");
    }
    const indexUstensils = activeFilters.ustensils.indexOf(elementName);
    if (indexUstensils > -1) {
      activeFilters.ustensils.splice(indexUstensils, 1);
    }
    if (indexIngredients > -1) {
      activeFilters.ingredients.splice(indexIngredients, 1);
    }
    event.currentTarget.remove();
    this.filtered(activeFilters);
    console.log(activeFilters);
  }
  /**
   * [filtered description]
   *
   * @param   {Object}          filters  [filters description]
   * @param   {Array.<String>}  [filters.ingredients]
   * @param   {String}          [filters.appliance]
   * @param   {Array.<String>}  [filters.ustensils]
   *
   * @return  {Array}           [return description]
   */
  filtered(filters) {
    const result = [];
    let sum;
    for (const value of Object.values(this.recipes)) {
      sum = 0;
      if (filters.appliance !== undefined) {
        if (
          this.filterAppliance(value.appliance.toLowerCase(), filters.appliance)
        )
          sum++;
      }
      if (filters.ingredients !== undefined) {
        if (this.filterIngredients(value.ingredients, filters.ingredients))
          sum++;
      }
      if (filters.ustensils !== undefined) {
        if (this.filterUstensils(value.ustensils, filters.ustensils)) sum++;
      }
      if (sum === Object.entries(filters).length) result.push(value);
    }
    cards.update(result);
    return result;
  }

  /**
   * [filterAppliance description]
   *
   * @param   {String}  value    [value description]
   * @param   {String}  filter  [filter description]
   *
   * @return  {Boolean}           [return description]
   */
  filterAppliance(value, filter) {
    value = value.toLowerCase();
    if (value === filter) return true;
    return false;
  }

  filterIngredients(value, filters) {
    let sum = 0;
    for (let i = filters.length - 1; i >= 0; i--) {
      for (let ii = value.length - 1; ii >= 0; ii--) {
        if (value[ii].ingredient.toLowerCase() === filters[i]) sum++;
      }
    }
    if (sum === filters.length) return true;
    return false;
  }

  /**
   * [filterUstensils description]
   *
   * @param   {Array.<String>}  value    [value description]
   * @param   {Array.<String>}  filters  [filters description]
   *
   * @return  {Boolean}           [return description]
   */
  filterUstensils(value, filters) {
    let sum = 0;
    value = value.map((val) => val.toLowerCase());
    for (let i = filters.length - 1; i >= 0; i--) {
      if (value.indexOf(filters[i]) >= 0) sum++;
    }
    if (sum === filters.length) return true;
    return false;
  }
}
