export default class DataManager {
  constructor(data) {
    this.recipes = data;
    this.allRecipesSafe = data;
    activeFilters.ustensils = [];
    activeFilters.ingredients = [];
    activeFilters.mainSearchInput = "";
    this.globalSearch = [];
  }

  /**
   * [search description]
   *
   * @param   {string}  text  [input text from mainsearch]
   *
   * @return  {object}        [return array of selected recipes]
   */
  search(text) {
    activeFilters.mainSearchInput = text.toLowerCase();
    this.filtered(activeFilters);
    console.log(activeFilters);
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
    const activeRecipes = this.filtered(activeFilters);
    if (type === "Ingredients") {
      const ingredients = [];
      for (var i = 0; i < activeRecipes.length; i++) {
        for (let j = 0; j < activeRecipes[i].ingredients.length; j++) {
          if (
            ingredients.indexOf(activeRecipes[i].ingredients[j].ingredient) ===
              -1 &&
            !activeFilters.ingredients.includes(
              activeRecipes[i].ingredients[j].ingredient.toLowerCase()
            )
          ) {
            ingredients.push(activeRecipes[i].ingredients[j].ingredient);
          }
        }
      }
      if (text) {
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
      for (var i = 0; i < activeRecipes.length; i++) {
        if (
          appliances.indexOf(activeRecipes[i].appliance) === -1 &&
          activeFilters.appliance !== activeRecipes[i].appliance.toLowerCase()
        ) {
          appliances.push(activeRecipes[i].appliance);
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
      for (var i = 0; i < activeRecipes.length; i++) {
        for (let j = 0; j < activeRecipes[i].ustensils.length; j++) {
          if (
            ustensiles.indexOf(activeRecipes[i].ustensils[j]) === -1 &&
            !activeFilters.ustensils.includes(
              activeRecipes[i].ustensils[j].toLowerCase()
            )
          ) {
            ustensiles.push(activeRecipes[i].ustensils[j]);
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
      if (filters.mainSearchInput !== undefined) {
        if (
          this.filterMainSearch(
            value.name.toLowerCase(),
            filters.mainSearchInput
          ) ||
          this.filterMainSearch(
            value.description.toLowerCase(),
            filters.mainSearchInput
          ) ||
          this.filterMainSearchIngredients(
            value.ingredients,
            filters.mainSearchInput
          )
        )
          sum++;
      }

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
    if (result.length === 0) cards.update();
    return result;
  }

  filterMainSearch(value, filter) {
    value = value.toLowerCase();
    if (value.includes(filter)) return true;
    return false;
  }

  filterMainSearchIngredients(value, filter) {
    for (let i = value.length - 1; i >= 0; i--) {
      if (value[i].ingredient.toLowerCase().includes(filter)) return true;
    }
    return false;
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
