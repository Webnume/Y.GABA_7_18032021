export default class Card {
    constructor(props) {
      this.name = props.name;
      this.recipes = props;
      this.time=props.time;
      this.description=props.description;
  
      this.DOM = document.querySelector("main");
      // this.DOM.classList = `main-search`;
      // domTarget.appendChild(this.DOM);
      this.render();
      //   this.DOM.onclick = this.click.bind(this);
    }
  
    render() {
      this.DOM.innerHTML = this.template();
    }
  
    // click(){
    //   this.count++;
    //   if (this.count === 3) return this.deleteCard();
    //   this.details = ! this.details;
    //   this.render();
    // }
  
    template() {
      return `  
      <div class="recipe">
          <img src="https://picsum.photos/380/178" alt="">
          <div class="recipe-headings">
              <h2 class="recipe-title">${this.name}</h2>
              <img class="recipe-clock" src="./images/cardClock.svg" alt="">
              <span class="cookingTiming">10min</span>
          </div>
          <div class="recipe-main">
              <ul class="recipe-ingredients">
                  <li><span class="ingredient">Lait de coco:</span><span class="quantity"> 400ml</span></li>
              </ul>
              <p class="description">Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée</p>
  
          </div>
      </div>
        `;
    }
  
    getData(type){    
      // console.log(this.recipes);
      if (type ==="Ingredients") {
        const ingredients = [];
        for(var i = 0; i < this.recipes.length; i++)
        {
            for (let j = 0; j < this.recipes[i].ingredients.length; j++) {          
              if(ingredients.indexOf(this.recipes[i].ingredients[j].ingredient) === -1) {
                ingredients.push(this.recipes[i].ingredients[j].ingredient);
              }
            }          
        }      
        // console.log(ingredients); 
        return ingredients;      
      }else if(type ==="Appareil"){
        const appliance = [];
  
        for(var i = 0; i < this.recipes.length; i++)
        {             
            if(appliance.indexOf(this.recipes[i].appliance) === -1) {
              appliance.push(this.recipes[i].appliance);
            }          
        }
        // console.log(appliance); 
        return appliance;
      }else if(type==="Ustensiles"){
        const ustensiles = [];
        for(var i = 0; i < this.recipes.length; i++)
        {
            for (let j = 0; j < this.recipes[i].ustensils.length; j++) {          
              if(ustensiles.indexOf(this.recipes[i].ustensils[j]) === -1) {
                ustensiles.push(this.recipes[i].ustensils[j]);
              }
            }          
        }      
        // console.log(ustensiles); 
        return ustensiles;
      }
    }
      
    makeUL(array) {
      // Create the list element:
      var list = document.createElement('ul');
      for (var i = 0; i < array.length; i++) {
          // Create the list item:
          var item = document.createElement('li');
          // Set its contents:
          item.appendChild(document.createTextNode(array[i]));
          // Add it to the list:
          list.appendChild(item);
      }
      // Finally, return the constructed list:
      return list;
    }
  
  
  
  
  
    // deleteCard(){
    //   this.DOM.parentNode.removeChild(this.DOM);
    //   delete components[this.name];
    // }
  }
  