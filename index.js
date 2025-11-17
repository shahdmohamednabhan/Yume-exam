 
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
// دالة تجيب تفاصيل الوجبة
async function getMealDetails(mealID) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    let response = await api.json();
    displayMealDetails(response.meals[0]);
}

// دالة تعرض التفاصيل وتخفي كل باقي المحتوى
function displayMealDetails(meal) {
    let tags = "";
    if (meal.strTags) tags = meal.strTags.split(",").map(t => `<li class="alert alert-danger m-2 p-1">${t}</li>`).join("");

    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    document.getElementById("rowData").innerHTML = `
        <div class="col-md-4">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
            <h2 class="text-white mt-2">${meal.strMeal}</h2>
        </div>

        <div class="col-md-8 text-white">
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>

            <h3><b>Area :</b> ${meal.strArea}</h3>
            <h3><b>Category :</b> ${meal.strCategory}</h3>

            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex flex-wrap">
                ${ingredients}
            </ul>

            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex flex-wrap">
                ${tags}
            </ul>

            <a class="btn btn-success" target="_blank" href="${meal.strSource}">Source</a>
            <a class="btn btn-danger" target="_blank" href="${meal.strYoutube}">Youtube</a>
        </div>
    `;
}
 
    