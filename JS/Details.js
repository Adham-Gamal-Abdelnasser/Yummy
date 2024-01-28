import { Home } from "./Home.js";

export class Details {
  constructor(id) {
    this.home = new Home();
    this.id = id;
    this.getDetails(this.id);
  }
  async getDetails(id) {
    this.home.showLoadingScreen();
    let detailsApi = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    let detailsRsponse = await detailsApi.json();
    let mealDetails = detailsRsponse.meals[0];
    this.displayDetails(mealDetails);
    this.home.hideLoadingScreen();
  }
  getReciepes(mealData) {
    let reciepes = [];
    for (let i = 1; i <= 20; i++) {
      if (mealData[`strIngredient${i}`] && mealData[`strMeasure${i}`]) {
        reciepes.push(
          `${mealData[`strMeasure${i}`]} ${mealData[`strIngredient${i}`]}`
        );
      }
    }
    return reciepes;
  }
  displayDetails(data) {
    let detailsBox = `
    <div class="col-md-4 text-white">
    <div class="img-detail">
      <img src="${data.strMealThumb}" class="w-100 rounded-2" alt=""/>
      <h2>${data.strMeal}</h2>
    </div>
  </div>
  <div class="col-md-8 text-white mb-4">
    <h2>Instructions</h2>
    <p>${data.strInstructions}</p>
    <h2>Area: <span class="fw-light fs-3">${data.strArea}</span></h2>
    <h2>Category: <span class="fw-light fs-3">${data.strCategory}</span></h2>
    <h2>Reciepes:</h2>
    <div class="d-flex flex-wrap gap-2 my-3 ">
      ${this.getReciepes(data)
        .map(
          (ingredient) =>
            `<span class="bg-info text-black p-1 rounded-2">${ingredient}</span>`
        )
        .toString()
        .replaceAll(",", "")}
    </div>
    
    <a target="_blank" href="${
      data.strYoutube
    }" class="btn btn-outline-danger rounded-2"><i class="fab fa-youtube"></i> Youtube</a>
    <a target="_blank" href="${
      data.strSource
    }" class="btn btn-outline-primary"><i class="fab fa-sourcetree"></i> Soruce</a>
  </div>
    `;
    this.home.ui.searchInputs.innerHTML = "";
    this.home.ui.rowData.innerHTML = "";
    this.home.ui.rowData.innerHTML = detailsBox;
    this.home.ui.returnToStart();
  }
}

/**
 getTags(mealData) {
    let tags = mealData.strTags.split(",");
    return tags;
  }

  <h2>Tags:</h2>
    <div class="d-flex flex-wrap gap-2 my-3 ">
      ${this.getTags(data)
        .map(
          (tag) =>
            `<span class="bg-info text-black p-1 rounded-2">${tag}</span>`
        )
        .toString()
        .replaceAll(",", "")}
    </div>  
 *  
 */
