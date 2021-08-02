export default class SearchMain {
  constructor(props) {
    this.recipes = props;
    this.DOM = document.querySelector("body > header > section.main-search");
    this.render();
    this.searchDOM = document.querySelector("#search");
    this.searchDOM.oninput = this.handleMainSearch.bind(this);
    this.activeRecipes = [];
  }

  render() {
    this.DOM.innerHTML = this.template();
  }

  template() {
    return `  <input type="text" placeholder="Rechercher un ingrédient, appareil, ustensiles ou une recette" name="search" id="search">
      <button type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>    
        `;
  }

  handleMainSearch() {
    datamanager.search(this.searchDOM.value.toString().toLowerCase());
  }
}
