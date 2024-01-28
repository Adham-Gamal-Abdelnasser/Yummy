import { Ui } from "./Ui.js";
export class Home {
  constructor() {
    $(document).ready(()=>{
      this.getMealsAndSearch("s","").then(()=>{
        this.hideLoadingScreen()
  
      });
    })
    this.ui = new Ui();
    
    this.search = document.getElementById("search");
    this.categories = document.getElementById("categories");
    this.area = document.getElementById("area");
    this.ingredients = document.getElementById("ingredients");
    this.contact = document.getElementById("contact");
    this.area.addEventListener("click", () => {
      this.showLoadingScreen()
      this.getAreas();
      this.hideLoadingScreen()
    });
    this.categories.addEventListener("click", () => {
      this.showLoadingScreen()
      this.getCategories();
      this.hideLoadingScreen()
    });
    this.ingredients.addEventListener("click", () => {
      this.showLoadingScreen()
      this.getIngredients();
      this.hideLoadingScreen()
    });
    this.contact.addEventListener("click", () => {
      this.ui.displayContact();
      this.setContactValidation();
      document.getElementById("submitBtn").addEventListener("click", () => {
        document.getElementById("inName").value = "";
        document.getElementById("inMail").value = "";
        document.getElementById("inPhone").value = "";
        document.getElementById("inAge").value = "";
        document.getElementById("inPassword").value = "";
        document.getElementById("inRepassword").value = "";
        window.location.reload();
      });
    });
    this.searchInputName;
    this.searchInputFirstLetter;
    this.searchedMealsArea;
    this.search.addEventListener("click", () => {
      this.ui.displaySearch();
      this.searchInputName = document.getElementById("searchInputName")
      this.searchInputFirstLetter = document.getElementById("searchInputFirstLetter")
      this.searchedMealsArea = document.getElementById("searchedMealsArea")
      this.searchInputName.addEventListener("keyup",() => {
        this.getMealsAndSearch("s",this.searchInputName.value)
      })
      this.searchInputFirstLetter.addEventListener("keyup",() => {
        
        this.searchInputFirstLetter.value ? this.getMealsAndSearch("f",this.searchInputFirstLetter.value.toLowerCase()) : this.ui.searchedMealsArea.innerHTML=""
      })
    });
    
  }

  async getMealsAndSearch(apiLetter,mealNameOrFirstLetter) {
    const responseOfRandomMeals = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?${apiLetter}=${mealNameOrFirstLetter}`
    );
    const convertApiResponse = await responseOfRandomMeals.json();
    convertApiResponse.meals ? this.ui.displayMeals(convertApiResponse.meals) : this.ui.displayMeals([])

  }
  async getAreas() {
    // this.showLoadingScreen()
    const responseOfAreas = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const convertAreasResponse = await responseOfAreas.json();
    this.ui.displayArea(convertAreasResponse.meals);
    let areas = Array.from(document.querySelectorAll(".area"));
    this.displayInnerSections(areas, "a");
    // this.hideLoadingScreen()
  }
  displayInnerSections(divsContainer, sectionLetter) {
    let ui = new Ui();
    divsContainer.forEach(div => {
      div.addEventListener("click", async function () {
        
        let responseOfSelected = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?${sectionLetter}=${div.dataset.section}`
        );
        let convertResponseOfSelected = await responseOfSelected.json();
        ui.displayMeals(convertResponseOfSelected.meals);
      });
    });
  }
  async getCategories() {
    const responseOfCategories = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const convertCategoriesResponse = await responseOfCategories.json();
    this.ui.displayCategories(convertCategoriesResponse.categories);
    let categories = Array.from(document.querySelectorAll(".category"));
    this.displayInnerSections(categories, "c");
  }
  async getIngredients() {
    const responseOfIngredients = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    const convertIngredientsResponse = await responseOfIngredients.json();
    this.ui.displayIngredients(convertIngredientsResponse.meals);
    let ingredients = Array.from(document.querySelectorAll(".ingredient"));
    this.displayInnerSections(ingredients, "i");
  }
  setContactValidation() {
    const inName = document.getElementById("inName");
    const inMail = document.getElementById("inMail");
    const inPhone = document.getElementById("inPhone");
    const inAge = document.getElementById("inAge");
    const inPassword = document.getElementById("inPassword");
    const inRepassword = document.getElementById("inRepassword");
    const nameError = document.getElementById("nameError");
    const mailError = document.getElementById("mailError");
    const phoneError = document.getElementById("phoneError");
    const ageError = document.getElementById("ageError");
    const passError = document.getElementById("passError");
    const repassError = document.getElementById("repassError");

    inName.addEventListener("keyup", () => {
      if (!/[a-zA-Z]/gi.test(inName.value)) {
        nameError.classList.remove("d-none");
      } else {
        nameError.classList.add("d-none");
        this.ui.nameTouched = true;
        this.submitButtonOn();
      }
    });

    inMail.addEventListener("keyup", () => {
      if (!/\w@\w.\w/gi.test(inMail.value)) {
        mailError.classList.remove("d-none");
        this.ui.mailTouched = false;
      } else {
        mailError.classList.add("d-none");
        this.ui.mailTouched = true;
        this.submitButtonOn();
      }
    });

    inAge.addEventListener("keyup", () => {
      if (!/^(1[5-9]|[2-4][0-9]|5[0-5])$/gi.test(inAge.value)) {
        ageError.classList.remove("d-none");
        this.ui.ageTouched = false;
      } else {
        ageError.classList.add("d-none");
        this.ui.ageTouched = true;
        this.submitButtonOn();
      }
    });

    inPhone.addEventListener("keyup", () => {
      if (
        !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
          inPhone.value
        )
      ) {
        phoneError.classList.remove("d-none");
        this.ui.phoneTouched = false;
      } else {
        phoneError.classList.add("d-none");
        this.ui.phoneTouched = true;
        this.submitButtonOn();
      }
    });

    inPassword.addEventListener("keyup", () => {
      if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/gi.test(inPassword.value)) {
        passError.classList.remove("d-none");
        this.ui.passTouched = false;
      } else {
        passError.classList.add("d-none");
        this.ui.passTouched = true;
        this.submitButtonOn();
      }
    });

    inRepassword.addEventListener("keyup", () => {
      if (inRepassword.value != inPassword.value) {
        repassError.classList.remove("d-none");
        this.ui.repassTouched = false;
      } else {
        repassError.classList.add("d-none");
        this.ui.repassTouched = true;
        this.submitButtonOn();
      }
    });
  }
  submitButtonOn() {
    const submitBtn = document.getElementById("submitBtn");

    if (
      this.ui.nameTouched &&
      this.ui.mailTouched &&
      this.ui.phoneTouched &&
      this.ui.ageTouched &&
      this.ui.passTouched &&
      this.ui.repassTouched
    ) {
      submitBtn.removeAttribute("disabled");
    }
  }
  hideLoadingScreen() {
    $(".loading").fadeOut(500)
  }
  showLoadingScreen(){
    $(".loading").fadeIn(0)
  }
}
