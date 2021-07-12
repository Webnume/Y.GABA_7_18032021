export default class SearchOption {
    constructor(domTarget, props) {
      this.name = props.name;
      this.recipes = props.recipes;
  
      this.DOM = document.createElement("article");
      this.DOM.className = `box ${this.name}`;
      domTarget.appendChild(this.DOM);
      this.render();
      this.DOM.onclick = this.click.bind(this);
      this.details =false;
    }
  
    render() {
      this.DOM.innerHTML = this.details ? this.templateExpand() : this.template();
    }
  
    click(){
      this.details = ! this.details;
      this.DOM.classList.toggle("expand");
      // if (this.count === 3) return this.deleteCard();
      this.render();
    }
  
    template() {
      return `<div class="topBox"><input type="text" placeholder="${this.name}"><img class="buttonArrow" src="./images/buttonArrow.svg" alt=""></div>  
        `;
    }
    
    templateExpand() {
      // this.DOM.classList.toggle("expand");
      this.content =this.makeUL(this.getData(this.name));
      return `<div class="topBox"><input type="text" placeholder="${this.name}"><img class="buttonArrow up" src="./images/buttonArrow.svg" alt=""></div> 
      <ul>${this.content.innerHTML}</ul>
        `;
    }
  
      // <ul>${this.getData(this.name)}</ul>  
    /**
     * [getData description]
     *
     * @param   {string}  type  [nom du composant]
     *
     * @return  {Array}        [renvoi un tabeau]
     */
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