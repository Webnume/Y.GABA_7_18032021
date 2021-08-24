export default class DataManager {
  constructor(data) {
    this.recipes = data;
    activeFilters.ustensils = [];
    activeFilters.ingredients = [];
    activeFilters.appliance ;
    this.recipesById = {};
    this.hashedRecipes = {};
    this.activeRecipes = [];
    window.onload = this.generate.bind(this);
  }

  generate() {
    this.setFocusToTextBox("search");
    this.recipes.forEach((recipe) => {
      this.recipesById["id_" + recipe.id] = recipe;
      this.fillHashedRecipes(recipe.name.toLowerCase(), recipe.id);
      this.fillHashedRecipes(recipe.appliance.toLowerCase(), recipe.id);
      recipe.ustensils.forEach((ustensil) => {
        this.fillHashedRecipes(ustensil.toLowerCase(), recipe.id);
      });
      recipe.ingredients.forEach((element) => {
        this.fillHashedRecipes(element.ingredient.toLowerCase(), recipe.id);
      });
    });
    // console.log(this.recipesById.id_41);
    console.log(this.recipesById);
  }

  fillHashedRecipes(name, id) {
    let tmp;
    for (let i = 3; i <= name.length; i++) {
      tmp = name.slice(0, i);
      if (this.hashedRecipes[tmp] === undefined) {
        this.hashedRecipes[tmp] = [];
      }
      if (this.hashedRecipes[tmp].indexOf(id) > -1) continue;
      this.hashedRecipes[tmp].push(id);
    }
    // console.log(this.hashedRecipes["coco"]);
    // console.log(this.hashedRecipes);
  }

  /**
   * [search description]
   *
   * @param   {string}  text  [input text from mainsearch]
   *
   * @return  {object}        [return array of selected recipes]
   */
  search(text) {
    this.activeRecipes = [];
    console.log(this.hashedRecipes);
    // console.log(this.hashedRecipes["coco"].inclu);
    let allActiveID = [];
    for (const [key, value] of Object.entries(this.hashedRecipes)) {
      // if (key !== this.name.toLowerCase()) selectMenus[key].unExpand();
      if (
        text !== "" &&
        key.toLowerCase().includes(text.toLowerCase()) &&
        allActiveID.indexOf(value) === -1
      ) {
        console.log(key, value);
        allActiveID.push(value);
      }
    }
    console.log(allActiveID);
    // Merge/flatten an array of arrays & Remove Array Duplicates
    let tmpMergedAllActiveID = allActiveID.reduce((a, b) => a.concat(b), []);
    let mergedAllActiveID = Array.from(new Set(tmpMergedAllActiveID));
    console.log(mergedAllActiveID);
    // const hashedID = this.hashedRecipes[text.toLowerCase()];
    // console.log(hashedID);
    if (mergedAllActiveID !== undefined) {
      for (let i = 0; i < mergedAllActiveID.length; i++) {
        // console.log(this.recipesById["id_"+mergedAllActiveID[i]]);
        if (
          this.activeRecipes.indexOf(
            this.recipesById["id_" + mergedAllActiveID[i]]
          ) > -1
        )
          continue;
        this.activeRecipes.push(this.recipesById["id_" + mergedAllActiveID[i]]);
      }
      console.log(this.activeRecipes);
      cards.update(this.activeRecipes);
    }
    if (mergedAllActiveID.length === 0 && text === "") {
      cards.update(this.recipes);
    }
    if (mergedAllActiveID.length === 0 && text !== "") {
      cards.update();
    }

    // this.filtered(activeFilters);
    // console.log(activeFilters);
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
    let activeRecipes = this.recipes;
    if (this.activeRecipes.length > 0) activeRecipes = this.activeRecipes;
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
    let recipes;
    if (this.activeRecipes.length > 0) recipes = this.recipes;
    else recipes = this.recipes;
    for (const value of Object.values(recipes)) {
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
      console.log(sum, Object.entries(filters).length);
    }
    // if (
    //   filters.appliance === "" &&
    //   filters.ingredients.length === 0 &&
    //   filters.ustensils.length === 0
    // ) {
    //   cards.update(result);
    // } else if (
    //   filters.appliance !== "" ||
    //   filters.ingredients.length > 0 ||
    //   filters.ustensils.length > 0
    // ) {
    //   cards.update(result);
    //   // if (result.length === 0) cards.update();
    // }
    this.activeRecipes = result;
    cards.update(result);
    console.log(result);
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

  setFocusToTextBox(id) {
    document.getElementById(id).focus();
  }
}
