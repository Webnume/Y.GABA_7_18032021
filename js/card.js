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
    if(newListRecipes!==undefined){
      this.recipes = newListRecipes;
      this.render();
    }else{
      this.DOM.innerHTML = this.templateMainNoResult();
    }
  }

  templateMain() {
    let cardDOM = "";
    for (let i = 0; i < this.recipes.length; i++) {
      cardDOM += `  
      <div class="recipe">
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
      </div>
        `;
    }
    return cardDOM;
  }

  templateMainNoResult() {
    let cardDOM = `  
      <div class="noresult">
      Aucune recette ne correspond à votre critère… vous pouvez
      chercher « tarte aux pommes », « poisson », etc.
      
      </div>
        `;
    return cardDOM;
  }

  getIngredients(i) {
    let html = "";
    let ingredient;
    let quantity;
    let unit;
    for (let j = 0; j < this.recipes[i].ingredients.length; j++) {
      ingredient =
        this.recipes[i].ingredients[j].ingredient !== undefined
          ? this.recipes[i].ingredients[j].ingredient
          : "";
      quantity =
        this.recipes[i].ingredients[j].quantity !== undefined
          ? ": " + this.recipes[i].ingredients[j].quantity
          : "";
      unit =
        this.recipes[i].ingredients[j].unit !== undefined
          ? this.recipes[i].ingredients[j].unit
          : "";
      html += `
    <li><span class="ingredient">${ingredient}</span><span class="quantity"> ${quantity} ${unit}</span></li>

    `;
    }
    return html;
  }
}
