import { Recipe } from './../recipes/recipe.model';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
//import { Recipe } from '../recipes/recipe.model';
import * as firebase from 'firebase';

@Injectable()

export class DataStorageService {
    constructor(private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }


    storeRecipies() {
        const token = this.authService.getToken();
        return this.httpClient.put('https://ng-recipe-book-cee0c.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }


    getRecipiesData() {
        const token = this.authService.getToken();

        //we can tell httpClient what type of data are we getting back
        //So "get" can be generic type and we can specify what type of data we are expecting
        return this.httpClient.get<Recipe[]>('https://ng-recipe-book-cee0c.firebaseio.com/recipes.json?auth=' + token)
            .map(
            (recipes) => {
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
