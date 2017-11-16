import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import 'rxjs/Rx';

export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe(1, 'A test recipe', 'This is simply a test', 'assets/images/Recipe1.jpg'
            , [
                new Ingredient('Apples', 2), new Ingredient('pineapple', 1)
            ]),
        new Recipe(2, 'mediterian recipe', 'This is a vegitarian recipe', 'assets/images/Recipe2.jpg',
            [
                new Ingredient('Cheese', 2), new Ingredient('tomatoes', 4)
            ])
    ];

    getRecipes() {
        return this.recipes.slice(); // By adding this slice we'll get the copy of the array rather than reference of the recipe array.
    }
    getRecipeById(id: number) {
        const recipe = this.recipes.find(
            (r) => {
                return r.id === id;
            }
        );
        return recipe;
    }
}
