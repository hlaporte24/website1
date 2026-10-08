/* next recipe is real and cycles through the list of const recipes, but add a recipe just opens and closes the form modal and doesn't save anything */
 
const recipes = [
  {
    title: "Chicken Cutlets",
    url: "https://cooking.nytimes.com/recipes/1025485-chicken-cutlets",
    ingredients: ["2 boneless, skinless chicken breasts (about 8 ounces each)", "salt and black pepper", "½ cup all-purpose flour", "2 large eggs", "1½ cups panko bread crumbs", "⅓ cup grated Parmesan", "½ teaspoon garlic powder", "½ teaspoon Italian seasoning", "⅓ cup extra-virgin olive oil", "⅓ cup neutral oil, such as canola or avocado oil"],
    steps: ["Pat the chicken breasts dry with a paper towel, then carefully slice each in half horizontally to form two thin cutlets. Using a meat mallet or a rolling pin, pound the cutlets until they are somewhere between ⅛- and ¼-inch thick. Season the chicken all over with ½ teaspoon salt and ¼ teaspoon pepper.", "Place the flour in a shallow bowl or rimmed plate. Crack the eggs into a second bowl and beat them with a fork. In a third bowl, combine the panko, Parmesan, garlic powder, Italian seasoning, ½ teaspoon salt and ¼ teaspoon pepper.", "Working one at a time, dip the chicken breasts into the flour, shaking off any excess, then into the egg mixture, then the panko mixture. Place the chicken breasts on a plate until ready to cook.", "Heat the olive oil and canola oil in a large (12-inch) skillet over medium-high. When the oil is hot (it should sizzle immediately if you drop a bread crumb into the pan), carefully place two cutlets in the pan. Adjust the heat to medium and cook about 2 minutes on each side, until golden-brown and just cooked through."]
  },
  {
    title: "Marry Me Chicken",
    url: "https://cooking.nytimes.com/recipes/1024503-marry-me-chicken",
    ingredients: ["3 large boneless, skinless chicken breasts, or 6 chicken cutlets (about 2 ¼ pounds total), patted dry", "Kosher salt (such as Diamond Crystal) and black pepper", "¼ cup all-purpose flour", "3 tablespoons extra-virgin olive oil, plus more as needed", "3 tablespoons unsalted butter", "3 garlic cloves, chopped", "1 tablespoon tomato paste", "½ teaspoon dried oregano", "Red-pepper flakes, to taste", "1 cup low-sodium chicken stock", "½ to ¾ cup heavy cream", "½ cup (1 ½ ounces) grated Parmesan", "⅓ cup sliced sun-dried tomatoes, packed in oil", "Fresh basil, for serving"],
    steps: ["If using chicken breasts, start from the thickest end and slice each chicken breast in half horizontally so you end up with a total of 6 cutlets (see Tip). Season both sides of the chicken cutlets well with salt and pepper.", "Scatter the flour on a large plate and coat the cutlets, shaking off the excess. Transfer the cutlets to a sheet pan or large plate in a single layer.", "Heat the oil in a large pan over medium-high. Once hot, reduce the heat to medium and add the butter. As soon as it melts, add the cutlets and cook until golden on one side, about 5 minutes. Flip the chicken and cook the other side until golden, 4 to 5 minutes. Do this in batches, if needed, adding more oil, if needed. Transfer the cutlets to a plate or sheet pan.", "Reduce the heat to low, add the garlic and cook, stirring often, until fragrant, 1 to 2 minutes. Add the tomato paste, stirring until the color deepens, about 2 minutes. Add the oregano and red-pepper flakes, to taste.", "Increase the heat to medium, add the stock and bring to a simmer, scraping up any bits from the bottom of the pan, until the liquid is reduced by half, about 5 minutes.", "Add ½ cup of the cream and warm through, stirring, until it thickens slightly, about 3 minutes. Watch the cream closely, reducing the heat if necessary, to maintain a gentle simmer. Stir in the Parmesan and the sun-dried tomatoes. Add more cream, if you like, and season the sauce.", "Place the chicken back in the pan to warm through, about 4 minutes. Remove from the heat and scatter basil on top."]
  },
  {
    title: "Sugar Snap Pea Salad",
    url: "https://www.inspiredtaste.net/101374/snap-pea-salad-recipe/",
    ingredients: ["1 medium shallot, minced", "1 large lemon, zested and juiced", "1 ½ tablespoons honey", "2 teaspoons Dijon mustard", "¼ cup (60 ml) extra-virgin olive oil", "Fine sea salt", "Freshly ground black pepper", "1 pound (450 g) sugar snap peas (about 4 cups)", "3 medium radishes, thinly sliced", "3 green onions, thinly sliced", "¼ cup fresh mint leaves, roughly chopped, plus more for serving", "½ cup fresh parsley, roughly chopped, plus more for serving", "3 ounces (85 g) feta cheese, crumbled (about ¾ cup), plus more for serving"],
    steps: ["In a large bowl, whisk together the shallot, lemon zest, lemon juice, honey, mustard, and olive oil. Season to taste with a generous pinch of salt and pepper.", "Working with a few snap peas at a time, trim the ends, then thinly slice them diagonally.", "Add the snap peas, radishes, green onions, mint, parsley, and feta cheese to the bowl. Toss gently to combine, then serve with additional crumbled feta cheese and herbs scattered over the top, if desired."]
  }
];

let currentRecipeIndex = 0;

const recipeTitle = document.getElementById('recipe-title');
const recipeIngredients = document.getElementById('recipe-ingredients');
const recipeSteps = document.getElementById('recipe-steps');
const nextRecipeBtn = document.getElementById('next-btn');
const addRecipeBtn = document.getElementById('add-recipe-btn');
const addRecipeOverlay = document.getElementById('add-recipe-overlay');
const closeAddRecipe = document.getElementById('close-add-recipe');
const addRecipeForm = document.getElementById('add-recipe-form');

function showRecipe(index){
    const recipe = recipes[index];

    recipeTitle.innerHTML = '';
    const titleLink = document.createElement('a');
    titleLink.href = recipe.url;
    titleLink.textContent = recipe.title;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
    recipeTitle.appendChild(titleLink);

    recipeIngredients.innerHTML = '';
    recipe.ingredients.forEach(function(ingredient){
        const li = document.createElement('li');
        li.textContent = ingredient;
        recipeIngredients.appendChild(li);
    });

    recipeSteps.innerHTML = '';
    recipe.steps.forEach(function(step){
        const li = document.createElement('li');
        li.textContent = step;
        recipeSteps.appendChild(li);
    });
}

nextRecipeBtn.addEventListener('click', () =>{
    currentRecipeIndex++;
    if(currentRecipeIndex>= recipes.length){
        currentRecipeIndex = 0;
    }

    showRecipe(currentRecipeIndex);
});

addRecipeBtn.addEventListener('click', () => {
    addRecipeOverlay.classList.remove('hidden');
});

closeAddRecipe.addEventListener('click', () => {
    addRecipeOverlay.classList.add('hidden');
    addRecipeForm.reset();
});

addRecipeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addRecipeOverlay.classList.add('hidden');
    addRecipeForm.reset();
});

showRecipe(currentRecipeIndex);