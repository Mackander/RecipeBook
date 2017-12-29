import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import * as firebase from 'firebase';

@Injectable()

export class DataStorageService {
    constructor(private http: Http,
        private recipeService: RecipeService,
        private authService: AuthService) { }


    storeRecipies() {
        const token = this.authService.getToken();
        return this.http.put('https://ng-recipe-book-cee0c.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }


    getRecipiesData() {
        const token = this.authService.getToken();

        return this.http.get('https://ng-recipe-book-cee0c.firebaseio.com/recipes.json?auth=' + token)
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
