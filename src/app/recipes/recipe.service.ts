import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A test recipe', 'This is simply a test', 'assets/images/Recipe1.jpg'),
        new Recipe('mediterian recipe', 'This is a vegitarian recipe', 'assets/images/Recipe2.jpg')
    ];

    getRecipes() {
        return this.recipes.slice(); // By adding this slice we'll get the copy of the array rather than reference of the recipe array.
    }
}
