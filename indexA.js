function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
  
const areasDiv = document.getElementById('areas');
  const resultsDiv = document.getElementById('results');

  const icons = ['fa-solid fa-house','fa-solid fa-house','fa-solid fa-house','fa-solid fa-house'];

  async function fetchAreas() {
    try {
      const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list').then(r => r.json());
      displayAreas(data.meals);
    } catch(err) {
      areasDiv.innerHTML = `<p class="text-danger">Failed to load areas</p>`;
    }
  }

  function displayAreas(areas) {
    areasDiv.innerHTML = '';
    areas.forEach((area, index) => {
      const div = document.createElement('div');
      div.className = 'area-item';
      const iconClass = icons[index % icons.length]; // تكرار أيقونات بالتتابع
      div.innerHTML = `
        <i class="${iconClass}"></i>
        <div class="area-name">${area.strArea}</div>
      `;
      div.addEventListener('click', () => selectArea(div, area.strArea));
      areasDiv.appendChild(div);
    });
  }

  async function selectArea(selectedDiv, area) {
    // إخفاء باقي الـ Areas
    const allDivs = document.querySelectorAll('.area-item');
    allDivs.forEach(div => { if (div !== selectedDiv) div.style.display = 'none'; });

    // جلب الوصفات حسب الـ Area
    try {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(area)}`).then(r => r.json());
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
      div.className = 'meal-card';
      div.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="meal-overlay">${meal.strMeal}</div>
      `;
      resultsDiv.appendChild(div);
    });
  }

  fetchAreas();
 if (performance.getEntriesByType("navigation")[0].type === "reload") {
        window.location.href = "indexex.html"; 
    }