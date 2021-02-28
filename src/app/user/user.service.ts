import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/settings/app.settings';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findAllUsers() {
    return this.http.get<User>(AppSettings.APP_URL + "/users/");
  }

  findUserById(idUser: number) {
    return this.http.get<User>(AppSettings.APP_URL + "/users/" + idUser);
  }

  saveUser(user: User) {
    this.http.post<User>(AppSettings.APP_URL + "/users/", user);
  }

  login(mail: string, password: string) {
    return this.http.post<User>(AppSettings.APP_URL + "/users/login?mail=" + mail + "&password=" + password, null);
  }
}