import { OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { DataStorageService } from '../shared/data-storage.service';
import 'rxjs/Rx';

export class RecipeService {

    recipeAdded = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];



    // = [
    //     new Recipe(0, 'A test recipe', 'This is simply a test', 'assets/images/Recipe1.jpg'
    //         , [
    //             new Ingredient('Apples', 2), new Ingredient('pineapple', 1)
    //         ]),
    //     new Recipe(1, 'mediterian recipe', 'This is a vegitarian recipe', 'assets/images/Recipe2.jpg',
    //         [
    //             new Ingredient('Cheese', 2), new Ingredient('tomatoes', 4)
    //         ])
    // ];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeAdded.next(this.recipes.slice());
    }

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

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeAdded.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeAdded.next(this.recipes.slice());
    }

    deleteRecipe(recipeId: number) {
        const rindex = this.recipes.findIndex((r: Recipe) => (r.id === recipeId));
        this.recipes.splice(rindex, 1);
        this.recipeAdded.next(this.recipes.slice());
    }
}
