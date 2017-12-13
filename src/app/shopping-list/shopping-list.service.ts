import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingListSerivice {
    ingredientAdded = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    updateIngredient(ingredient: Ingredient, index: number) {
        this.ingredients[index] = ingredient;
        this.ingredientAdded.next(this.ingredients);
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientAdded.next(this.ingredients);
    }
    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients); // using spread operator so that push can handle each item of array
        this.ingredientAdded.next(this.ingredients);
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientAdded.next(this.ingredients);
    }

}
