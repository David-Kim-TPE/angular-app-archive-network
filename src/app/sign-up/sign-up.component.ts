import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../user.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  private signUpInProgress = false;
  form: FormGroup;
  errorMessage = '';

  private signUp = {
    id: '',
    firstName: '',
    surname: '',
    role: ''
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [null, Validators.required],
      firstname: [null, [Validators.required, Validators.email]],
      surname: [null, Validators.required],
      role: [null, Validators.required]
    });
  }

  onSignUp() {
    this.signUpInProgress = true;
    return this.userService.signUp(this.signUp, error => {
      this.signUpInProgress = false;
      console.log({error});
      if (!error) {
        return this.router.navigate(['Cards']);
      } else {
        return this.errorMessage = error.statusText;
      }
    });
  }
}
