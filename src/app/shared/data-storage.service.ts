import { Params } from '@angular/router';
import { Recipe } from './../recipes/recipe.model';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpRequest } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
//import { Recipe } from '../recipes/recipe.model';
import * as firebase from 'firebase';

@Injectable()

export class DataStorageService {
    constructor(private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }


    storeRecipies() {
        //const token = this.authService.getToken();
        // return this.httpClient.put('https://ng-recipe-book-cee0c.firebaseio.com/recipes.json',
        //  this.recipeService.getRecipes(),
        //  {
        //      observe:'events'
        //      ,params:new HttpParams().set('auth',token)
        //  }
        // );
        // Alternative way of creating request
        const req = new HttpRequest('PUT','https://ng-recipe-book-cee0c.firebaseio.com/recipes.json'
        ,this.recipeService.getRecipes()
        ,{reportProgress:true});
        return this.httpClient.request(req);
    }


    getRecipiesData() {
        //const token = this.authService.getToken();

        //we can tell httpClient what type of data are we getting back
        //So "get" can be generic type and we can specify what type of data we are expecting
        return this.httpClient.get<Recipe[]>('https://ng-recipe-book-cee0c.firebaseio.com/recipes.json',
            {
                observe: 'body',
                responseType: 'json' //this is default option
                //, headers: new HttpHeaders() //This is new in http client lecture 294
                // ,params: new HttpParams().set('auth',token) //This is new in http client lecture 294
            })
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
