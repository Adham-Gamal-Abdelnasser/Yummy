import { Details } from "./Details.js"

export class Ui{
    constructor(){
        this.rowData = document.getElementById("rowData")
        this.searchedMealsArea = document.getElementById("searchedMealsArea")
        this.searchInputs = document.getElementById("searchInputs")
        this.nameTouched = false
        this.mailTouched = false
        this.phoneTouched = false
        this.ageTouched = false
        this.passTouched = false
        this.repassTouched = false
    }
    displayMeals(data){
        let mealsBox = ``
        for (let i = 0; i < data.length; i++) {
            mealsBox += `
        
            <div class="col-md-3 my-3">
            <div data-id="${data[i].idMeal}" class="meal cursor-pointer w-100 position-relative overflow-hidden
                rounded-3 ">
                <img src="${data[i].strMealThumb}" class="w-100 "
                    alt="${data[i].strMeal}" />
                <div class="caption bg-white w-100 position-absolute
                    h-100 d-flex align-items-center">
                    <h2 class="text-black">${data[i].strMeal}</h2>

                </div>
            </div>
        </div>
            ` 
        }
        this.emptySearchedMealsArea()
        this.rowData.innerHTML = mealsBox
        if (document.getElementById("searchInputName")) {
            this.rowData.innerHTML = ""
            this.searchedMealsArea.innerHTML = mealsBox
        }
        let meals= Array.from(document.querySelectorAll(".meal"))
        meals.forEach(mealCard=>{
        mealCard.addEventListener("click",(e)=>{
            console.log(e.target);
            console.log("not shown yet");
            new Details(mealCard.dataset.id)
            console.log("show done");
        })
        })
    }
    displayArea(data){
        let areaBox = ``
        for (let i = 0; i < data.length; i++) {
            areaBox += `
            <div class="col-md-3">
                            <div data-section="${data[i].strArea}" class="area cursor-pointer d-flex flex-column align-items-center text-white my-3">
                                <span class="fa-solid fa-house-laptop fs-1"></span>
                                <h2>${data[i].strArea}</h2>
                            </div>
                        </div>
            ` 
        }
        this.emptySearchedMealsArea()
        this.rowData.innerHTML = areaBox
        this.returnToStart()
        this.removeSearchInputs()
    }
    displayCategories (data){
        let categoryBox = ``
        for (let i = 0; i < data.length; i++) {
            categoryBox += `
                    <div class="col-md-3 my-3">
                        <div data-section="${data[i].strCategory}" class="category cursor-pointer w-100 position-relative overflow-hidden
                            rounded-3 ">
                            <img src="${data[i].strCategoryThumb}"
                                class="w-100 "
                                alt="..." />
                            <div class="caption bg-white w-100 position-absolute
                                h-100 d-flex align-items-center d-flex flex-column align-items-center p-2">
                                <h2 class="text-black">${data[i].strCategory}</h2>
                                <p>${data[i].strCategoryDescription.split(" ",20).join(" ")}</p>
                            </div>
                        </div>
                    </div>
            `            
        }
        this.returnToStart()
        this.emptySearchedMealsArea()
        this.rowData.innerHTML = categoryBox
        this.removeSearchInputs()
    }
    displayIngredients(data){
        let ingredientsBox = ``
        for (let i = 0; i < data.length; i++) {
                ingredientsBox+= `
            <div class="col-md-3">
            <div data-section="${data[i].strIngredient}" class="ingredient cursor-pointer d-flex flex-column align-items-center text-white my-3">
                <span class="fa-solid fa-drumstick-bite fa-4x"></span>
                <h2>${data[i].strIngredient}</h2>
                <p>${data[i].strDescription.split(" ",25).join(" ")}</p>
            </div>
        </div>
            `
            if (i==19) {
                break;
            }
        }
        this.emptySearchedMealsArea()
        this.rowData.innerHTML = ingredientsBox
        this.returnToStart()
        this.removeSearchInputs()
    }
    displayContact(){
        let contactBox = `
        <div class="col-md-6">
        <input type="text" class="my-2 form-control border
            border-1 border-light" placeholder="Enter Your Name"
            id="inName"/>
        <div id="nameError" class="error-mss d-none my-2 alert
            alert-danger">
            Empty feild, Special characters and numbers not allowed
        </div>
    </div>
    <div class="col-md-6">
        <input type="email" class="my-2 form-control border
            border-1 border-light" placeholder="Enter Your Mail"
            id="inMail"/>
        <div id="mailError" class="error-mss d-none my-2 alert
            alert-danger">
            Email not valid *exemple@yyy.zzz
        </div>
    </div>
    <div class="col-md-6">
        <input type="text" class="my-2 form-control border
            border-1 border-light" placeholder="Enter Your Phone" id="inPhone"/>
        <div id="phoneError" class="error-mss d-none my-2 alert
            alert-danger">
            Enter valid Phone Number with your country code
        </div>
    </div>
    <div class="col-md-6">
        <input type="text" class="my-2 form-control border
            border-1 border-light" placeholder="Enter Your Age"
            id="inAge"/>
        <div id="ageError" class="error-mss d-none my-2 alert
            alert-danger">
            Ages from 15-55
        </div>
    </div>
    <div class="col-md-6">
        <input type="password" class="my-2 form-control border
            border-1 border-light" placeholder="Enter Your Password" id="inPassword"/>
        <div id="passError" class="error-mss d-none my-2 alert
            alert-danger">
            Enter valid password *Minimum eight characters, at
            least one letter and one number:*
        </div>
    </div>
    <div class="col-md-6">
        <input type="password" class="my-2 form-control border
            border-1 border-light" placeholder="Repassword"
            id="inRepassword"/>
        <div id="repassError" class="error-mss d-none my-2 alert
            alert-danger">
            Enter the same password
        </div>
    </div>
    <div class="col-md-4 text-center my-3 mx-auto">
        <button class="btn btn-outline-primary" id="submitBtn" disabled>Submit</button>
    </div>
        `
        this.emptySearchedMealsArea()
        this.rowData.innerHTML = contactBox
        this.removeSearchInputs()
        this.returnToStart()
    }
    displaySearch() {
        let searchBox = `
        <div class="row my-4">
        <div class="col-md-6">
            <input type="text" class="my-2 form-control border border-1 border-light" placeholder="Search By Name" id="searchInputName"/> 
        </div>
        <div class="col-md-6">
            <input type="text" class="my-2 form-control border border-1 border-light" placeholder="Search By First Letter" id="searchInputFirstLetter"/> 
        </div>
    </div>
    
        `
        this.searchInputs.innerHTML= searchBox
        this.rowData.innerHTML=""
        this.returnToStart()
    }
    removeSearchInputs(){
        this.searchInputs.innerHTML = ""
    }
    emptySearchedMealsArea(){
        this.searchedMealsArea.innerHTML=""
    }
    returnToStart(){
        document.getElementById("closeBtn").addEventListener("click",()=>{
          window.location.reload()
          console.log("clicked");
        })
    }
}