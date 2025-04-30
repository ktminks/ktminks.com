//recipes variable holds current recipe book as an object
let recipes;
let newTitle;
let newIngredients;
let currentIndex;
//if user_recipes is already defined in user's localStorage
if (localStorage["user_recipes"] !== undefined) {
    //set recipes variable to whatever is stored there, parsed into a JSON object
    recipes = JSON.parse(localStorage["user_recipes"]);
} else {//otherwise, user_recipes is undefined; set recipes to array of basic recipe objects
    recipes = [
        { title: "french toast", ingredients: ["eggs", "bread", "cinnamon"] },
        { title: "stuffed shells", ingredients: ["shells", "ricotta", "spinach"] },
        { title: "breaded chicken", ingredients: ["chicken", "bread crumbs", "egg"] }];
    //stringify this initial object and set it to localStorage under user_recipes
    localStorage.setItem("user_recipes", JSON.stringify(recipes));
}

//main RecipeBox Component to be rendered later
class RecipeBox extends React.Component {
    //method necessary for establishing initial state of Component and binding functions
    constructor() {
        //calls parent constructor (React.Component)
        super();
        //sets RecipeBox's current recipes property to whatever recipes object is
        this.state = {
            recipes: recipes
        };

        //bind these functions' 'this' property to constructor's 'this' prop (RecipeBox)
        this.editRecipe = this.editRecipe.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.RecipeListItem = this.RecipeListItem.bind(this);
    }

    //method to call whenever DOM and localStorage need to be updated
    update() {
        //update current localStorage to reflect recipes array state in string form
        localStorage.setItem("user_recipes", JSON.stringify(recipes));
        this.setState({
            recipes: recipes
        });

    }

    //method for expanding and collapsing ingredients list on recipe title click
    expandRecipe(id) {
        //access list of classes on element with current id; toggle 'hidden' class 
        document.getElementById(id).classList.toggle("hidden");
        document.getElementById(id + "edit").classList.toggle("hidden");
        document.getElementById(id + "delete").classList.toggle("hidden");
    }

    //method to open/close input adding form
    openRecipeAdder() {
        //toggle 'hidden' class on title/ingredients input and add button
        document.getElementById('new-recipe-title').classList.toggle("hidden");
        document.getElementById('new-recipe-ingredients').classList.toggle("hidden");
        document.getElementById('addRecipe').classList.toggle("hidden");
        //if title input is hidden, Create New Recipe button is labeled such
        if (document.getElementById('new-recipe-title').classList.contains("hidden")) {
            document.getElementById('newRecipeButton').innerHTML = 'Create New Recipe';
        } else {//otherwise form is open, button says 'cancel'
            document.getElementById('newRecipeButton').innerHTML = 'Cancel';
        }
    }

    //method to add new recipe to list on click
    addRecipe() {
        let title = document.getElementById('new-recipe-title').value;
        //split string value of ingredients input field into an array at each comma
        let ingredients = document.getElementById('new-recipe-ingredients').value.split(",");
        if (title) {//if value of title input field is not empty
            //push new recipe object onto recipes array
            recipes.push({ title: title, ingredients: ingredients });
            //reset input fields to blank, update DOM/localStorage
            document.getElementById('new-recipe-title').value = "";
            document.getElementById('new-recipe-ingredients').value = "";
            this.update();
        } //close recipe adding form
        this.openRecipeAdder();
    }

    //method to open/close editing input form
    openRecipeEditer(id, i) {
        //toggle 'hidden' class on title/ingredients input and add buttons
        if (document.getElementById('addRecipe').classList.contains("hidden")) {
            document.getElementById('newRecipeButton').classList.toggle("hidden");
            document.getElementById('new-recipe-title').classList.toggle("hidden");
            document.getElementById('new-recipe-ingredients').classList.toggle("hidden");
            document.getElementById('editRecipe').classList.toggle("hidden");
            //fill fields with current values to edit
            document.getElementById('new-recipe-title').value = recipes[i].title;
            document.getElementById('new-recipe-ingredients').value = recipes[i].ingredients;
            currentIndex = i;
        }
    }

    //method to edit recipe at index i when its edit button is clicked
    editRecipe(id, i) {
        //on save, replace i'th value in recipes with new object
        if (document.getElementById('new-recipe-title').value) {
            newTitle = document.getElementById('new-recipe-title').value;
            newIngredients = document.getElementById('new-recipe-ingredients').value.split(',');
            recipes[currentIndex] = { title: newTitle, ingredients: newIngredients };
            this.update();
        }
        //reset input fields, close adder, update DOM
        document.getElementById('new-recipe-title').value = "";
        document.getElementById('new-recipe-ingredients').value = "";
        //close recipe editer
        this.openRecipeEditer();
    }

    //method to delete recipe at index i when its X button is clicked
    deleteRecipe(i) {
        //splice 1 item from recipes object at index i, update DOM/localStorage
        recipes.splice(i, 1);
        this.update();
    }

    //method for creating each recipe list item with passed in properties
    RecipeListItem(prop) {
        let thisTitle = prop.title;
        let i = prop.index;
        //creates an array of li's for each recipe's ingredient list
        let theseIngredients = prop.ingredients.map(ingredient => {
            return /*#__PURE__*/(
                React.createElement("li", null,
                    ingredient));


        });

        return /*#__PURE__*/ (//JSX to be returned with each instance of the RecipeListItem component
            React.createElement("li", { className: "recipe" }, /*#__PURE__*/
                React.createElement("p", { onClick: () => this.expandRecipe(thisTitle) }, thisTitle), /*#__PURE__*/
                React.createElement("ul", { className: "hidden", id: thisTitle },
                    theseIngredients, /*#__PURE__*/
                    React.createElement("li", null, /*#__PURE__*/
                        React.createElement("button", { onClick: () => this.openRecipeEditer(thisTitle, i), className: "hidden editButton", id: thisTitle + "edit" }, "Edit"), /*#__PURE__*/
                        React.createElement("button", { onClick: () => this.deleteRecipe(i), className: "hidden deleteButton", id: thisTitle + "delete" }, "X")))));




    }

    //method to actually render with each instance of RecipeBox
    render() {
        let recipeList = [];
        //iterate through recipes prop of current state
        this.state.recipes.forEach((item, i) => {
            //push each recipe onto recipeList array as an instance of the RecipeListItem Component
            recipeList.push( /*#__PURE__*/React.createElement(this.RecipeListItem, { title: item.title, ingredients: item.ingredients, index: i }));
        });

        return /*#__PURE__*/ (//render this JSX when RecipeBox Component is rendered
            React.createElement("div", { id: "react-container" }, /*#__PURE__*/
                React.createElement("div", { id: "recipe-box" }, /*#__PURE__*/
                    React.createElement("ul", null,
                        recipeList)), /*#__PURE__*/


                React.createElement("div", { id: "buttons" }, /*#__PURE__*/
                    React.createElement("button", { id: "newRecipeButton", onClick: () => this.openRecipeAdder() }, "Create New Recipe"), /*#__PURE__*/
                    React.createElement("input", { className: "hidden", type: "text", id: "new-recipe-title", placeholder: "new recipe title", required: true }), /*#__PURE__*/
                    React.createElement("textarea", { className: "hidden", id: "new-recipe-ingredients", placeholder: "ingredients (separate by commas)", rows: "4", required: true }), /*#__PURE__*/
                    React.createElement("button", { id: "addRecipe", className: "hidden", onClick: () => this.addRecipe() }, "Add New Recipe"), /*#__PURE__*/
                    React.createElement("button", { id: "editRecipe", className: "hidden", onClick: () => this.editRecipe() }, "Confirm Edit"))));



    }
}


//actually render an instance of RecipeBox into 'container' id
ReactDOM.render( /*#__PURE__*/
    React.createElement(RecipeBox, null),
    document.getElementById("container"));



//ex: https://codepen.io/freeCodeCamp/pen/xVXWag