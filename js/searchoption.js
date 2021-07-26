export default class SearchOption {
  constructor(domTarget, props) {
    this.name = props.name;
    this.recipes = props.recipes;

    this.DOM = document.createElement("article");
    this.DOM.className = `box ${this.name}`;
    domTarget.appendChild(this.DOM);
    this.render();
    this.DOM.onclick = this.click.bind(this);
    this.details = false;
    selectMenus[props.name.toLowerCase()] = this;
    this.filtersSelectedDOM = document.querySelector(
      "body > header > section.selected-filters"
    );
    this.DOM.oninput = this.handleOptionSearch.bind(this);
  }

  handleOptionSearch() {
    this.search = document.getElementById(this.name);
    // console.log(this.search);
    // console.log(this.getData("Ingredients"));
    console.log(this.search.value);
    const searchStr = this.search.value.toLowerCase();
    const filteredData = this
      .getData("Ingredients")
      .filter((ingredient) => {
        ingredient.toLowerCase().includes(searchStr);
    });
    console.log(filteredData);
    return filteredData;
  }

  render() {
    this.DOM.innerHTML = this.details ? this.templateExpand() : this.template();
  }

  click() {
    // console.log(Object.keys(selectMenus));
    for (const key of Object.keys(selectMenus)) {
      if (key !== this.name.toLowerCase()) selectMenus[key].unExpand();
      // console.log(key);
    }
    this.details = !this.details;
    this.render();
    this.setFocusToTextBox(this.name);
  }

  template() {
    this.DOM.classList.remove("expand");
    return `<div class="topBox"><input type="text" placeholder="${this.name}" id="${this.name}"><img class="buttonArrow" src="./images/buttonArrow.svg" alt=""></div>  
        `;
  }

  templateExpand() {
    this.DOM.classList.add("expand");
    return `<div class="topBox"><input type="text" placeholder="${
      this.name
    }" id="${
      this.name
    }"><img class="buttonArrow up" src="./images/buttonArrow.svg" alt=""></div> 
      <ul id="${this.name}">${this.makeUL(this.getData(this.name))}</ul>
        `;
  }

  /**
   * [getData description]
   *
   * @param   {string}  type  [nom du composant]
   *
   * @return  {Array}        [renvoi un tabeau]
   */
  getData(type) {
    if (type === "Ingredients") {
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
      return ingredients;
    }
    if (type === "Appareil") {
      const appliance = [];
      for (var i = 0; i < this.recipes.length; i++) {
        if (appliance.indexOf(this.recipes[i].appliance) === -1) {
          appliance.push(this.recipes[i].appliance);
        }
      }
      return appliance;
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
      return ustensiles;
    }
  }

  makeUL(array) {
    let html = "";
    for (var i = 0; i < array.length; i++) {
      html += `<li onclick="selectMenus.${this.name.toLowerCase()}.select('${
        array[i]
      }')">${array[i]}</li>`;
    }
    return html;
  }

  unExpand() {
    this.details = false;
    this.render();
  }

  select(elementName) {
    // event.preventDefault();
    event.stopPropagation();
    this.unExpand();
    this.selectedFilterDOM(elementName);
  }

  selectedFilterDOM(elementName) {
    // console.log(elementName);
    if (!allSelectedFilters.includes(elementName)) {
      allSelectedFilters.push(elementName);
      this.filtersSelectedDOM.innerHTML += `<div class="content ${
        this.name
      }" onclick="selectMenus.${this.name.toLowerCase()}.removeselectedFilterDOM('${elementName}')">${elementName}</div>`;
    }
    console.log(allSelectedFilters);
    datamanager.filtersHandle(allSelectedFilters)
  }

  removeselectedFilterDOM(elementName) {
    console.log(elementName);
    const index = allSelectedFilters.indexOf(elementName);
    if (index > -1) {
      allSelectedFilters.splice(index, 1);
      event.currentTarget.remove();
    }
    console.log(allSelectedFilters);
    datamanager.filtersHandle(allSelectedFilters)
  }

  setFocusToTextBox(id) {
    document.getElementById(id).focus();
  }
}
