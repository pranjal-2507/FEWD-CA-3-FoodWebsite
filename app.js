// Declaring Variables

const RandomImg = document.getElementById("Random");
const RandomfoodName = document.getElementById("RandomFoodName");
const SearchBtn = document.getElementById("searchBtn")
const InputFood = document.getElementById("Input")
const foodContainer = document.getElementById("foodContainer")
const IngCloseBtn = document.getElementById("close");
const modal = document.getElementById("modal");
let id;

// Function to fetch Random Images with API
async function FetchRandomImg() {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await response.json()
    const meal = data.meals[0];
    id = data.meals[0].idMeal

    RandomImg.src = meal.strMealThumb
    RandomfoodName.innerHTML = meal.strMeal


}
FetchRandomImg()

IngCloseBtn.addEventListener('click', function () {
    modal.style.display = "none";
})

RandomImg.addEventListener('click', function () {
    getIngredients(id)
    modal.style.display = "block";
})


SearchBtn.addEventListener('click', function () {
    SearchFoods(InputFood.value)
})

// Function to display ingredients of specific dish on the modal

const ingredientsList = document.getElementById("ingNum") 
async function getIngredients(param) {
    ingredientsList.innerHTML = ""
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${param}`)
        let data = await response.json();
        for (let i = 1; i < 21; i++) {
            if (data.meals[0][`strIngredient${i}`] != "") {
                let a = data.meals[0][`strIngredient${i}`]
                // console.log(a)
                ingredientsList.innerHTML += `<li>${a}</li>`
            }
        }

    }
    catch (error) {
        console.log("Error fatching data:", error)
    }
}

// Function Created to Access food category searched in the search bar
async function SearchFoods(a) {

    console.log(a)
    const ApiValues = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${a}`
    try {
        const response = await fetch(ApiValues);
        const data = await response.json();
        console.log(data.meals)
        ShowFoodItems(data.meals);

    }
    catch (error) {
        console.log("Error Finding images:", error)
    }

}

// Function used to display the search food items at the end of the website
function ShowFoodItems(meals) {
    const FoodContainer = document.getElementById("foodContainer");
    FoodContainer.innerHTML = "";
    console.log(meals)
    meals.forEach((meal) => {
        const cards = document.createElement("img");
        cards.src = meal.strMealThumb;


        console.log(meal.strMealThumb)

        const FoodName = document.createElement('p');
        FoodName.textContent = meal.strMeal;

        const ResultItems = document.createElement('div');
        ResultItems.setAttribute("id", "foodDiv")
        // ResultItems.setAttribute("id",cards)
        ResultItems.appendChild(cards);
        ResultItems.appendChild(FoodName);

        FoodContainer.appendChild(ResultItems);
    })
}




