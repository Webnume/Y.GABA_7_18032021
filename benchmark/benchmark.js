import DataManager1 from "./datamanager_v1.js";
import DataManager2 from "./datamanager_v2.js";
const algos = [DataManager1, DataManager2];
const rules = {
  loop: 10000,
  filters: {
    ustensils: ["cuillère à soupe"],
    ingredients: ["jus de citron"],
    appliance: "blender",
  },
  search: "coco",
};
let data;



activeFilters = rules.filters;

async function initBench() {
  data = await fetch("../data/recipes.json");
  data = await data.json();
  let tpsAlgo1 = 0;
  let tpsAlgo2 = 0;
  console.log(data);
  for (let i = 0; i < rules.loop; i++) {
    tpsAlgo1 += test(0);
    tpsAlgo2 += test(1);
  }
  document.body.innerHTML = `tpsAlgo1:${tpsAlgo1}ms </br> tpsAlgo2:${tpsAlgo2}ms`;
}

function test(idAlgo) {
  const debut = Date.now();
  const algo = new algos[idAlgo](data);
  algo.search(rules.search);
  return Date.now() - debut;
}

initBench();
