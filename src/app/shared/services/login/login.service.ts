import { Injectable } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

@Injectable()
export class LoginService {

  constructor() { }

  login(username: string, password: string): Observable<LoginResponse> {
    return Observable.of({code: 200, message: 'login success'});
  }
}

export class LoginResponse {
  constructor(public code: number,
  public message: string) {}
}
