import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
const TOKEN_KEY = 'token-saya';
const USERNAME = 'namasaya';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Inisialisasi is auth
  isAuthenticated: BehaviorSubject<boolean|null> = new BehaviorSubject<boolean|null>(null);
  token = '';
  constructor(private http: HttpClient) {
    this.loadToken();
  }
  async loadToken() {
    const token = await Preferences.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  apiURL() {
    return "http://localhost:8080/";
  }
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    Preferences.remove({ key: USERNAME });
    return Preferences.remove({ key: TOKEN_KEY });
  }
}