import { Component } from '@angular/core';
import { fadeInAnimation } from './_animations/fade-in.animation';
import * as sha1 from 'sha1';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class AppComponent {

  authedUser = '';
  password_rea = '794bfa57bb763388d961a98aa5b9f44e81e63a26';
  password_connor = '31672fd92b13150c3b261144d67626552e4f75c9';
  password: string;
  authed = false;

  authenticate(password_plaintext) {
    let password_crypto = sha1(password_plaintext)
    if (password_crypto == this.password_rea) {
      this.authedUser = 'rea'
      this.authed = true
    }
    else if (password_crypto == this.password_connor) {
      this.authedUser = 'connor'
      this.authed = true
    } else {
      this.authed = false
    }
  }
}
