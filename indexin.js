  function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
const ingredientsDiv = document.getElementById("ingredients");
  const mealsDiv = document.getElementById("meals");

  // جلب كل الـ Ingredients
  async function getIngredients() {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    const data = await res.json();
    showIngredients(data.meals.slice(0, 40)); // نعرض أول 40 فقط
  }

  // عرض قائمة الـ Ingredients
  function showIngredients(list) {
    ingredientsDiv.innerHTML = "";

    list.forEach(ing => {
      const description = ing.strDescription 
        ? ing.strDescription.slice(0, 100) + "..."
        : "No description available.";

      const box = document.createElement("div");
      box.className = "ingredient-item";

      box.innerHTML = `
        <i class="fa-solid fa-drumstick-bite"></i>
        <div class="ingredient-name">${ing.strIngredient}</div>
        <div class="ingredient-desc">${description}</div>
      `;

      box.addEventListener("click", () => selectIngredient(box, ing.strIngredient));
      ingredientsDiv.appendChild(box);
    });
  }

  // عند الضغط على Ingredient
  async function selectIngredient(selectedBox, ingredient) {
    // إخفاء باقي العناصر
    const all = document.querySelectorAll(".ingredient-item");
    all.forEach(item => { if (item !== selectedBox) item.style.display = "none"; });

    // جلب الوجبات الخاصة بهذا الـ Ingredient
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await res.json();

    showMeals(data.meals);
  }

  // عرض الوجبات الناتجة
  function showMeals(meals) {
    mealsDiv.innerHTML = "";

    meals.forEach(meal => {
      const card = document.createElement("div");
      card.className = "meal-card";

      card.innerHTML = `
        <img src="${meal.strMealThumb}">
        <div class="meal-overlay">${meal.strMeal}</div>
      `;

      mealsDiv.appendChild(card);
    });
  }

  getIngredients();

 if (performance.getEntriesByType("navigation")[0].type === "reload") {
        window.location.href = "index.html";  }