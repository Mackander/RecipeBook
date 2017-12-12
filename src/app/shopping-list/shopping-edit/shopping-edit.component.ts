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
        this.editIngredient = this.shoppingListSerivice.getIngredients()[index];
        this.ingredientForm.get('name').setValue(this.editIngredient.name);
        this.ingredientForm.get('amount').setValue(this.editIngredient.amount);
      });
  }

  get name() { return this.ingredientForm.get('name'); }

  get amount() { return this.ingredientForm.get('amount'); }

  onAddIngredient() {
    this.shoppingListSerivice.addIngredient(
      // new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value)
      new Ingredient(this.ingredientForm.get('name').value,
        this.ingredientForm.get('amount').value)
    );
    this.ingredientForm.reset();
  }

  ngOnDestroy() {
    this.editIngredientSubscription.unsubscribe();
  }

}
