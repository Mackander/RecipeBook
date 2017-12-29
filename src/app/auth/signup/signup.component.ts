import { AuthService } from './../auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onSubmit(ngForm: NgForm) {
    console.log(ngForm.control.value);
    const email = ngForm.value.email;
    const password = ngForm.value.password;
    this.authService.signupUser(email, password);
  }
}
