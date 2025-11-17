 function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
} 
 
// عناصر HTML
const searchByName = document.getElementById("searchByName");
const searchByLetter = document.getElementById("searchByLetter");
const results = document.getElementById("results");

// ---- Search By Name ----
searchByName.addEventListener("keyup", async function () {
    let name = searchByName.value.trim();

    if (name === "") {
        results.innerHTML = "";
        return;
    }

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let res = await data.json();

    displayMeals(res.meals);
});

// ---- Search By First Letter ----
searchByLetter.addEventListener("keyup", async function () {
    let letter = searchByLetter.value.trim();

    if (letter === "") {
        results.innerHTML = "";
        return;
    }

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let res = await data.json();

    displayMeals(res.meals);
});

// ---- Display Meals ----
// function displayMeals(meals) {
//     results.innerHTML = "";

//     if (!meals) {
//         results.innerHTML = `<h3 class="text-white text-center">No results found</h3>`;
//         return;
//     }

//     meals.forEach(meal => {
//         results.innerHTML += `
//             <div class="col-md-3 mb-4">
//                 <div class="card bg-dark text-white border">
//                     <img src="${meal.strMealThumb}" class="card-img-top" alt="">
//                     <div class="card-body">
//                         <h5>${meal.strMeal}</h5>
//                     </div>
//                 </div>
//             </div>
//         `;
//     });
// }
function displayMeals(meals) {
    results.innerHTML = "";

    if (!meals) {
        results.innerHTML = `<h3 class="text-white text-center">No results found</h3>`;
        return;
    }

    meals.forEach(meal => {
        results.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="meal-box">
                    <img src="${meal.strMealThumb}" alt="">
                    <div class="meal-overlay">${meal.strMeal}</div>
                </div>
            </div>
        `;
    });
}

 if (performance.getEntriesByType("navigation")[0].type === "reload") {
        window.location.href = "indexex.html";  }