import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecipeEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService) { }

  recipeItemId: number;
  selectedRecipe: Recipe;
  editMode = false;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeItemId = +params['id'];
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.selectedRecipe = this.recipeService.getRecipeById(this.recipeItemId);
        } else {
          // this.selectedRecipe = new Recipe();
        }
      }
    );
  }

}
