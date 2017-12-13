import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListSerivice } from '../shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private shoppingListSerivice: ShoppingListSerivice) { }
  editIngredient: Ingredient;
  editMode = false;
  editIngredientIndex: number;
  editIngredientSubscription: Subscription;

  // @ViewChild('nameInput') name: ElementRef;
  // @ViewChild('amountInput') amount: ElementRef;

  ingredientForm: FormGroup;

  ngOnInit() {
    this.ingredientForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+[0-9]*$')])
    });

    this.editIngredientSubscription = this.shoppingListSerivice.startedEditing.subscribe(
      (index: number) => {
        this.editIngredientIndex = index;
        this.editMode = true;
        this.editIngredient = this.shoppingListSerivice.getIngredients()[index];
        this.ingredientForm.setValue({
          'name': this.editIngredient.name,
          'amount': this.editIngredient.amount
        });
      });
  }

  get name() { return this.ingredientForm.get('name'); }

  get amount() { return this.ingredientForm.get('amount'); }

  onSubmit() {
    const ingredient: Ingredient = new Ingredient(this.ingredientForm.get('name').value, this.ingredientForm.get('amount').value);

    if (this.editMode) {
      this.shoppingListSerivice.updateIngredient(ingredient, this.editIngredientIndex);
    } else {
      this.shoppingListSerivice.addIngredient(ingredient);
    }
    this.clearForm();
  }

  onDelete() {
    this.shoppingListSerivice.deleteIngredient(this.editIngredientIndex);
    this.clearForm();
  }

  ngOnDestroy() {
    this.editIngredientSubscription.unsubscribe();
  }

  clearForm() {
    this.editMode = false;
    this.ingredientForm.reset();
  }

}
