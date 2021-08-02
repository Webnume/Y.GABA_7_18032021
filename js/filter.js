export default class Filter {
  constructor(props) {
    this.name = props.name;
    this.recipes = props.recipes;
    this.activeRecipes =  [] ;

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
    this.DOMdetails.id=this.name;
    this.DOM.appendChild(this.DOMdetails);
  }

  handleFilterInput() {
    this.inputValue=document.querySelector(".box."+this.name+" .topBox :first-child").value;
    this.activeRecipes = datamanager.getFiltersData(this.name, this.inputValue.toString().toLowerCase());
    this.details = true;
    this.render();
  }

  click() {
    for (const key of Object.keys(selectMenus)) {
      if (key !== this.name.toLowerCase()) selectMenus[key].unExpand();    }
    this.details = !this.details;
    this.activeRecipes = this.details ? datamanager.getFiltersData(this.name) : [];
    this.render();
    this.setFocusToTextBox(this.name);

    // const searchStr=document.querySelector("#search").value.toString().toLowerCase();
    // this.UpdateLists = datamanager.getFiltersData(this.name, searchStr);
    // this.render(this.UpdateLists);
  }

  template() {
    this.DOM.classList.remove("expand");
    return `<div class="topBox"><input type="text" placeholder="${this.name}" id="${this.name}"><img class="buttonArrow" src="./images/buttonArrow.svg" alt=""></div>  
        `;
  }

  render(tab) {
    let html = "";
    if (typeof tab !=="undefined") this.activeRecipes=tab;
    if(this.details) {
      this.DOM.classList.add("expand");
      for (var i = 0; i < this.activeRecipes.length; i++) {
        html += `<li onclick="selectMenus.${this.name.toLowerCase()}.select('${
          this.activeRecipes[i]
        }')">${this.activeRecipes[i]}</li>`;
      }
      this.DOMdetails.innerHTML= html;
    }
    else{
      this.DOM.classList.remove("expand");
      this.DOMdetails.innerHTML= "";
    }
  }

  unExpand() {
    this.details = false;
    this.render();
  }

  select(elementName) {
    // event.preventDefault();
    event.stopPropagation();
    this.selectedFilterDOM(elementName);
    this.unExpand();
  }

  selectedFilterDOM(elementName) {
    if (!allSelectedFilters.includes(elementName)) {
      allSelectedFilters.push(elementName);
      this.filtersSelectedDOM.innerHTML += `<div class="content ${
        this.name
      }" onclick="selectMenus.${this.name.toLowerCase()}.removeselectedFilterDOM('${elementName}')">${elementName}</div>`;
    }
    console.log(allSelectedFilters );
    datamanager.search(elementName);

  }

  removeselectedFilterDOM(elementName) {
    const index = allSelectedFilters.indexOf(elementName);
    if (index > -1) {
      allSelectedFilters.splice(index, 1);
      event.currentTarget.remove();
    }
  }

  setFocusToTextBox(id) {
    document.getElementById(id).focus();
  }
}
