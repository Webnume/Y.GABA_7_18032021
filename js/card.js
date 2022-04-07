export default class Card {
  constructor(props) {
    this.recipes = props;
    this.DOM = document.querySelector("main");
    this.render();
  }

  render() {
    this.DOM.innerHTML = this.templateMain();
  }

  update(newListRecipes) {
    if (newListRecipes !== undefined) {
      this.recipes = newListRecipes;
      this.render();
    } else {
      this.DOM.innerHTML = this.templateMainNoResult();
    }
  }

  templateMain() {
    let cardDOM = "";
    for (let i = 0; i < this.recipes.length; i++) {
      cardDOM += `  
      <article class="recipe">
          <img src="https://picsum.photos/380/178" alt="">
          <div class="recipe-headings">
              <h2 class="recipe-title">${this.recipes[i].name}</h2>
              <img class="recipe-clock" src="./images/cardClock.svg" alt="">
              <span class="cookingTiming">${this.recipes[i].time}min</span>
          </div>
          <div class="recipe-main">
              <ul class="recipe-ingredients">
              ${this.getIngredients(i)}
              </ul>
              <p class="description">${this.recipes[i].description}</p>  
          </div>
      </article>
        `;
    }
    return cardDOM;
  }

  templateMainNoResult() {
    return `  
      <div class="noresult">
      Aucune recette ne correspond à votre critère… vous pouvez
      chercher « tarte aux pommes », « poisson », etc.
      
      </div>
        `;
  }

  getIngredients(i) {
    let html = "";
    let ingredient;
    let quantity;
    let unit;

    let ingredientsArray = this.recipes[i].ingredients;

    for (let ingred of ingredientsArray) {
      ingredient =
        ingred.ingredient !== undefined
          ? ingred.ingredient
          : "";
      quantity =
        ingred.quantity !== undefined
          ? ": " + ingred.quantity
          : "";
      unit =
        ingred.unit !== undefined
          ? ingred.unit
          : "";
      html += `
    <li><span class="ingredient">${ingredient}</span><span class="quantity"> ${quantity} ${unit}</span></li>

    `;
    }
    return html;
  }
}
