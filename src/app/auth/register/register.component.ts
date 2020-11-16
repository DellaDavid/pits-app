import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  buttonClicked = false;
  constructor(private _router: Router) { }

  ngOnInit() {
    this.buttonClicked = false;
  }

  register(){
    this.buttonClicked = true;
    console.log(this.buttonClicked)
    if(this.buttonClicked) this._router.navigateByUrl('/auth/profile-create');
  }

}
