let contData = document.getElementById('data')
let searchInput = document.getElementById('searchCont')
let supBtn;
// slid nav js

function loadingScreen(){
    apiData("").then(()=>{
        $(document).ready(()=>{
            $(".loadeing-screen").fadeOut(500,()=>{
                $("body").css("overflow","visible")
                $(".inner-loading").fadeOut(500)
            })
        })
    })
}
loadingScreen()
// .nava
function closeNav() {
    let box = $(".slidNav .nava").outerWidth()
    $(".nava li").animate({ top: 300 })
    $('.slidNav').animate({ left: -box }, 1000);
    $(".open-close").removeClass("fa-x");
    $(".open-close").addClass("fa-bars");
   
}

function openNav() {
    $('.slidNav').animate({ left: '0px' }, 1000);
    $(".open-close").removeClass("fa-bars");
    $(".open-close").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".nava li").eq(i).animate({
            top: 0
        }, (i + 5) * 150)
    };
}
closeNav()

$('.btns').click(function () {
    if ($(".slidNav ").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})


//end slid nav js


//start home page


let res = []
async function apiData(data) {

    searchInput.innerHTML=""
    const api = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const res = await api.json();
    let newData = res.meals
    displayData(newData)
}

apiData()

function displayData(ded) {
    let allResult = ``;


    for (let i = 0; i < ded.length; i++) {
        allResult += `
        <div  class="col-md-3 pointer g-3">
        <div onclick="mealDetails('${ded[i].idMeal}')" class="pic position-relative rounded-3">
            <div class="image"><img class="w-100" src="${ded[i].strMealThumb}" alt=""></div>
            <div class="titel position-absolute">
                <h3 id="titel">${ded[i].strMeal}</h3>
            </div>
        </div>
        
      </div>
        `

    }
    contData.innerHTML = allResult
}
//end home page

// start Categories

async function getCategories() {
    
    
    $(".inner-loading").fadeIn(500)


    searchInput.innerHTML="";  
    let res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let allRes = await res.json()
    displayCat(allRes.categories)
    $(".inner-loading").fadeOut(500)
    
    
}

function displayCat(ded) {
    let allResult = ``;


    for (let i = 0; i < ded.length; i++) {
        allResult += `
        <div  class="col-md-3 pointer g-3">
        <div onclick="getCatMeal('${ded[i].strCategory}')" class="pic position-relative rounded-3">
            <div class="image"><img class="w-100" src="${ded[i].strCategoryThumb}" alt=""></div>
            <div class="titel position-absolute">
                <h3 id="titel">${ded[i].strCategory}</h3>
            </div>
        </div>
        
      </div>
        `

    }
    contData.innerHTML = allResult
}


async function getCatMeal(Cat) {
    $(".inner-loading").fadeIn(500)
    closeNav()
    
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Cat}`)
    let allRes = await res.json()
    displayData(allRes.meals.slice(0,20))
    $(".inner-loading").fadeOut(500)
}
// end Categories

// start aria

async function getAria() {
    $(".inner-loading").fadeIn(500)
    let res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let allRes = await res.json()
    let allrese = allRes.meals
    displayAria(allrese)
    searchInput.innerHTML=""
    $(".inner-loading").fadeOut(500)
}

function displayAria(ded) {
    let allResult = ``;


    for (let i = 0; i < ded.length; i++) {
        allResult += `
        <div onclick="getAriaMeal('${ded[i].strArea}')"  class="col-md-3 pointer g-3">
        <div class="pi  text-center rounded-3">
            <div class="im text-white"><i class="fa-solid fa-house-chimney"></i></div>
            <div class="ti">
                <h3 class=" text-center text-white ">${ded[i].strArea}</h3>
            </div>
        </div>
        
      </div>
        `

    }
    contData.innerHTML = allResult
}

async function getAriaMeal(aria) {
    $(".inner-loading").fadeIn(500)
    closeNav()
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${aria}`)
    let allRes = await res.json()
    displayData(allRes.meals.slice(0,20))
    $(".inner-loading").fadeOut(500)
}

// end aria

// start Ingredient
async function getIngredient() {
    $(".inner-loading").fadeIn(500)
    let res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let allRes = await res.json()
    let allrese = allRes.meals
    
    displayIng(allrese)
    searchInput.innerHTML=""
    $(".inner-loading").fadeOut(500)
}

function displayIng(ded) {
    let allResult = ``;


    for (let i = 0; i < ded.length; i++) {
        allResult += `
        <div  class="col-md-3 pointer g-3">
        <div onclick="getIngredientMeal('${ded[i].strIngredient}')" class="pi text-center rounded-3">
            <div class="im text-white"><i class="fa-solid fa-bowl-food"></i></div>
            <div class="ti">
                <h3 class=" text-center text-white ">${ded[i].strIngredient}</h3>
            </div>
        </div>
        
      </div>
        `

    }
    contData.innerHTML = allResult
}

async function getIngredientMeal(ing) {
    $(".inner-loading").fadeIn(500)
    closeNav()
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
    let allRes = await res.json()
    displayData(allRes.meals.slice(0,20))
    $(".inner-loading").fadeOut(500)
}
// end Ingredient


// start display details
async function mealDetails(mealID) {
    $(".inner-loading").fadeIn(500)
    closeNav()
   let mealD = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
   let res = await mealD.json() 
   displayDetails(res.meals[0])
   searchInput.innerHTML=""
   $(".inner-loading").fadeOut(500)
}

function displayDetails(mealsD) {
let ingredients = ``
for(let i = 1 ; i <= 20 ; i++ ){
if(mealsD[`strIngredient${i}`]){
    ingredients +=`<li class="alert alert-info p-2 m-2">${mealsD[`strMeasure${i}`]} ${mealsD[`strIngredient${i}`]}</li>`
    
}
}


let tags = mealsD.strTags?.split(",")
if(!tags) tags=[]

let tagsStr=''
for(let i=0;i<tags.length;i++){
    tagsStr+=`<li class="alert alert-danger p-2 m-2">${tags[i]}</li>`
}


   let meal=`<div class="col-md-4 mt-3">
   <img class="w-100" src="${mealsD.strMealThumb}" alt="">
</div>

<div class="col-md-8 text-white mt-3">
   <h2>${mealsD.strMeal}</h2>
   <p>${mealsD.strInstructions}</p>
        <h6><span class="fw-bolder">Area : </span>${mealsD.strArea}</h6>
        <h6><span class="fw-bolder">Category : </span>${mealsD.strCategory}</h6>

        <h2>Recips :</h2>
        <ul class="list-unstyled d-flex flex-wrap">
           ${ingredients}
        </ul>

        <h2>Tags :</h2>
        <ul class="list-unstyled d-flex flex-wrap">
           ${tagsStr}
        </ul>

        <a target="_blank" href="${mealsD.strSource}" class="btn btn-success rounded-3">Source</a>
        <a target="_blank"  href="${mealsD.strYoutube}" class="btn btn-danger rounded-3">Youtube</a>
</div>
`
contData.innerHTML = meal
}


// end display details

// start search
function showSearch(){
   let searchBox=` <div class="col-md-6 p-3 ">
   <div class="sname ">
   
   <input onkeyup="searchbyWord(this.value)" placeholder="Search By Name" class="form-control  " type="text">
   
   </div>
</div>
<div class="col-md-6 p-3">
<div class="slitter ">

<input onkeyup="searchbyFl(this.value)" maxlength="1" placeholder="Search By Firist Litter" class="form-control" type="text">

</div>
</div>`



searchInput.innerHTML=searchBox
contData.innerHTML= "" 
}

async function searchbyWord(term) {
    $(".inner-loading").fadeIn(500)
    let resa= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    let respo = await resa.json();
    respo.meals?displayData(respo.meals):displayData([])
    $(".inner-loading").fadeOut(500)
}

async function searchbyFl(term) {
    $(".inner-loading").fadeIn(500)
    term == ""? term = "a" : "";
    let res= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    let respo = await res.json();
    respo.meals?displayData(respo.meals):displayData([])
    $(".inner-loading").fadeOut(500)
}
// end search

// start contact us

function showContact(){
    let contactBox=`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-50 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onKeyup="inputsValidation()" class="form-control" placeholder="Enter Your Name" type="text">
            </div>
            <div class="col-md-6">
                <input id="emailInput" onKeyup="inputsValidation()" class="form-control" placeholder="Enter Your Email" type="email">
            </div>
            <div class="col-md-6">
                <input id="phoneInput"  onKeyup="inputsValidation()" class="form-control" placeholder="Enter Your Phone" type="number">
            </div>
            <div class="col-md-6">
                <input id="ageInput" maxlength="2" onKeyup="inputsValidation()" class="form-control" placeholder="Enter Your Age" type="number">
            </div>
            <div class="col-md-6">
                <input id="passInput" onKeyup="inputsValidation()" class="form-control" placeholder="Enter Your Password" type="password">
            </div>  <div class="col-md-6">
                <input id="repassInput" onKeyup="inputsValidation()" class="form-control" placeholder="Repassword" type="password">
            </div>
        </div>
        <button id="supBtn" disabled class="btn btn-outline-danger  px-2 mt-3 fs-5">Submit</button>
    </div>
</div> -->`
 contData.innerHTML=contactBox
 supBtn = document.getElementById("supBtn")
 }

 function inputsValidation() {
    if(nameValidation() &&
    emailValidation()&&
    phoneValidation()&&
    ageValidation()&&
    passValidation()&&
    repassValidation()
    ){
        supBtn.removeAttribute("disabled")
    }else{
        supBtn.setAttribute("disabled",true)
    }
 }

 function nameValidation() {
  return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value)) 
 }

 function emailValidation() {
    return (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(document.getElementById("emailInput").value))
 }
 function phoneValidation() {
    return (/^01[0125][0-9]{8}$/.test(document.getElementById("phoneInput").value))
 }
 function ageValidation() {
    return (/^\S[0-9]{0,3}$/.test(document.getElementById("ageInput").value))
 }
 function passValidation() {
    return (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(document.getElementById("passInput").value))
 }
 function repassValidation() {
    return (document.getElementById("repassInput").value == document.getElementById("passInput").value) 
 }
 
// end contact us

