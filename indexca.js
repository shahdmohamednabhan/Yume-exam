  function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
  const categoriesDiv = document.getElementById('categories');
  const resultsDiv = document.getElementById('results');
  const categoriesTitle = document.getElementById('categories-title');

  async function fetchCategories() {
    try {
      const data = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php').then(r => r.json());
      displayCategories(data.categories);
    } catch(err) {
      categoriesDiv.innerHTML = `<p class="text-danger">Failed to load categories</p>`;
    }
  }

  function displayCategories(categories) {
    categoriesDiv.innerHTML = '';
    categories.forEach(cat => {
      const div = document.createElement('div');
      div.className = 'category-card';
      div.innerHTML = `
        <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}">
        <div class="overlay">
          <h5>${cat.strCategory}</h5>
          <p>${cat.strCategoryDescription.substring(0, 80)}...</p>
        </div>
      `;
      div.addEventListener('click', () => selectCategory(div, cat.strCategory));
      categoriesDiv.appendChild(div);
    });
  }

  async function selectCategory(selectedDiv, category) {
    // إخفاء باقي الأصناف
    const allDivs = document.querySelectorAll('.category-card');
    allDivs.forEach(div => { if (div !== selectedDiv) div.style.display = 'none'; });
    selectedDiv.style.flex = '1 1 100%';

    // جلب الوجبات
    try {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`).then(r => r.json());
      displayMeals(data.meals);
    } catch(err) {
      resultsDiv.innerHTML = `<p class="text-danger">Failed to load meals</p>`;
    }
  }

  function displayMeals(meals) {
    resultsDiv.innerHTML = '';
    if (!meals) {
      resultsDiv.innerHTML = `<h3 class="text-white text-center">No results found</h3>`;
      return;
    }

    meals.forEach(meal => {
      const div = document.createElement('div');
      div.className = 'meal-card text-white';
      div.style.width = '200px';
      div.style.height = '200px';
      div.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="meal-overlay">${meal.strMeal}</div>
      `;
      resultsDiv.appendChild(div);
    });
}

  fetchCategories();
 if (performance.getEntriesByType("navigation")[0].type === "reload") {
        window.location.href = "index.html"; 
    }