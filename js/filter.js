export default class Filter {
  constructor(props) {
    this.name = props.name;
    this.recipes = props.recipes;
    this.activeRecipes = [];

    this.DOM = document.createElement("article");
    this.DOM.innerHTML = this.template();
    this.DOM.className = `box ${this.name}`;
    document.querySelector(".option-search").appendChild(this.DOM);
    this.DOM.onclick = this.click.bind(this);
    this.details = false;
    selectMenus[props.name.toLowerCase()] = this;
    this.filtersSelectedDOM = document.querySelector(
      "body > header > section.selected-filters"
    );
    this.DOM.oninput = this.handleFilterInput.bind(this);
    this.DOMdetails = document.createElement("ul");
    this.DOMdetails.id = this.name;
    this.DOM.appendChild(this.DOMdetails);
    this.inputValue = document.querySelector(
      ".box." + this.name + " .topBox :first-child"
    ).value;
  }

  handleFilterInput() {
    this.inputValue = document.querySelector(
      ".box." + this.name + " .topBox :first-child"
    ).value;
    if(this.inputValue.length>3 || this.inputValue.length === 0){
    this.activeRecipes = datamanager.getFiltersData(
      this.name,
      this.inputValue.toString().toLowerCase()
    );
    this.details = true;
    this.render();}
  }

  click() {
    for (const key of Object.keys(selectMenus)) {
      if (key !== this.name.toLowerCase()) selectMenus[key].unExpand();
    }
    this.details = !this.details;
    this.activeRecipes = this.details
      ? datamanager.getFiltersData(
          this.name,
          this.inputValue.toString().toLowerCase()
        )
      : [];
    this.render();
    datamanager.setFocusToTextBox(this.name);
  }

  template() {
    this.DOM.classList.remove("expand");
    return `<div class="topBox"><input type="text" placeholder="${this.name}" id="${this.name}"><img class="buttonArrow" src="./images/buttonArrow.svg" alt=""></div>  
        `;
  }

  render() {
    let html = "";
    if (this.details) {
      this.DOM.classList.add("expand");
      for (var i = 0; i < this.activeRecipes.length; i++) {
        html += `<li onclick="selectMenus.${this.name.toLowerCase()}.select('${this.activeRecipes[
          i
        ].replace(/'/g, "\\'")}')">${this.activeRecipes[i]}</li>`;
      }
      this.DOMdetails.innerHTML = html;
    } else {
      this.DOM.classList.remove("expand");
      this.DOMdetails.innerHTML = "";
    }
  }

  unExpand() {
    this.details = false;
    this.render();
  }

  select(elementName) {
    // event.preventDefault();
    elementName = elementName.toLowerCase();
    event.stopPropagation();
    this.selectedFilterDOM(elementName);
    datamanager.getFiltersData(this.name, elementName);
    this.unExpand();
  }

  selectedFilterDOM(elementName) {
    const appareilDOM = document.querySelector(
      "body > header > section.selected-filters > div.content.Appareil"
    );
    const li = `<div class="content ${
      this.name
    }" onclick="selectMenus.${this.name.toLowerCase()}.removeselectedFilter('${elementName.replace(
      /'/g,
      "\\'"
    )}')">${elementName}</div>`;
    if (this.name === "Appareil" && appareilDOM !== null) {
      appareilDOM.outerHTML = li;
    } else {
      this.filtersSelectedDOM.innerHTML += li;
    }

    datamanager.activeFiltersToObject(this.name, elementName);
  }

  removeselectedFilter(elementName) {
    datamanager.removeselectedFilter(elementName);
  }

}
