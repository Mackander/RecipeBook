import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private recipeService: RecipeService,
    private router: Router) { }

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

    if (em && sr['ingredients']) {
      sr.ingredients.forEach((ingredient: Ingredient) => {
        recipeIngredients.push(new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
        }));
      });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(em ? sr.name : '', Validators.required),
      'description': new FormControl(em ? sr.description : '', Validators.required),
      'imagePath': new FormControl(em ? sr.imagePath : '', Validators.required),
      'ingredients': recipeIngredients

    });
  }

  onSubmit() {
    const ingredients: Ingredient[] = (<Ingredient[]>this.recipeForm.get('ingredients').value);

    const newRecipe: Recipe = new Recipe(
      this.editMode ? this.recipeItemId : this.recipeService.getRecipes().length,
      this.recipeForm.get('name').value,
      this.recipeForm.get('description').value,
      this.recipeForm.get('imagePath').value,
      this.recipeForm.get('ingredients').value
    );
    console.log(this.recipeForm.value);
    console.log(this.recipeForm.get('ingredients').value);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeItemId, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
    }));

  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

