import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListSerivice {
    ingredientAdded = new EventEmitter<Ingredient[]>();

    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientAdded.emit(this.ingredients);
    }
    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients); // using spread operator so that push can handle each item of array
        this.ingredientAdded.emit(this.ingredients);
    }
}