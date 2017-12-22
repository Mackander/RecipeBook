import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()

export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService) { }

    storeRecipies() {
        return this.http.put('https://ng-recipe-book-cee0c.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    getRecipiesData() {
        return this.http.get('https://ng-recipe-book-cee0c.firebaseio.com/recipes.json')
            .map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                recipes.forEach((recipe: Recipe) => {
                    if (recipe['ingredients'] == null) {
                        recipe['ingredients'] = [];
                    }
                });
                return recipes;
            })
            .subscribe(
            (recipies: Recipe[]) => {
                this.recipeService.setRecipes(recipies);
            },
            (error: Response) => 'Something is broken'
            );
    }
}
