import { Component, OnInit, AfterViewInit, trigger, state, animate, transition, style } from '@angular/core';
import * as sha1 from 'sha1';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('visible', [
        state('shown', style({
            opacity: 1
        })),
        state('hidden', style({
            opacity: 0
        })),
        transition('hidden => shown', animate('1s')),
        transition('shown => hidden', animate('0.2s'))
    ])
  ],
})
export class AppComponent {

  titleIsVisible: string = 'hidden';
  passwordIsVisible: string = 'hidden';
  footerIsVisible: string = 'hidden';
  noteIsVisible: string = 'hidden';
  authed: boolean = false;
  authedUser: string = '';
  password_rea: string = 'db0664b1685e89476f4ed9f6d2e8d16ade3274e4';
  password_connor: string = 'e4e772472093b48e8ee481684c0b59d92aaf0daa';

  ngAfterViewInit() {
    setTimeout(() => {
      this.toggleVisibility('title');
    }, 300);
    setTimeout(() => {
      this.toggleVisibility('password');
    }, 400);
    setTimeout(() => {
      this.toggleVisibility('footer');
    }, 500);
  }

  authenticate(password_plaintext) {
    let password_crypto = sha1(password_plaintext)
    if (password_crypto == this.password_rea) {
      this.passwordIsVisible = this.passwordIsVisible == 'shown' ? 'hidden' : 'shown';
      this.authedUser = 'rea';
      setTimeout(() => {
        this.authed = true;
      }, 200);
      this.toggleVisibility('note');
    }
    else if (password_crypto == this.password_connor) {
      this.passwordIsVisible = this.passwordIsVisible == 'shown' ? 'hidden' : 'shown';
      this.authedUser = 'connor'
      setTimeout(() => {
        this.authed = true;
      }, 200);
    } else {
      this.authed = false
    }
  }

  toggleVisibility(item: string) {
    switch (item) {
      case 'title':
        this.titleIsVisible = this.titleIsVisible == 'shown' ? 'hidden' : 'shown';
        break;
      case 'password':
        this.passwordIsVisible = this.passwordIsVisible == 'shown' ? 'hidden' : 'shown';
        break;
      case 'note':
        this.noteIsVisible = this.noteIsVisible == 'shown' ? 'hidden' : 'shown';
        break;
      case 'footer':
        this.footerIsVisible = this.footerIsVisible == 'shown' ? 'hidden' : 'shown';
        break;
    }
  }
}
