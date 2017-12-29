import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService,
  private router:Router) { }

  ngOnInit() {
  }

  onSubmit(ngForm: NgForm) {
    this.authService.signinUser(ngForm.value.email, ngForm.value.password);
    // if(this.authService.isAuthenticated()){
    //   this.router.navigate(['recipes']);
    // }
  }

}
