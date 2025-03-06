const spoonacularApiKey = 'f2ca458dcd1b4c8c9009c166e03cd58a';
const exerciseDbApiKey = '20ab747536msh046cb5e8e449c2cp16d906jsn15016151d6aa';

document.getElementById("suggestions-btn").addEventListener("click", generateSuggestions);
document.getElementById("add-food").addEventListener("click", addFood);
document.getElementById("add-workout").addEventListener("click", addWorkout);

let totalCaloriesConsumed = 0;
let totalCaloriesBurned = 0;
let caloriesConsumedChart;
let caloriesBurnedChart;

// Function to initialize or update charts
function updateCaloriesChart(totalCalories, chartId, type) {
    const ctx = document.getElementById(chartId).getContext('2d');
    const remainingCalories = 2000 - totalCalories;

    if (type === "Consumed") {
        if (caloriesConsumedChart) caloriesConsumedChart.destroy();
        caloriesConsumedChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Calories', 'Remaining'],
                datasets: [{
                    data: [totalCalories, remainingCalories],
                    backgroundColor: ['#ff6384', '#36a2eb'],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: `Calories ${type} Tracker` }
                }
            }
        });
    } else {
        if (caloriesBurnedChart) caloriesBurnedChart.destroy();
        caloriesBurnedChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Calories', 'Remaining'],
                datasets: [{
                    data: [totalCalories, remainingCalories],
                    backgroundColor: ['#36a2eb', '#ff6384'],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: `Calories ${type} Tracker` }
                }
            }
        });
    }
}

async function addFood() {
    const foodName = document.getElementById("food-name").value;
    const foodQuantity = document.getElementById("food-quantity").value;

    if (foodName && foodQuantity) {
        try {
            const foodResponse = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${foodName}&apiKey=${spoonacularApiKey}`);
            const foodData = await foodResponse.json();

            // Check if the response returned any results
            if (foodData.results && foodData.results.length > 0) {
                const food = foodData.results[0];

                const li = document.createElement("li");
                li.textContent = `${foodQuantity} of ${food.name}`;

                const img = document.createElement("img");
                img.src = `https://spoonacular.com/cdn/ingredients_100x100/${food.image}`;
                img.alt = food.name;
                img.style.width = "250px"; // Thumbnail size 
                img.style.height = "250px"; // Set height for uniformity
                li.prepend(img);

                document.getElementById("added-foods-list").appendChild(li);

                // Add a placeholder calorie value
                const calories = 150; // Example; adjust as needed
                totalCaloriesConsumed += calories;
                updateCaloriesChart(totalCaloriesConsumed, "caloriesConsumedChart", "Consumed");
            } else {
                alert("No results found for that food item.");
            }

            document.getElementById("food-name").value = '';
            document.getElementById("food-quantity").value = '';
        } catch (error) {
            console.error('Error fetching food details:', error);
        }
    }
}


// Function to add workout
async function addWorkout() {
    const workoutName = document.getElementById("workout-name").value;
    const workoutDuration = document.getElementById("workout-duration").value;

    if (workoutName && workoutDuration) {
        const workoutResponse = await fetch(`https://exercisedb.p.rapidapi.com/exercises/name/${workoutName}?apiKey=${exerciseDbApiKey}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                'x-rapidapi-key': exerciseDbApiKey
            }
        });
        const workoutData = await workoutResponse.json();
        const workout = workoutData[0];

        if (workout) {
            const li = document.createElement("li");
            li.textContent = `${workoutDuration} minutes of ${workout.name}`;

            const img = document.createElement("img");
            img.src = workout.gifUrl;
            img.alt = workout.name;
            img.style.width = "250px"; // Adjusted image size for workout items
            img.style.height = "250px"; // Set height for uniformity
            li.prepend(img);

            document.getElementById("added-workouts-list").appendChild(li);

            const calories = 250; // Replace with actual data if available
            totalCaloriesBurned += calories;
            updateCaloriesChart(totalCaloriesBurned, "caloriesBurnedChart", "Burned");
        }

        document.getElementById("workout-name").value = '';
        document.getElementById("workout-duration").value = '';
    }
}

// Function to generate workout and food suggestions
async function generateSuggestions() {
    try {
        // Fetch multiple food suggestions
        const foodResponse = await fetch(`https://api.spoonacular.com/recipes/random?number=5&apiKey=${spoonacularApiKey}`);
        const foodData = await foodResponse.json();
        const foods = foodData.recipes;

        const workoutResponse = await fetch(`https://exercisedb.p.rapidapi.com/exercises?apiKey=${exerciseDbApiKey}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                'x-rapidapi-key': exerciseDbApiKey
            }
        });
        const workoutData = await workoutResponse.json();

        let workoutList = document.querySelector("#workout-suggestions ul");
        let foodList = document.querySelector("#food-suggestions ul");

        workoutList.innerHTML = "";
        foodList.innerHTML = "";

        workoutData.slice(0, 5).forEach(workout => {
            let li = document.createElement("li");
            li.textContent = workout.name;

            const img = document.createElement("img");
            img.src = workout.gifUrl;
            img.alt = workout.name;
            li.appendChild(img);
            workoutList.appendChild(li);
        });

        foods.forEach(recipe => {
            let li = document.createElement("li");
            li.textContent = recipe.title;

            const img = document.createElement("img");
            img.src = recipe.image;
            img.alt = recipe.title;
            li.appendChild(img);
            foodList.appendChild(li);
        });

        estimateDaysLeft();
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}

// Function to estimate days left to reach goal
function estimateDaysLeft() {
    const currentWeight = parseInt(document.getElementById("current-weight").value);
    const goalWeight = parseInt(document.getElementById("goal-weight").value);

    if (currentWeight && goalWeight) {
        const weightDifference = currentWeight - goalWeight;
        const days = weightDifference * 7; // Assuming 1 kg per week
        document.getElementById("days-left").textContent = days;
    }
}

// Update goal estimation when setting the goal
document.getElementById("goal-weight").addEventListener("change", estimateDaysLeft);

async function suggestFoodItems(foodName) {
    try {
        const response = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${foodName}&apiKey=${spoonacularApiKey}`);
        const data = await response.json();

        const suggestionsContainer = document.getElementById("suggested-foods");
        suggestionsContainer.innerHTML = ""; // Clear previous suggestions

        data.results.forEach(food => {
            const item = document.createElement("div");
            item.classList.add("suggested-item");
            item.textContent = food.name;

            // Add click event to show food details
            item.addEventListener("click", () => showFoodDetails(food));

            suggestionsContainer.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching suggested foods:', error);
    }
}

async function showFoodDetails(food) {
    try {
        const foodDetailsResponse = await fetch(`https://api.spoonacular.com/food/ingredients/${food.id}/information?apiKey=${spoonacularApiKey}`);
        const foodDetails = await foodDetailsResponse.json();

        document.getElementById("foodName").textContent = foodDetails.name;
        document.getElementById("foodImage").src = `https://spoonacular.com/cdn/ingredients_100x100/${foodDetails.image}`;
        document.getElementById("foodDetails").textContent = `Category: ${foodDetails.aisle}, Possible Uses: ${foodDetails.possibleUnits.join(', ')}`;

        // Show the modal and overlay
        document.getElementById("foodDetailsModal").style.display = "block";
        document.getElementById("modalOverlay").style.display = "block";
    } catch (error) {
        console.error('Error fetching food details:', error);
    }
}

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("foodDetailsModal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
});

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("foodDetailsModal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
});
