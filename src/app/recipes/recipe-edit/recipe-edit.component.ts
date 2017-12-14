import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ReactiveFormsModule, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;

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
        this.initRecipeForm();
      }
    );

  }
  private initRecipeForm() {
    const em = this.editMode;
    const sr = this.selectedRecipe;

    const recipeIngredients = new FormArray([]);

    if (sr['ingredients']) {
      sr.ingredients.forEach((ingredient: Ingredient) => {
        recipeIngredients.push(new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^[0-9]+[0-9]*$')])
        }));
      });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(em ? sr.name : ''),
      'description': new FormControl(em ? sr.description : ''),
      'imagePath': new FormControl(em ? sr.imagePath : ''),
      'ingredients': recipeIngredients

    });
  }

  onSubmit() {
    const ingredients: Ingredient[] = [new Ingredient('Apple', 10)];
    const newRecipe: Recipe = new Recipe(
      1,
      this.recipeForm.get('name').value,
      this.recipeForm.get('description').value,
      this.recipeForm.get('imagePath').value,
      ingredients
    );
    console.log(this.recipeForm.value);
    this.recipeForm.reset();
  }
}

