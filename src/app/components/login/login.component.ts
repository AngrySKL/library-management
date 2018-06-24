import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel: FormGroup;

  constructor(private fb: FormBuilder,
              private loginSvr: LoginService,
              private router: Router) {
    this.formModel = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.formModel.invalid) {
      return;
    }

    const username = this.formModel.get('username').value;
    const password = this.formModel.get('password').value;

    this.loginSvr.login(username, password)
    .subscribe(res => {
      if (res.code === 200) {
        this.router.navigate(['home']);
      }
    });
  }
}
