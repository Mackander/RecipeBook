import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListSerivice } from '../../shopping-list/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  selectedRecipeItem: Recipe;
  recipeid: number;

  constructor(private shoppingListSerivice: ShoppingListSerivice,
    private recipeService: RecipeService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.recipeid = +params['id'];
        this.selectedRecipeItem = this.recipeService.getRecipeById(this.recipeid);
      }
    );
  }

  addToShoppingList() {
    this.shoppingListSerivice.addIngredients(this.selectedRecipeItem.ingredients);
    this.router.navigate(['shopping-list']);
  }
}
