import * as argon2 from 'argon2-browser';
import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../services/http.service';
import { BrowserStorageService } from '../services/storage.service';

@Component({
  selector: 'show-name',
  templateUrl: './show-name.component.html',
  styleUrls: ['./show-name.component.less'],
  providers: [HttpService, BrowserStorageService],
})
export class ShowNameComponent implements OnInit {
  @Input() person = '';
  public isAuth = false;

  constructor(
    private httpService: HttpService,
    private storage: BrowserStorageService
  ) {}

  ngOnInit() {
    const login = this.storage.get('login');
    if (login) {
      this.person = login;
      this.send();
    }
  }

  async send() {
    // https://angular-university.io/lesson/angular-security-using-the-argon-2-hashing-function-in-our-sign-up-backend-service
    const hash = await argon2.hash({
      pass: this.person,
      salt: 'fucking-broken-nodejs-basic-angular-crypto-custom-webpack',
      type: 2,
    });

    this.httpService
      .createSession(this.person, hash.encoded)
      // @ts-ignore TODO: TeardownLogic
      .add(() => {
        this.isAuth = true;
      });
  }
}
